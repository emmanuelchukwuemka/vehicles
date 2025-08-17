import { UserAttributes } from "../modules/users/user.models"; // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: Partial<UserAttributes>;
    }
  }
}
