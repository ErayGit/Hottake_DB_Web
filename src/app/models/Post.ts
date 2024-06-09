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
  musicArtist!: string;
  musicTitle!: string;
  color!: string;
  emoji!: string;
  creatorId!: string;
  fileId?: string;

  constructor(params: Partial<Post>) {
    super(params);
    Object.assign(this, params);
  }

}
