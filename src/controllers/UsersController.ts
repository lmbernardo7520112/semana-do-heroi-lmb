import { Request, Response, NextFunction } from 'express';
import { UsersServices } from '../services/UsersServices';
import { v4 as uuid } from 'uuid';
import { s3 } from '../config/aws';
class UsersController {
    private usersServices: UsersServices;
    constructor(){
        this.usersServices = new UsersServices();
    }
  index() {
    // Your implementation here
  }

  show() {
    // Your implementation here
  }

  async store(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;
    try {
      const result = await this.usersServices.create({ name, email, password });
      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  auth() {
    // Your implementation here
  }

  async update(request: Request, response: Response, next: NextFunction){
    const { name, oldPassword, newPassword } = request.body;
    console.log(request.file);
    try {
      const avatar_url = request.file?.buffer;
      const uploads3 = await s3.upload({
        Bucket: 'semana-heroi-lmb',
        Key: `${uuid()}-${request.file?.originalname}`,
        //ACL: 'public-read',
        Body: avatar_url,
      }).promise();

      console.log('url imagem =>', uploads3.Location);
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
    

