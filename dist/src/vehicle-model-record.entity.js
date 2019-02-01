"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const vehicle_model_entity_1 = require("./vehicle-model.entity");
const vehicle_model_version_entity_1 = require("./vehicle-model-version.entity");
let VehicleModelRecord = class VehicleModelRecord {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], VehicleModelRecord.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], VehicleModelRecord.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], VehicleModelRecord.prototype, "vehicle_model_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => vehicle_model_entity_1.VehicleModel, {
        eager: true
    }),
    typeorm_1.JoinColumn({ name: 'vehicle_model_id' }),
    __metadata("design:type", vehicle_model_entity_1.VehicleModel)
], VehicleModelRecord.prototype, "vehicle_model", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], VehicleModelRecord.prototype, "vehicle_model_version_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => vehicle_model_version_entity_1.VehicleModelVersion, {
        eager: true
    }),
    typeorm_1.JoinColumn({ name: 'vehicle_model_version_id' }),
    __metadata("design:type", vehicle_model_version_entity_1.VehicleModelVersion)
], VehicleModelRecord.prototype, "vehicle_model_version", void 0);
VehicleModelRecord = __decorate([
    typeorm_1.Entity()
], VehicleModelRecord);
exports.VehicleModelRecord = VehicleModelRecord;
//# sourceMappingURL=vehicle-model-record.entity.js.map