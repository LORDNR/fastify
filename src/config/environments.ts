import 'dotenv/config'

const environments = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    ORIGIN: process.env.ORIGIN || '*',
}

export default environments