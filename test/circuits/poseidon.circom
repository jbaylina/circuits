include "../../node_modules/circomlib/circuits/poseidon.circom";

template PoseidonTest() {
	signal input in[3];
	signal output out;

	component h = Poseidon(3, 6, 8, 57);
	h.inputs[0] <== in[0];
	h.inputs[1] <== in[1];
	h.inputs[2] <== in[2];

	out <== h.out;
}
component main = PoseidonTest();



