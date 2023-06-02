import { compare, hash } from "bcrypt";
import { ICreate, IUpdate } from "../interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";
import { s3 } from "../config/aws";
import { request } from "express";
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';


class UsersServices {
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async create({ name, email, password }: ICreate) {
        const findUser = await this.usersRepository.findUserByEmail(email)

        if (findUser) {
            throw new Error('User exists')
        }

        const hashPassword = await hash(password, 10);
        const create = await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
        });
        return create;
    }

    async update({ name,
        oldPassword,
        newPassword,
        avatar_url }: IUpdate) {

            const uploadImage = avatar_url?.buffer;
            const uploads3 = await s3.upload({
              Bucket: 'semana-heroi-lmb',
              Key: `${uuid()}-${avatar_url?.originalname}`,
              //ACL: 'public-read',
              Body: uploadImage,
            })
            .promise();
            console.log('url imagem =>', uploads3.Location);   
    }

    async auth(email: string, password: string) {
        const findUser = await this.usersRepository.findUserByEmail(email);
        if (!findUser) {
            throw new Error('User or password not found');
        }
        const passwordMatch = compare(password, findUser.password);
        if (!passwordMatch) {
            throw new Error('User or password not found');
        }

        const token = sign({email}, 'a696c58d37f27ac9f6521a5235815e60');
    }
}

export { UsersServices };
