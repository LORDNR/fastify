import { FastifyRequest, FastifyReply } from 'fastify'
import { UserEntity, UserType } from '../database/entites'
import { Connection, getConnection } from 'typeorm';

const find = async (request: FastifyRequest<{ Querystring: { id: number, email: string } }>, reply: FastifyReply) => {
    try {
        const connection: Connection = getConnection();
        const userRepository = connection!.getRepository(UserEntity);

        const options = { where: { ...request.query } }
        const users = await userRepository.find(options);
        // delete (users as Partial<UserEntity>).password
        const sanitizedUsers = users.map((userData: UserEntity) => ({ ...userData, password: undefined }));
        reply.send({
            status: "success",
            data: sanitizedUsers
        });
    } catch (error) {
        reply.status(500).send(error);
    }
}

const findById = async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
    try {
        const connection: Connection = getConnection();
        const userRepository = connection!.getRepository(UserEntity);
        const id = request.params.id; // assuming the id is passed as a URL parameter
        const user = await userRepository.findOne(id);
        delete (user as Partial<UserEntity>).password
        if (!user) {
            reply.status(404).send("User not found");
        } else {
            reply.send({
                status: "success",
                data: user
            });
        }
    } catch (error) {
        reply.status(500).send(error);
    }
}

const create = async (request: FastifyRequest<{ Body: { firstName: string; lastName: string, birthOfDate: Date, email: string, password: string, type: UserType } }>, reply: FastifyReply) => {
    try {
        const connection: Connection = getConnection();
        const userRepository = connection!.getRepository(UserEntity);
        const { firstName, lastName, birthOfDate, email, password, type } = request.body

        const newUser = userRepository.create({ firstName, lastName, email, birthOfDate, password, type })
        const savedUser = await userRepository.save(newUser);
        delete (savedUser as Partial<UserEntity>).password
        reply.status(201).send({
            status: "success",
            data: savedUser
        });
    } catch (error) {
        reply.status(500).send(error);
    }
}

const update = async (request: FastifyRequest<{ Params: { id: string }, Body: { firstName: string; lastName: string, birthOfDate: Date, email: string, password: string, type: UserType } }>, reply: FastifyReply) => {
    try {
        const connection: Connection = getConnection();
        const userRepository = connection!.getRepository(UserEntity);
        const id = request.params.id;
        const { firstName, lastName, birthOfDate, email, password, type } = request.body
        const user = await userRepository.findOne(id);
        if (!user) {
            return reply.status(404).send(`User with ID ${id} not found`);
        }
        user.firstName = firstName ?? user.firstName
        user.lastName = lastName ?? user.lastName
        user.birthOfDate = birthOfDate ?? user.birthOfDate
        user.email = email ?? user.email
        user.password = password ?? user.password
        user.type = type ?? user.type

        const updatedUser = await userRepository.save(user);
        delete (updatedUser as Partial<UserEntity>).password
        reply.send({
            status: "success",
            data: updatedUser
        });
    } catch (error) {
        reply.status(500).send(error);
    }
}

const remove = async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
    try {
        const connection: Connection = getConnection();
        const userRepository = connection.getRepository(UserEntity);
        const { id } = request.params;

        const userToRemove = await userRepository.findOne(id);

        if (!userToRemove) {
            reply.status(404).send({ status: "error", message: "User not found" });
            return;
        }

        await userRepository.remove(userToRemove);

        reply.status(204)
    } catch (error) {
        reply.status(500).send(error);
    }
}


export default { find, findById, create, update, remove }
