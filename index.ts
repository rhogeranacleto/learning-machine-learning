import { createConnection } from "typeorm";
import { VehicleModelRecord } from "./src/vehicle-model-record.entity";
import * as brain from 'brain.js';

process.stdin.resume();
process.stdin.setEncoding('utf8');

function encode(d: string) {

	return d.split('').map(c => c.charCodeAt(0) / 255);
}

let maxLengthInput = -1;

function fixLengths(data) {

	if (maxLengthInput < 0) {

		for (let i = 0; i < data.length; i++) {

			if (data[i].input.length > maxLengthInput) {

				maxLengthInput = data[i].input.length;
			}
		}
	}

	for (let i = 0; i < data.length; i++) {

		while (data[i].input.length < maxLengthInput) {

			data[i].input.push(0);
		}
	}

	return data;
}

async function bootstrap() {

	const connection = await createConnection();

	const records = await connection.getRepository(VehicleModelRecord).find({
		take: 2000
	});

	console.log(records[1], records[5], records[7]);

	const net = new brain.NeuralNetwork({
		hiddenLayers: [20, 10]
	});

	const trainData = fixLengths(records.map(record => {

		if (record.vehicle_model && record.vehicle_model.vehicle_brand) {

			const brand = record.vehicle_model.vehicle_brand.name;
			// const versionName = record.vehicle_model_version ? record.vehicle_model_version.name : '';

			return {
				input: encode(record.name),
				output: {
					[brand]: 1
				}
			};
		}

		return;
	}).filter(Boolean));

	console.log(trainData.length);

	const train = net.train(trainData, {
		log: e => console.log(e),
		// learningRate: 0.1,
		// logPeriod: 1
		// errorThresh: 0.001,
		// iterations: 200
	});

	console.log(train);

	console.log('Pode digita:');

	process.stdin.on('data', function (chunk) {

		const split = chunk.split('\n')[0];
		const en = encode(split);

		while (en.length < maxLengthInput) {

			en.push(0);
		}

		// console.log(en);

		const output = net.run(en);

		// console.log('output', output);
		const jj = Object.entries(output).sort((a, b) => a[1] - b[1]);

		console.log('result', jj[0], jj[1], jj[2]);
	});
}

bootstrap();