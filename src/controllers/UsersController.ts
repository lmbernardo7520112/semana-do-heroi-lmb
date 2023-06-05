import { Request, Response, NextFunction } from 'express';
import { UsersServices } from '../services/UsersServices';
//import { IUpdate } from '../interfaces/UsersInterface';
import { IUpdate, FileUpload } from '../interfaces';
import { s3 } from '../config/aws';

interface CustomRequest extends Request {
  user_id: string;
}

class UsersController {
  private usersServices: UsersServices;
  
  constructor() {
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

  async auth(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    try {
    const result = await this.usersServices.auth(email, password);
    return response.json(result);
  } catch (error) {
    next(error);
   }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, oldPassword, newPassword } = request.body;
    const { user_id } = request;
    try {
      const result = await this.usersServices.update({
        name,
        oldPassword,
        newPassword,
        avatar_url: request.file as FileUpload,
        user_id,
      });
      return response.status(200).json(result);
      
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };


