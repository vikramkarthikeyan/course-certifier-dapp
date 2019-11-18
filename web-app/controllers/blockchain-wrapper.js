var config = require('../config.json');
var Web3 = require('web3');
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.WebsocketProvider(config.blockchain_endpoint));

// Setup contract instance
var contractArtifact = require('../../../course-certifier-contract/build/contracts/DICCertification.json');
var contractInstance = new web3.eth.Contract(contractArtifact.abi, config.contract_address);

module.exports = {

    // Get current nonce and sign transaction
    signTransaction: function(abi, callback) {
        web3.eth.getTransactionCount(config.primary_account).then(function(count){
            let tx = {
              gas: 1000000,
              data: abi,
              value: 0,
              nonce: count,
              to: config.contract_address
            }
          
            var privateKey = Buffer.from(config.private_key, 'hex')
            var transaction = new Tx(tx);
          
            transaction.sign(privateKey);
          
            web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
                      .on('transactionHash', function(hash){
                          console.log("Txn executed");
                          callback(200);
                      })
                      .on('error', function(err){
                          console.log("Txn reverted/failed");
                          callback(500);
                      });
        });
    },

    // Wrappers for Smart Contract functions
    getAddCSCourseABI: function(personNumber, programCode, courseGPA, callback) {
        callback(contractInstance.methods.addCSCourse(personNumber, programCode, courseGPA).encodeABI());
    },

    getAddNonCSCourseABI: function(personNumber, programCode, courseGPA, callback) {
        callback(contractInstance.methods.addNonCSCourse(personNumber, programCode, courseGPA).encodeABI());
    },

    getVerifyCapstoneProjectABI: function(personNumber, callback) {
        callback(contractInstance.methods.verifyCapstoneProject(personNumber).encodeABI());
    },

    getVerifyDomainRequirementABI: function(personNumber, callback) {
        callback(contractInstance.methods.verifyDomainRequirement(personNumber).encodeABI());
    },

    getCheckEligibility: function(personNumber, callback) {
        callback(contractInstance.methods.checkEligibility(personNumber).encodeABI());
    },

    waitForEvents: function(callback) {
        contractInstance.events.allEvents({ fromBlock: 'latest' })
            .on('data', console.log)
            .on('changed', console.log)
            .on('error', console.log)
    }

};

function numStringToBytes32(num) { 
    var bn = web3.utils.toBN(num);
    return padToBytes32(bn.toString(16));
}

function padToBytes32(n) {
    while (n.length < 64) {
        n = "0" + n;
    }
    return "0x" + n;
}