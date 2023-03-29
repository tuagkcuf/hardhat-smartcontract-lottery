// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

error Raffle__NotEnoughETHEntered

contract Raffle {
    // State variables
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }
    
    function enterRaffle() {
        if(msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
    }

    function getEntranceFee() public view returns(uint256) {
        return i_entranceFee;
    }
}
