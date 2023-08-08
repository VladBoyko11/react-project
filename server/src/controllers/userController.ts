import ApiError from '../error/ApiError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Basket, Device } from '../models/models';
import { NextFunction, Request, Response } from 'express';

const generateJwt = (id: number, email: string, role: string) => {
    // return jwt.sign(
    //     {id, email, role},
    //     process.env.SECRET_KEY,
    //     {expiresIn: '1h'}
    // )
}

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        // const {email, password, role = 'USER'} = req.body
        // if (!email || !password) {
        //     return next(ApiError.badRequest('Некорректный email или password'))
        // }
        // const candidate = await User.findOne({where: {email}})
        // if (candidate) {
        //     return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        // }
        // const hashPassword = await bcrypt.hash(password, 5)
        // const user = await User.create({email, role, password: hashPassword})
        // const basket = await Basket.create({userId: user.id})
        // const token = generateJwt(user.id, user.email, user.role)
        // return res.json({token, email, role, password, id: user.id})
    }

    async login(req: Request, res: Response, next: NextFunction) {
        // const {email, password} = req.body
        // const user = await User.findOne({where: {email}})
        // if (!user) {
        //     return next(ApiError.internal('Пользователь не найден'))
        // }
        // let comparePassword = bcrypt.compareSync(password, user.password)
        // if (!comparePassword) {
        //     return next(ApiError.internal('Указан неверный пароль'))
        // }
        // const token = generateJwt(user.id, user.email, user.role)
        // return res.json({token, role: user.role, id: user.id})
    }

    async check(req: Request, res: Response, next: NextFunction) {
        // const token = generateJwt(req.user.id, req.user.email, req.user.role)
        // return res.json({token, email: req.user.email, role: req.user.role, id: req.user.id})
    }
    async setNewEmail(req: Request, res: Response, next: NextFunction) {
        const {email, id} = req.body
        await User.update({email} ,{where: {id: id}})
        res.json('update successfully')
    }
}

export default new UserController()
