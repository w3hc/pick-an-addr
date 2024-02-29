import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"
import { addresses } from "../addresses-list"

describe("PickAnAddr", function () {
    async function deployContracts() {
        const [alice, bob] = await ethers.getSigners()
        const PickAnAddr = await ethers.getContractFactory("PickAnAddr")
        const pickanaddr = await PickAnAddr.deploy()
        return { pickanaddr, alice, bob, addresses }
    }

    describe("Interactions", function () {
        it("Should return a random address", async function () {
            const { pickanaddr } = await loadFixture(deployContracts)
            const addressArray = addresses.trim().split("\n")
            const addressesArray = addressArray.map(
                address => `${address.trim()}`
            )
            for (let i = 0; i < 100; i++) {
                const pick = await pickanaddr.pick(addressesArray)
                console.log("pick:", pick)
                await ethers.provider.send("evm_mine")
                expect(addressesArray).to.include(pick)
            }
        })
    })
})
