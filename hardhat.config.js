require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const infura = "https://sepolia.infura.io/v3/3d425329cc8f4706be2fe4d4ee75190d";
const key = "63d5b4fc150c9a12a69f98f9f8352084f2dec1c935e7c2729b981d494c3879a4";

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: infura,
      accounts: [key],
    },
  },
};
