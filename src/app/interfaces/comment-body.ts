import {Emoji} from "../models/Comment";

/**
 * Body that is used to send post data to the api
 */
export interface CommentBody {
  text: string;
  emoji: Emoji;
  creatorId: string;
  postId: string;
}
