// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;


contract Number {

    //global (state variable) b/c declared outside any functions. 
    // If it's visibility is not declared so defaults to private
    // Visibility for variables declared inside functions are local scoped to the functions
    uint256 public number; 

    //setter function (storeNumber function) declared as publicly readable: May be read externally, internally (i.e.,  by any parent or child contracts)
    //NB: There is  no access control function modifier so can be set by anyone.  Not a good security practice. Should set an onlyOwner function modifier
    function setNumber( uint256 _number) public{
        number = _number;
    }

    //getter function (retrieveNumber function) declared as publicly readable: May be read externally, internally (i.e.,  by any parent or child contracts)
    function getNumber() public view returns (uint256) {
        return number;
    }    

}