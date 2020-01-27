pragma solidity ^0.5.0;

contract USERS {
    address public contractAddress;
    mapping(address => string) public userData;

    constructor() public {

	    contractAddress = msg.sender;
 }

 function saveData(address accountAddress,string memory fileHash) public returns (bool){
        userData[accountAddress] = fileHash;
        return true;
    }

    function getData(address accountAddress) public view returns (string memory){
        return userData[accountAddress];
    }

}