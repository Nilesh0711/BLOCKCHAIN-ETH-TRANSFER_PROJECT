// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transactions {
    string _greeting = "hello welcome to blockchain";
    uint256 transactionCounter;
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestap,
        string keyword
    );
    struct TransferStruct {
        address from;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestap;
        string keyword;
    }
    

    TransferStruct[] transactions;

    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCounter += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }

    function greet() public view returns (string memory) {
        return _greeting;
    }

    function setGreeting(string memory greeting) public {
        _greeting = greeting;
    }
}
