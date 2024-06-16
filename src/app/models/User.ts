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
  access_token?: string;

  constructor(params: Partial<User>) {
    console.log("here");
    console.log(params);
    super(params);
    Object.assign(this, params);
  }

  get nameT() {
    return this.firstName + " " + this.lastName;
  }
}
