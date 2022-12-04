// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Upbox is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Base64 for bytes;

    Counters.Counter private _tokenIds;
    uint256[] public publicTokensIds;
    mapping(address => bool) public blackListedUsers;
    mapping(uint256 => string) private tokenIdtoMetadata;
    mapping(address => UserTokens) internal userTokens;

    struct UserTokens {
        uint256[] _publicTokens;
        uint256[] _privateTokens;
        uint256[] _receivedTokens;
    }

    event FileUploaded(address _user, uint256 _tokenId);
    event FileShared(address _to, uint256 _tokenId);

    constructor() ERC721("Upbox", "Prime") {}

    /**
    @notice Uploads a new file
    @param _isPrivate privacy of uploaded file
     */
    function uploadFile(string memory input, bool _isPrivate)
        public
        whenNotBlacklisted
    {
        // use tokenCounter as an id for each created token
        // use _safeMint inherited from ERC721 contract to mint a token

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        tokenIdtoMetadata[newItemId] = input;
        _safeMint(msg.sender, newItemId);
        if (_isPrivate) {
            userTokens[msg.sender]._privateTokens.push(newItemId);
        } else {
            userTokens[msg.sender]._publicTokens.push(newItemId);
            publicTokensIds.push(newItemId);
        }
        emit FileUploaded(msg.sender, newItemId);
    }

    /// @dev Encodes the files metadata as JSON.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(ownerOf(tokenId) != address(0), "Upbox: Token does not exist.");
        string memory metadata = tokenIdtoMetadata[tokenId];
        bytes memory jsonBytes = bytes(string(abi.encodePacked(metadata)));
        string memory jsonString = jsonBytes.encode();

        return
            string(
                abi.encodePacked("data:application/json;base64,", jsonString)
            );
    }

    /**
    @dev get all the public tokens in the system
     */
    function getAllPublicTokens() public view returns (uint256[] memory) {
        return publicTokensIds;
    }

    /** 
    @dev gets tokens our customer made public
    @notice This function returns an array of tokenIds that our customer made public.
    */
    function getMyPublicTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._publicTokens;
    }

    /** 
    @dev gets tokens our customer made private
    @notice This function returns an array of tokenIds that our customer made private.
    */
    function getMyPrivateTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._privateTokens;
    }

    /**
    @notice share tokens
    @param _to address to share to.
    @param _tokenId the token to share
    */
    function shareToken(address _to, uint256 _tokenId) public {
        userTokens[_to]._receivedTokens.push(_tokenId);
        emit FileShared(_to, _tokenId);
    }

    /**
        @dev gets all the token shared to a costumer 
     */
    function getMyRecievedTokens() public view returns (uint256[] memory) {
        return userTokens[msg.sender]._receivedTokens;
    }

    /**
     @dev removes public tokens from an array
     @notice remove according to pushed _index = 0,1...
     */
    function removePublicTokens(uint256 _index) public onlyOwner {
        require(_index < publicTokensIds.length, "Upbox: Out of bound.");
        for (uint256 i = _index; i < publicTokensIds.length - 1; i++) {
            publicTokensIds[i] = publicTokensIds[i + 1];
        }
        publicTokensIds.pop();
    }

    /** 
    @notice This function adds an address to our blacklisted addresses
    @param _userAddress the address to be blacklisted
    */
    function addblackListedUser(address _userAddress) public onlyOwner {
        blackListedUsers[_userAddress] = true;
    }

    /** 
    @notice This function blackklists an address.
    @param _userAddress the address to be remove from blacklist.
    */
    function removeUserFromblackList(address _userAddress) public onlyOwner {
        blackListedUsers[_userAddress] = false;
    }

    /**
     * @notice Emergency stop contract in a case of a critical security flaw.
     */
    function destroy() public onlyOwner {
        selfdestruct(payable(owner()));
    }

    modifier whenNotBlacklisted() {
        require(!blackListedUsers[msg.sender], "Upbox: You are blacklisted.");
        _;
    }
}
