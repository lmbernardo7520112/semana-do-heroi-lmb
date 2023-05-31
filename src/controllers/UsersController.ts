import { Request, Response, NextFunction } from 'express';
import { UsersServices } from '../services/UsersServices';

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
}

export { UsersController };
    

