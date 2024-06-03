/**
 * Body that is used to send user data to the api
 */
export interface UserBody {
  name: string,
  bio: string,
  stadt: string,
  email: string,
  password: string,
  firstName: string,
  lastName: boolean,
  fileId?: string
}
