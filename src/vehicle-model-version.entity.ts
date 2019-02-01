import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class VehicleModelVersion{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
}