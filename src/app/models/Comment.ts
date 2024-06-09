import { BaseModel } from "./BaseModel";

/**
 * Model Class for creating User instances
 * extends the BaseModel
 */
export enum Emoji{
  LAUGHING = 'laughing',
  CRYING = 'crying',
  PRAYER = 'prayer',
}

export class Comment extends BaseModel<Comment> {
  text!: string;
  emoji!: Emoji;

  constructor(params: Partial<Comment>) {
    super(params);
    Object.assign(this, params);
  }

}
