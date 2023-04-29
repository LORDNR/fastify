// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ObjectIdColumn, ObjectID } from "typeorm"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { SharedProp } from "./sharedProp.entity"
import { PostEntity } from "./posts.entity"

export enum UserType {
    admin = 'admin',
    user = 'user'
}

@Entity({ name: 'users' })
export class UserEntity extends SharedProp {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { name: 'first_name', nullable: false })
    firstName!: string

    @Column('varchar', { name: 'last_name', nullable: false })
    lastName!: string

    @Column('date', { name: 'birth_of_date', nullable: true })
    birthOfDate!: Date

    @Column('varchar', { name: 'email', unique: true, nullable: false })
    email!: string

    @Column('text', { name: 'password', nullable: false })
    password!: string

    @Column('text', { name: 'type' })
    type!: UserType

    @OneToMany(() => PostEntity, (posts: PostEntity) => posts.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    posts!: Array<PostEntity>
}