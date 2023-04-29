import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class SharedProp {
    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt!: Date

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt!: Date
}