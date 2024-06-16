import {BaseModel} from "./BaseModel";

/**
 * Body that is used to send post data to the api
 */
export enum FollowStatus {
  PENDING = "pending",
}

export class Follow extends BaseModel<Follow> {
  status!: FollowStatus;
  followerId!: string;
  followedId!: string;
}
