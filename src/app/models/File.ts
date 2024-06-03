import { BaseModel } from "./BaseModel";

/**
 * Model Class for creating User instances
 * extends the BaseModel
 */
export class File extends BaseModel<File> {


  constructor(params: Partial<File>) {
    super(params);
    Object.assign(this, params);
  }
}
