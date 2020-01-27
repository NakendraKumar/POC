pragma solidity ^0.5.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract MyERC721 is ERC721Full {
    constructor (string memory name, string memory symbol) public
    ERC721Full(name, symbol)
{
}


function transfer_From(address from, address to, uint256 tokenId) public {
   super._transferFrom(from, to, tokenId);
}


function mint(address to, uint256 tokenId) public {
   super._mint(to, tokenId);
}


}