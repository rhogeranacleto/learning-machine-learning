import * as tf from '@tensorflow/tfjs-node';

// Y=x*x+10

async function bootstrap() {

	const model = tf.sequential();
	model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

	model.compile({
		loss: 'meanSquaredError',
		optimizer: 'sgd'
	});

	const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4, 7], [7, 1]);
	const ys = tf.tensor2d([11, 10, 11, 14, 19, 26, 59], [7, 1]);

	await model.fit(xs, ys, {
		epochs: 1000
	});

	console.log(model.predict(tf.tensor2d([7], [1, 1])).toString());
}

bootstrap();