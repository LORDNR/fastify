import 'dotenv/config'

import { initDB } from './database';
import routes from './routes';

const server = routes()

server.listen({ port: 3000 }, async (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    try {
        await initDB()
    } catch (error) {
        console.error('Error connecting to the database', error)
        process.exit(1)
    }

    console.log(`Server listening at ${address}`)
})

