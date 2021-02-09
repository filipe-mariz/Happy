import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './images';

@Entity('orphanages')
export default class Orfanage {
    @PrimaryGeneratedColumn('increment') id: number;    
    @Column() name: string;    
    @Column() latitude: number;
    @Column() longitude: number;
    @Column() about: string;
    @Column() instructions: string;
    @Column() openning_hours: string;
    @Column()open_on_weekend: boolean;
    
    @OneToMany(() => Image, image => image.orphanage, { 
        cascade: ['insert', 'update'] 
    })
    @JoinColumn({ name: 'orphanage_id' })  
    image: Image[]
 
}
