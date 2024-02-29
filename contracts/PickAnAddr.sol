// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract PickAnAddr {
    constructor() {}

    function pick(address[] memory addresses) public view returns (address) {
        return addresses[block.prevrandao % addresses.length];
    }
}
