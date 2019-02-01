"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const synaptic_1 = require("synaptic");
const network = new synaptic_1.Architect.Perceptron(2, 3, 1);
for (let i = 0; i < 2000; i++) {
    network.activate([0, 0]);
    network.propagate(.3, [0]);
    network.activate([1, 1]);
    network.propagate(.3, [0]);
    network.activate([1, 0]);
    network.propagate(.3, [1]);
    network.activate([0, 1]);
    network.propagate(.3, [1]);
}
console.log(network.activate([0, 0]));
console.log(network.activate([0, 1]));
console.log(network.activate([1, 0]));
console.log(network.activate([1, 1]));
//# sourceMappingURL=synaptic.js.map