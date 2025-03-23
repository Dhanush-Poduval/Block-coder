import requests
import random
from bs4 import BeautifulSoup

CODEFORCES_API_URL = "https://codeforces.com/api/problemset.problems"


def fetch_codeforces_problem(difficulty):
    """Fetch a random problem from Codeforces based on difficulty level."""
    difficulty_map = {
        "easy": (800, 1200),
        "medium": (1300, 1800),
        "hard": (1900, 3500)
    }

    min_rating, max_rating = difficulty_map.get(difficulty, (800, 3500))

    response = requests.get(CODEFORCES_API_URL)

    if response.status_code == 200:
        data = response.json()
        problems = [
            problem for problem in data["result"]["problems"]
            if "rating" in problem and min_rating <= problem["rating"] <= max_rating
        ]

        if problems:
            problem = random.choice(problems)
            problem_url = f"https://codeforces.com/problemset/problem/{problem['contestId']}/{problem['index']}"
            problem_statement = scrape_problem_statement(problem_url)

            return {
                "title": problem["name"],
                "difficulty": problem.get("rating", "Unknown"),
                "link": problem_url,
                "statement": problem_statement
            }
        else:
            return {"error": "No problem found for this difficulty level."}
    else:
        return {"error": "Failed to fetch problems from Codeforces API."}


def scrape_problem_statement(url):
    """Scrape the full problem statement from Codeforces problem page."""
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        problem_div = soup.find("div", class_="problem-statement")
        if problem_div:
            return problem_div.get_text(strip=True)

    return "Problem statement not available."


def generate_hint(problem_statement):
    """Use AI to generate a hint based on the problem statement."""
    API_KEY = "a06b854a361a8943a8203d0834c218063b57f8cc1f4f8a7625daddd8724ae85a"
    MODEL = "mistralai/Mistral-7B-Instruct-v0.1"
    url = "https://api.together.xyz/v1/completions"

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

    prompt = f"Provide a useful hint for solving this competitive programming problem:\n\n{problem_statement}"

    payload = {
        "model": MODEL,
        "prompt": prompt,
        "max_tokens": 100,
        "temperature": 0.5
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        return response.json()["choices"][0]["text"].strip()

    return "AI could not generate a hint."


# Example Usage
difficulty = "hard"  # User selects difficulty
problem = fetch_codeforces_problem(difficulty)

if "error" not in problem:
    hint = generate_hint(problem["statement"])
    print(f"🔹 Problem: {problem['title']} (Difficulty: {problem['difficulty']})")
    print(f"🔹 Link: {problem['link']}")
    print(f"🔹 AI Hint: {hint}")
else:
    print(problem["error"])
