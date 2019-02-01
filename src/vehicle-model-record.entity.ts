import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { VehicleModel } from './vehicle-model.entity';
import { VehicleModelVersion } from './vehicle-model-version.entity';

@Entity()
export class VehicleModelRecord {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	vehicle_model_id?: number;

	@ManyToOne(() => VehicleModel, {
		eager: true
	})
	@JoinColumn({ name: 'vehicle_model_id' })
	vehicle_model?: VehicleModel;

	@Column()
	vehicle_model_version_id?: number;

	@ManyToOne(() => VehicleModelVersion, {
		eager: true
	})
	@JoinColumn({ name: 'vehicle_model_version_id' })
	vehicle_model_version?: VehicleModelVersion;
}