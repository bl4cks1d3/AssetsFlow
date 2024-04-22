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
      accounts: [""],
      gas: 20000000,
    },
  },
};
