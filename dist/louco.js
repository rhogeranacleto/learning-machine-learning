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
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield typeorm_1.createConnection();
        const records = yield connection.getRepository(vehicle_model_record_entity_1.VehicleModelRecord).find({
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
            };
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
    });
}
bootstrap();
//# sourceMappingURL=louco.js.map