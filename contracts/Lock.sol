// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract EduChain is ERC721, AccessControl {
    uint256 private _tokenIds = 0; // Replaces Counters.Counter

    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    
    struct Credential {
        address recipient;
        string title;
        string institution;
        uint256 issueDate;
        string ipfsHash;
        string did;
        bool revoked;
    }

    mapping(uint256 => Credential) public credentials;
    mapping(string => uint256) public didToCredential;

    event CredentialIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        string did,
        string title
    );

    event CredentialRevoked(uint256 indexed tokenId);

    constructor() ERC721("EduChainCredential", "EDUC") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function issueCredential(
        address recipient,
        string memory title,
        string memory institution,
        string memory ipfsHash,
        string memory did
    ) external onlyRole(ISSUER_ROLE) returns (uint256) {
        require(bytes(did).length > 0, "DID required");
        require(didToCredential[did] == 0, "DID already used");

        _tokenIds++; // Simplified counter increment
        uint256 newTokenId = _tokenIds;

        _safeMint(recipient, newTokenId);
        
        credentials[newTokenId] = Credential({
            recipient: recipient,
            title: title,
            institution: institution,
            issueDate: block.timestamp,
            ipfsHash: ipfsHash,
            did: did,
            revoked: false
        });

        didToCredential[did] = newTokenId;
        
        emit CredentialIssued(newTokenId, recipient, did, title);
        return newTokenId;
    }

    // Rest of the contract remains unchanged...
    // [Keep all other functions exactly as they were]
}