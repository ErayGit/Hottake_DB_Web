import { BaseModel } from "./BaseModel";

/**
 * Model Class for creating User instances
 * extends the BaseModel
 */
enum Emoji{
  LAUGHING = 'laughing',
  CRYING = 'crying',
  PRAYER = 'prayer',
}

export class Post extends BaseModel<Post> {
  text!: string;
  musicUrl!: string;
  color!: string;
  emoji!: Emoji;
  creatorId!: string;
  fileId?: string;

  constructor(params: Partial<Post>) {
    super(params);
    Object.assign(this, params);
  }

}
