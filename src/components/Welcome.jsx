import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./Loader";
import { ethers } from "ethers";
import { TransactionContext } from "../context/TransactionContext";
import React, { useContext } from "react";
import { shortenAddress } from "../utils/shortenAddress";
console.log("hello");

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, handle }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    className="my-2 w-full rounded-md p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    onChange={(e) => handle(e, name)}
  />
);

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return;
    sendTransaction();
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-col flex-1 justify-start items-start md:mr-10">
          <h1 className="text-3xl sm:text-5xl py-1 text-gradient text-white ">
            Send Crypto across the world
          </h1>
          <p className="text-white text-left mt-5 font-light md:w-9/12 w-11/12 text-base ">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto.
          </p>
          {!currentAccount && (
            <button
              type="button"
              className="w-full flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              onClick={connectWallet}
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="mt-10 grid sm:grid-cols-3 grid-cols-2 w-full">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={`${companyCommonStyles}`}>Ethereum</div>
            <div className={`rounded-tr-2xl ${companyCommonStyles}`}>
              Security
            </div>
            <div className={`rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={`${companyCommonStyles}`}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-start flex-1 md:mt-0 mt-10">
          <div className="flex flex-col rounded-xl h-40 w-72 p-3 eth-card">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex justify-between">
                <div className="w-10 h-10 rounded-full flex border-2 border-white justify-center items-center">
                  <SiEthereum color="#fff" fontSize={21} />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">{shortenAddress(currentAccount)}</p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="my-5 p-5 flex flex-col justify-start items-center w-full md:w-92 blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handle={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handle={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handle={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handle={handleChange}
            />

            <div className="bg-gray-400 h-[1px] w-full my-2"></div>

            {isLoading ? (
              <Loader />
            ) : (
              <button
                onClick={handleSubmit}
                className="text-white border-white border-[1px] mt-2 w-full p-2 rounded-full cursor-pointer hover:bg-gray-800 "
              >
                Send now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
