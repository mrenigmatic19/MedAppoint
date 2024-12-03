module.exports = {
  networks: {
      development: {
          host: "127.0.0.1",
          port: 8545,   // Use 7545 if using Ganache Desktop
          network_id: "*" // Match any network id
      }
  },
  compilers: {
      solc: {
          version: "0.8.0"
      }
  }
};