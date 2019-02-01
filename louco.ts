import { createConnection } from "typeorm";
import { VehicleModelRecord } from "./src/vehicle-model-record.entity";
import * as brain from 'brain.js';

process.stdin.resume();
process.stdin.setEncoding('utf8');

async function bootstrap() {

	const connection = await createConnection();

	const records = await connection.getRepository(VehicleModelRecord).find({
		take: 50
	});

	console.log(records.length);

	const net = new brain.recurrent.LSTM({
		hiddenLayers: [70, 20]
	});

	const train = net.train(records.map(record => {

		const modelName = record.vehicle_model ? record.vehicle_model.name : '';
		const versionName = record.vehicle_model_version ? record.vehicle_model_version.name : '';
		return {
			input: record.name,
			output: `${modelName} | ${versionName}`
		}
	}), {
			log: true,
			errorThresh: 0.1,
			iterations: 200
		});

	console.log(train);

	console.log('Pode digita:');

	process.stdin.on('data', function (chunk) {

		console.log(chunk);

		const output = net.run(chunk.split('\n')[0]);

		console.log(output);
	});


}

bootstrap();