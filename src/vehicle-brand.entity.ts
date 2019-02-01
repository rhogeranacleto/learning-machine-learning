import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class VehicleBrand {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
}