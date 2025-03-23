from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel
import os
import json
import requests
import random
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware
from web3 import Web3
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# FastAPI instance
app = FastAPI(title="EDUChain Certification and Codeforces API")

# CORS middleware setup
origins = [
    "http://localhost",  # Allow frontend to connect from localhost
    "http://localhost:3000",  # If your frontend runs on port 3000 (e.g., using React)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow the origins defined above
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Initialize Web3 connection for EDUChain
w3 = Web3(Web3.HTTPProvider(os.getenv("INFURA_URL")))
contract_address = os.getenv("CONTRACT_ADDRESS")
private_key = os.getenv("ADMIN_PRIVATE_KEY")
admin_address = os.getenv("ADMIN_ADDRESS")

# Load contract ABI
with open("EduCertABI.json") as f:
    contract_abi = json.load(f)

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Data models for Certification
class CertificationRequest(BaseModel):
    student_address: str
    title: str
    issuer: str
    digital_signature: str
    ipfs_hash: str

class VerificationRequest(BaseModel):
    certification_id: int
    digital_signature: str

# Data models for Codeforces
class ProblemRequest(BaseModel):
    difficulty: str

# Authentication dependency for API access
async def verify_admin(x_api_key: str = Header(...)):
    if x_api_key != os.getenv("API_KEY"):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

# Function to fetch a random problem from Codeforces based on difficulty
def fetch_codeforces_problem(difficulty):
    """Fetch a random problem from Codeforces based on difficulty level."""
    difficulty_map = {
        "easy": (800, 1200),
        "medium": (1300, 1800),
        "hard": (1900, 3500)
    }

    min_rating, max_rating = difficulty_map.get(difficulty, (800, 3500))

    response = requests.get("https://codeforces.com/api/problemset.problems")

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
                "statement": problem_statement,
                "hint": "No hint available"  # Default hint
            }
        else:
            return {"error": "No problem found for this difficulty level."}
    else:
        return {"error": "Failed to fetch problems from Codeforces API."}

# Function to scrape the problem statement from Codeforces
def scrape_problem_statement(url):
    """Scrape the full problem statement from Codeforces problem page."""
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        problem_div = soup.find("div", class_="problem-statement")
        if problem_div:
            return problem_div.get_text(strip=True)

    return "Problem statement not available."

# FastAPI route for issuing certifications (EDUChain)
@app.post("/certifications", dependencies=[Depends(verify_admin)])
async def issue_certification(cert_data: CertificationRequest):
    try:
        nonce = w3.eth.get_transaction_count(admin_address)
        
        tx = contract.functions.issueCertification(
            w3.to_checksum_address(cert_data.student_address),
            cert_data.title,
            cert_data.issuer,
            cert_data.digital_signature,
            "",  # QR code placeholder
            cert_data.ipfs_hash
        ).build_transaction({
            'chainId': 1,  # Replace with EDUChain network ID
            'gas': 200000,
            'gasPrice': w3.to_wei('50', 'gwei'),
            'nonce': nonce,
        })

        # Sign and send transaction
        signed_tx = w3.eth.account.sign_transaction(tx, private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        return {"tx_hash": tx_hash.hex()}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# FastAPI route to get certification details (EDUChain)
@app.get("/certifications/{certification_id}")
async def get_certification(certification_id: int):
    try:
        certification = contract.functions.getCertification(certification_id).call()
        return {
            "id": certification[0],
            "recipient": certification[1],
            "title": certification[2],
            "issuer": certification[3],
            "issue_date": certification[4],
            "digital_signature": certification[5],
            "ipfs_hash": certification[7]
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail="Certification not found")

# FastAPI route to verify certification (EDUChain)
@app.post("/certifications/verify")
async def verify_certification(verification: VerificationRequest):
    try:
        is_valid = contract.functions.verifyCertification(
            verification.certification_id,
            verification.digital_signature
        ).call()
        return {"valid": is_valid}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Verification failed")

# FastAPI route to fetch Codeforces problem based on difficulty
@app.post("/api/fetch-problem/")
async def fetch_problem(request: ProblemRequest):
    """Endpoint to fetch problem from Codeforces based on difficulty."""
    difficulty = request.difficulty
    problem = fetch_codeforces_problem(difficulty)

    if "error" not in problem:
        return problem
    else:
        return {"error": problem["error"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
