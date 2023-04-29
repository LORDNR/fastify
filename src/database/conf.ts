import "reflect-metadata"
import { Connection, createConnection } from "typeorm";
import { UserEntity, PostEntity } from './entites'
import config from "../config";


const entities = [UserEntity, PostEntity]

export const initDB = async (): Promise<Connection> => {
    const con = await createConnection({
        type: "mysql",
        url: config.environments.DB_URL,
        entities,
    })
    console.log('Connected to database successfully');
    await con.synchronize(false)
    return con;
}







