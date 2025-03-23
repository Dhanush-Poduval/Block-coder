document.addEventListener("DOMContentLoaded", async function () {
    // Define the contract ABI and address
    const contractABI = [
        [
			{
				"inputs": [],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"inputs": [],
				"name": "AccessControlBadConfirmation",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "neededRole",
						"type": "bytes32"
					}
				],
				"name": "AccessControlUnauthorizedAccount",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"name": "ERC721IncorrectOwner",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "operator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "ERC721InsufficientApproval",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "approver",
						"type": "address"
					}
				],
				"name": "ERC721InvalidApprover",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "operator",
						"type": "address"
					}
				],
				"name": "ERC721InvalidOperator",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"name": "ERC721InvalidOwner",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "receiver",
						"type": "address"
					}
				],
				"name": "ERC721InvalidReceiver",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					}
				],
				"name": "ERC721InvalidSender",
				"type": "error"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "ERC721NonexistentToken",
				"type": "error"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "approved",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "operator",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					}
				],
				"name": "ApprovalForAll",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "did",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "title",
						"type": "string"
					}
				],
				"name": "CredentialIssued",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "CredentialRevoked",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "grantRole",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "institution",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "did",
						"type": "string"
					}
				],
				"name": "issueCredential",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "callerConfirmation",
						"type": "address"
					}
				],
				"name": "renounceRole",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "revokeCredential",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "revokeRole",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					},
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "previousAdminRole",
						"type": "bytes32"
					},
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "newAdminRole",
						"type": "bytes32"
					}
				],
				"name": "RoleAdminChanged",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "sender",
						"type": "address"
					}
				],
				"name": "RoleGranted",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "sender",
						"type": "address"
					}
				],
				"name": "RoleRevoked",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "safeTransferFrom",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"name": "safeTransferFrom",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "operator",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					}
				],
				"name": "setApprovalForAll",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "credentials",
				"outputs": [
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "institution",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "issueDate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "did",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "revoked",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "DEFAULT_ADMIN_ROLE",
				"outputs": [
					{
						"internalType": "bytes32",
						"name": "",
						"type": "bytes32"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"name": "didToCredential",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "getApproved",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					}
				],
				"name": "getRoleAdmin",
				"outputs": [
					{
						"internalType": "bytes32",
						"name": "",
						"type": "bytes32"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes32",
						"name": "role",
						"type": "bytes32"
					},
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "hasRole",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "operator",
						"type": "address"
					}
				],
				"name": "isApprovedForAll",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "ISSUER_ROLE",
				"outputs": [
					{
						"internalType": "bytes32",
						"name": "",
						"type": "bytes32"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "name",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "ownerOf",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "bytes4",
						"name": "interfaceId",
						"type": "bytes4"
					}
				],
				"name": "supportsInterface",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "symbol",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					}
				],
				"name": "tokenURI",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "did",
						"type": "string"
					}
				],
				"name": "verifyCredential",
				"outputs": [
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "institution",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "valid",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		]
    ];
    const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

    if (window.ethereum) {
        try {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const web3 = window.web3;
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            const createChallengeButton = document.getElementById("createChallenge");
            const completeChallengeButton = document.getElementById("completeChallenge");
            const getChallengeButton = document.getElementById("getChallenge");

            if (createChallengeButton) {
                createChallengeButton.addEventListener("click", async () => {
                    try {
                        const title = document.getElementById("title")?.value;
                        const statement = document.getElementById("statement")?.value;
                        const hint = document.getElementById("hint")?.value;
                        const difficulty = document.getElementById("difficulty")?.value;

                        if (!title || !statement || !hint || !difficulty) {
                            alert("Please fill in all fields.");
                            return;
                        }

                        if (isNaN(difficulty) || difficulty < 1 || difficulty > 10) {
                            alert("Difficulty must be a number between 1 and 10.");
                            return;
                        }

                        const accounts = await web3.eth.getAccounts();
                        await contract.methods.createChallenge(title, statement, hint, parseInt(difficulty)).send({ from: accounts[0] });
                        alert("Challenge created successfully!");
                    } catch (error) {
                        console.error("Error creating challenge:", error);
                        alert(`Failed to create challenge: ${error.message}`);
                    }
                });
            }

            if (completeChallengeButton) {
                completeChallengeButton.addEventListener("click", async () => {
                    try {
                        const challengeId = document.getElementById("challengeId")?.value;

                        if (!challengeId || isNaN(challengeId)) {
                            alert("Please enter a valid challenge ID.");
                            return;
                        }

                        const accounts = await web3.eth.getAccounts();
                        await contract.methods.completeChallenge(parseInt(challengeId)).send({ from: accounts[0] });
                        alert("Challenge completed successfully!");
                    } catch (error) {
                        console.error("Error completing challenge:", error);
                        alert(`Failed to complete challenge: ${error.message}`);
                    }
                });
            }

            if (getChallengeButton) {
                getChallengeButton.addEventListener("click", async () => {
                    try {
                        const challengeId = document.getElementById("challengeId")?.value;

                        if (!challengeId || isNaN(challengeId)) {
                            alert("Please enter a valid challenge ID.");
                            return;
                        }

                        const challenge = await contract.methods.getChallenge(parseInt(challengeId)).call();
                        const challengeDataElement = document.getElementById("challengeData");
                        if (challengeDataElement) {
                            challengeDataElement.innerHTML = `
                                <p><strong>Title:</strong> ${challenge[0]}</p>
                                <p><strong>Statement:</strong> ${challenge[1]}</p>
                                <p><strong>Hint:</strong> ${challenge[2]}</p>
                                <p><strong>Difficulty:</strong> ${challenge[3]}</p>
                                <p><strong>Completed:</strong> ${challenge[4]}</p>
                                <p><strong>Player:</strong> ${challenge[5]}</p>
                            `;
                        } else {
                            console.error("Challenge data element not found");
                        }
                    } catch (error) {
                        console.error("Error fetching challenge:", error);
                        alert(`Failed to fetch challenge: ${error.message}`);
                    }
                });
            }
        } catch (error) {
            console.error("Error initializing Ethereum connection:", error);
            alert(`Failed to connect to Ethereum: ${error.message}`);
        }
    } else {
        console.error("Ethereum wallet not detected");
        alert("Ethereum wallet not detected. Please install MetaMask or another compatible wallet.");
    }
});
