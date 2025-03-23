const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS package
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// API endpoint to execute code
app.post('/execute', (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code or language not provided" });
  }

  let command;

  // Execute code based on the selected language
  if (language === "javascript") {
    command = `node -e "${code}"`;
  } else if (language === "python") {
    command = `python3 -c "${code}"`;
  } else if (language === "cpp") {
    const fs = require('fs');
    const fileName = 'temp.cpp';
    fs.writeFileSync(fileName, code);
    
    // Compile C++ code
    exec(`g++ ${fileName} -o temp && ./temp`, (err, stdout, stderr) => {
      if (err) {
        res.status(500).json({ error: stderr || err.message });
      } else {
        res.json({ output: stdout });
      }
    });

    return;
  } else {
    return res.status(400).json({ error: "Unsupported language" });
  }

  // Run JavaScript or Python code
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }
    res.json({ output: stdout });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
