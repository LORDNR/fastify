import fastify, { FastifyServerOptions } from 'fastify'
import cors from '@fastify/cors'

import usersRouter from "./users";
import config from '../config';

const routes = () => {
    const server = fastify()

    server.register(cors, {
        credentials: true,
        origin: config.environments.ORIGIN,
    })

    server.register(usersRouter, { prefix: '/users' })

    return server
}

export default routes