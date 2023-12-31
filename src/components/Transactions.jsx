import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";
import transactions from "../utils/dummy";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestap,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifs = useFetch({ keyword });
  return (
    <div className="bg-[#181918] m-4 flex flex-1 sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex flex-col justify-start w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base overflow-auto">Message: {message}</p>
            </>
          )}
        </div>

        <img
          src={gifs || url}
          alt="gif"
          className="w-full h-64 rounded-md shadow-lg object-cover"
        />

        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="font-bold text-[#37c7da]">{timestap}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  console.log(transactions);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col items-center py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect to your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...transactions].reverse().map((transactions, i) => (
            <TransactionsCard key={i} {...transactions} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
