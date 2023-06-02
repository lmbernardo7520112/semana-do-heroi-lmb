import { Request, Response, NextFunction } from 'express';
import { UsersServices } from '../services/UsersServices';
//import { IUpdate, FileUpload } from '../interfaces';
//import { s3 } from '../config/aws';
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

  auth(request: Request, response: Response, next: NextFunction) {
   try {
    const result = this.usersServices.auth();
    return response.json(result);
  } catch (error) {
    next(error);
   }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, oldPassword, newPassword } = request.body;
    //console.log(request.file);
    try {
      const result = await this.usersServices.update({
        name,
        oldPassword,
        newPassword,
        avatar_url: request.file,
      });
      return response.status(200).json(result);
      
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };


