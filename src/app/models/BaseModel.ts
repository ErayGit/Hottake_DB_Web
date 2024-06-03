/**
 * abstract BaseModel class that will be extended by the other models
 */
export abstract class BaseModel<Model extends BaseModel<Model>> {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  protected constructor(object: Partial<Model>) {
    Object.assign(this, object);
  }
}
