import { Architect, Trainer } from 'synaptic';

const network = new Architect.Perceptron(2, 3, 1);

const rtain = new Trainer(network);

rtain.train([{
	input: [0, 0],
	output: [0]
}, {
	input: [1, 1],
	output: [0]
}, {
	input: [1, 0],
	output: [1]
}, {
	input: [0, 1],
	output: [1]
}], {
		log: 50
	})

// for (let i = 0; i < 2000; i++) {

// 	network.activate([0, 0]);
// 	network.propagate(.3, [0]);

// 	network.activate([1, 1]);
// 	network.propagate(.3, [0]);

// 	network.activate([1, 0]);
// 	network.propagate(.3, [1]);

// 	network.activate([0, 1]);
// 	network.propagate(.3, [1]);
// }

console.log(network.activate([0, 0]));
console.log(network.activate([0, 1]));
console.log(network.activate([1, 0]));
console.log(network.activate([1, 1]));