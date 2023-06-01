export interface ICreate {
    name: string;
    email: string;
    password: string;
}

export interface IUpdate {
    name?: string;
    oldPassword?: string;
    newPassword?: string;
  }