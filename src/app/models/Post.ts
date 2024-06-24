import { BaseModel } from "./BaseModel";
import {User} from "./User";

/**
 * Model Class for creating User instances
 * extends the BaseModel
 */

export class Post extends BaseModel<Post> {
  text!: string;
  musicUrl!: string;
  musicArtist!: string;
  musicTitle!: string;
  color!: string;
  emoji!: string;
  creatorId!: string;
  user?: User;
  fileId?: string;

  constructor(params: Partial<Post>) {
    super(params);
    Object.assign(this, params);
  }

}
