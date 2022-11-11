import { ApiProperty } from '@nestjs/swagger';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BeforeInsert, 
    BeforeUpdate, 
    OneToMany,
    ManyToOne
} from 'typeorm';

import { ProductImage } from './';
import { User } from '../../auth/entities/users.entity';

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: 'e6dea9d7-e3d0-4c54-b61f-d4a3888c8378',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price'
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Inspired by the Model Y order confirmation graphic',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M','XL','XXL'],
        description: 'Product size'
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product gender'
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['shirt'],
        description: 'Product tags',
        default: []
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    //images relacion... el eager permite traer info de las relaciones
    @ApiProperty({
        example: ['https://myfile.jpg'],
        description: 'Product images'
    })
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User;
    

    @BeforeInsert()
    checkSlugInsert() {

        if( !this.slug ) {
            this.slug = this.title
              .toLowerCase()
              .replaceAll(' ', '_')
              .replaceAll("'", '')
          }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '') 
    }

    @BeforeUpdate()
    checkSlugUpdated() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
}
