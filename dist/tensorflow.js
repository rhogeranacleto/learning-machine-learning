"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = __importStar(require("@tensorflow/tfjs-node"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        model.compile({
            loss: 'meanSquaredError',
            optimizer: 'sgd'
        });
        const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4, 7], [7, 1]);
        const ys = tf.tensor2d([11, 10, 11, 14, 19, 26, 59], [7, 1]);
        yield model.fit(xs, ys, {
            epochs: 1000
        });
        console.log(model.predict(tf.tensor2d([7], [1, 1])).toString());
    });
}
bootstrap();
//# sourceMappingURL=tensorflow.js.map