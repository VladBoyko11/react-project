import * as dotenv from 'dotenv'
import express from 'express'
import sequelize from './db'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index'
import errorHandler from './middleware/ErrorHandlingMiddleware'
import path from 'path'

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
// app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        dotenv.config()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()