import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
const { ethereum } = window;
import abi from "../artifacts/contracts/Lock.sol/Transactions.json";
const deployAddress = "0xFafC75E1416710Ef6c14a4805032f9f9b2d8939D";

export const TransactionContext = React.createContext();

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(deployAddress, abi.abi, signer);

  return contract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const getAllTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const TransCon = getEthereumContract();
      const availableTransactions = await TransCon.getAllTransactions();
      const structedTransactions = availableTransactions.map(
        (value, index) => ({
          addressTo: value.receiver,
          addressFrom: value.from,
          timestap: new Date(value.timestap.toNumber() * 1000).toLocaleString(),
          message: value.message,
          keyword: value.keyword,
          amount: parseInt(value.amount._hex) / 10 ** 18,
        })
      );
      setTransactions(structedTransactions);
    } catch (error) {
      console.log("error in getAllTransactions");
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      const TransCon = getEthereumContract();
      const transCount = await TransCon.getTransactionCount();
      window.localStorage.setItem("transactionCount", transCount);
    } catch (error) {
      console.log("error in checkIfTransactionExist");
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const account = await ethereum.request({ method: "eth_accounts" });
      if (account.length) {
        setcurrentAccount(account[0]);
        getAllTransaction();
      }
    } catch (error) {
      console.log("error in checkIfWalletConnected");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      console.log(addressTo, amount, keyword, message, currentAccount);
      const TransCon = getEthereumContract();
      const parasedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount.toString(),
            to: addressTo.toString(),
            value: parasedAmount._hex,
            gas: "0x5208",
          },
        ],
      });
      const transactionHash = await TransCon.addToBlockchain(
        addressTo,
        parasedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log("Loading: ", transactionHash.hash);
      await transactionHash.wait();
      setIsLoading(false);
      console.log("Success: ", transactionHash.hash);

      const transCount = await TransCon.getTransactionCount();
      setTransactionCount(transCount.toNumber());
    } catch (error) {
      console.log("error found in sendTransactions");
      // console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      setcurrentAccount(account[0]);
      // console.log(account);
    } catch (error) {
      console.log("error in connect wallet function");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    checkIfTransactionExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
        isLoading,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
