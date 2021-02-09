import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Orphanage from './orphanages'
@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment') id: number;    
    @Column() path: string;    
    
    @ManyToOne(() => Orphanage, orphanage => orphanage.image)
    @JoinColumn({name: 'orphanage_id'})
    orphanage: Orphanage
}
 