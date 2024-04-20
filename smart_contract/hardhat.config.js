require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    shm: {
      url: "http://18.185.76.64:8080",
      accounts: ["3a964bd9603c3853a6733ea75076f5fff21a4ed62102a64b09afd5cb4ee28db3"],
      gas: 20000000,
    },
  },
};
