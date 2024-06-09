/**
 * Body that is used to send post data to the api
 */
export interface PostBody {
  text: string;
  musicArtist: string;
  musicTitle: string;
  color: string;
  emoji: string;
  fileId: string;
  creatorId: string;
}
