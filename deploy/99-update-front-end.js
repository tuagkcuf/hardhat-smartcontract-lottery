const { ethers, network } = require("hardhat")
const fs = require("fs")
const { contract } = require("@chainlink/test-helpers")

const FRONT_END_ADDRESSES_FILE = "../../nextjs-smartcontract-lottery/constants/contractAddress.json"
const FRONT_END_ABI_FILE = "../../nextjs-smartcontract-lottery/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAdresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (chainId in currentAdresses) {
        if (!currentAdresses[chainId].inlcudes(raffle.address)) {
            currentAdresses[chainId].push(raffle.address)
        }
    } else {
        currentAdresses[chainId] = [raffle.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAdresses))
}

module.exports.tags = ["all", "frontend"]
