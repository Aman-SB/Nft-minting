require('dotenv').config();

const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Lock.sol/MyNft.json");

// console.log(JSON.stringify(contract.abi));

const contractAddress = "0xAD3bE8991656afFD5417822bb62024c32CC15503"
const nftContract = new web3.eth.Contract(contract.abi, contract.address);

// creted transaction
async function mintNFt(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log("The hash of your transaction is: ",
                            hash,
                            "\n Check Alchemy's Mempool to view the status of your transaction!");
                    }
                    else {
                        console.log("Something went wring when submitiing your transaction: ", err);
                    }
                }
            );
        })
        .catch((err) => {
            console.log("Promise Failed:", err);
        });
}
mintNFt("https://gateway.pinata.cloud/ipfs/QmTrbJWMNRgSA944QgrJrRARm8RGFNT2tvSNdbiXj5mT1K");