const path = require("path");
const snarkjs = require("snarkjs");
const compiler = require("circom");
const chai = require("chai");
const assert = chai.assert;

export {};

describe("idState test", function () {
    this.timeout(200000);


    it("Test IdState", async () => {
        const compiledCircuit = await compiler(
            path.join(__dirname, "circuits", "idState.circom"),
            { reduceConstraints: false }
        );
        const circuit = new snarkjs.Circuit(compiledCircuit);

        const privKStr = "6190793965647866647574058687473278714480561351424348391693421151024369116465";

        // input data generated with circuits/test/testvectorsgen/idState_test.go, which uses go-iden3-core
        const witness = circuit.calculateWitness({
            id: "418819843184716391854950027336187830212226236089582432322628806588929540096",
            nullifier: "671692610057391772997248859095625772589813015124146528392458976400562382489",
            oldIdState: "0",
            userPrivateKey: "6190793965647866647574058687473278714480561351424348391693421151024369116465",
            mtp: ["0", "0", "0", "0"],
            claimsTreeRoot: "19759495200350784025545259483378281480848861021788190330947710448581962628389",
            revTreeRoot: "0",
            rootsTreeRoot: "4993494596562389383889749727008725160160552507022773815483402975297010560970",
            newIdState: "418819843184716391854950027336187830212226236089582432322628806588929540096"
        });
        assert(circuit.checkWitness(witness));
        // const out0 = witness[circuit.getSignalIdx("main.out0")];
        // const out1 = witness[circuit.getSignalIdx("main.out1")];
        // console.log(out0);
        // console.log(out1);
    });
});
