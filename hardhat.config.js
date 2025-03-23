require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",  // Ensure this matches your Solidity version
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_RPC, // Use Alchemy or Infura
      accounts: [process.env.PRIVATE_KEY],  // Your wallet private key
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // For contract verification
  },
};