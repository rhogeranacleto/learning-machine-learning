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
const typeorm_1 = require("typeorm");
const vehicle_model_record_entity_1 = require("./src/vehicle-model-record.entity");
const brain = __importStar(require("brain.js"));
process.stdin.resume();
process.stdin.setEncoding('utf8');
function encode(d) {
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
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield typeorm_1.createConnection();
        const records = yield connection.getRepository(vehicle_model_record_entity_1.VehicleModelRecord).find({
            take: 2000
        });
        console.log(records[1], records[5], records[7]);
        const net = new brain.NeuralNetwork({
            hiddenLayers: [20, 10]
        });
        const trainData = fixLengths(records.map(record => {
            if (record.vehicle_model && record.vehicle_model.vehicle_brand) {
                const brand = record.vehicle_model.vehicle_brand.name;
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
        });
        console.log(train);
        console.log('Pode digita:');
        process.stdin.on('data', function (chunk) {
            const split = chunk.split('\n')[0];
            const en = encode(split);
            while (en.length < maxLengthInput) {
                en.push(0);
            }
            const output = net.run(en);
            const jj = Object.entries(output).sort((a, b) => a[1] - b[1]);
            console.log('result', jj[0], jj[1], jj[2]);
        });
    });
}
bootstrap();
//# sourceMappingURL=index.js.map