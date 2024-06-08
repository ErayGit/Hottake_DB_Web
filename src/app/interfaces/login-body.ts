/**
 * login body containing username and password.
 */
export interface LoginBody {
  email: string;
  password: string;
  fileId?: string
}
