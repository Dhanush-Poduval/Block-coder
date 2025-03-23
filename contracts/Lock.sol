// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EduChain is ERC721, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    
    struct Credential {
        address recipient;
        string title;
        string institution;
        uint256 issueDate;
        string ipfsHash;
        string did; // Decentralized Identifier
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

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

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

    function revokeCredential(uint256 tokenId) external onlyRole(ISSUER_ROLE) {
        require(_exists(tokenId), "Invalid token ID");
        credentials[tokenId].revoked = true;
        emit CredentialRevoked(tokenId);
    }

    function verifyCredential(string memory did) public view returns (
        address recipient,
        string memory title,
        string memory institution,
        bool valid
    ) {
        uint256 tokenId = didToCredential[did];
        require(tokenId != 0, "Credential not found");
        
        Credential memory cred = credentials[tokenId];
        return (
            cred.recipient,
            cred.title,
            cred.institution,
            !cred.revoked && ownerOf(tokenId) == cred.recipient
        );
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        Credential memory cred = credentials[tokenId];
        return string(abi.encodePacked(
            'data:application/json;utf8,',
            '{"name": "', cred.title, '",',
            '"description": "EduChain Verifiable Credential",',
            '"attributes": [',
            '{"trait_type": "Institution", "value": "', cred.institution, '"},',
            '{"trait_type": "Issue Date", "value": "', toString(cred.issueDate), '"},',
            '{"trait_type": "DID", "value": "', cred.did, '"},',
            '{"trait_type": "Revoked", "value": "', cred.revoked ? 'Yes' : 'No', '"}',
            ']}'
        ));
    }

    // Helper function to convert uint256 to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Required override for AccessControl
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}   how do i deploy this in my project