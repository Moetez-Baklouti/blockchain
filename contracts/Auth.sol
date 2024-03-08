//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Auth {
    enum Role { Acteur1, Acteur2, Acteur3, Acteur4 }

    mapping(address => Role) public userRoles;

    constructor() {
    userRoles[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266] = Role.Acteur1;
    userRoles[0x70997970C51812dc3A010C7d01b50e0d17dc79C8] = Role.Acteur2;
    userRoles[0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC] = Role.Acteur3;
    userRoles[0x90F79bf6EB2c4f870365E785982E1f101E93b906] = Role.Acteur4;
    
    }

    modifier onlyRole(Role role) {
        require(userRoles[msg.sender] == role, "Unauthorized");
        _;
    }

    function setUserRole(address user, Role role) public onlyRole(Role.Acteur1) {
        userRoles[user] = role;
    }

    function getUserRole(address user) public view returns (Role) {
        return userRoles[user];
    }

    // Other functions and logic...
}