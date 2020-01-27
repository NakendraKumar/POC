pragma solidity ^0.5.0;

contract ASSETS {
    address public contractAddress;
    struct Asset {
        uint price;
        // address assetAddress;
        string name;
        address ownerAddress;
    }

    mapping(uint => Asset) public assets;

    constructor() public {
        contractAddress = msg.sender;
 }

  function createAsset(uint tokenId,address _ownerAddress, uint _price, string memory _name) public returns (bool){
    // Asset storage asset = assets[assetAddress];

    assets[tokenId] = Asset({
        price: _price,
        name: _name,
        ownerAddress: _ownerAddress
    });
    return true;
    }

    function getAsset(uint tokenId) public view returns (uint){
        return assets[tokenId].price;
    }


}