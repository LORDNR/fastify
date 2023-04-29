import { Entity, Column, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from "typeorm"
import { SharedProp } from "./sharedProp.entity"
import { UserEntity } from "./users.entity"

@Entity({ name: 'posts' })
export class PostEntity extends SharedProp {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { name: 'title', nullable: false })
    title!: string

    @Column('text', { name: 'body', nullable: false })
    body!: string

    @Column('int', { name: 'user_id', nullable: false })
    userId!: number

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity
}