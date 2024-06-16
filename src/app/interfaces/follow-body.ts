/**
 * Body that is used to send post data to the api
 */
export enum FollowStatus {
  PENDING = "pending",
}

export interface FollowBody {
  status: FollowStatus,
  followerId: string,
  followedId: string,
}
