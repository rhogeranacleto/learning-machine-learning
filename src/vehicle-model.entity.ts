import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { VehicleBrand } from "./vehicle-brand.entity";

@Entity()
export class VehicleModel {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	vehicle_brand_id?: number;

	@ManyToOne(() => VehicleBrand, {
		eager: true
	})
	@JoinColumn({ name: 'vehicle_brand_id' })
	vehicle_brand?: VehicleBrand;
}