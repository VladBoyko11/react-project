import { Sequelize } from 'sequelize'

// const dbName: string = process.env.DB_NAME as string
// const dbUser: string = 'postgres'
// const dbPassword: string = 'root'
// const dbPort: number = 5432

export default new Sequelize(
    'store-app', 
    'postgres', 
    'root',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT)
    }
)
