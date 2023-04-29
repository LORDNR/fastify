import { FastifyInstance } from 'fastify'

import { usersController } from '../controllers'

const usersRouter = async (server: FastifyInstance) => {
    server.get('/', usersController.find)
    server.get('/:id', usersController.findById)
    server.post('/', usersController.create)
    server.put('/:id', usersController.update)
    server.delete('/:id', usersController.remove)
}

export default usersRouter