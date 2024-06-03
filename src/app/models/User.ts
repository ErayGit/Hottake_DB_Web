import { BaseModel } from "./BaseModel";

/**
 * Model Class for creating User instances
 * extends the BaseModel
 */
export class User extends BaseModel<User> {
  name!: string;
  bio!: string;
  stadt!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: boolean;
  fileId?: string;

  constructor(params: Partial<User>) {
    super(params);
    Object.assign(this, params);
  }

  get nameT() {
    return this.firstName + " " + this.lastName;
  }
}
