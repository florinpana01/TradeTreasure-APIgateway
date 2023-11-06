import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    user_id: number;

    @Column({default: 0})
    likes: number;
}