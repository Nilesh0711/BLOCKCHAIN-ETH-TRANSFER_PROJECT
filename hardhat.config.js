require("@nomiclabs/hardhat-waffle");
module.exports = {
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    // hardhat: {
    //   chainId: 1337,
    // },
    // goerli: {
    //   url: "https://eth-goerli.g.alchemy.com/v2/7nfNhckLBDl6adIgM7eG0b5niJwC2_rY",
    //   accounts: [
    //     "729d12ec66fcb6b23c2522c45d1f38bdbc3dbe1fb667e2d1438c01ef23b1a3ca",
    //   ],
    // },
    ganache: {
      url: "HTTP://127.0.0.1:7545", // Replace with the URL of your Ganache instance
      chainId: 1337, // Ganache's default chain ID is usually 1337
    },

  },
  solidity: "0.8.9",
};
// 0xFafC75E1416710Ef6c14a4805032f9f9b2d8939D