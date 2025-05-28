// src/types/express/index.d.ts
import { User } from '../../models/User';  // wherever your User type lives

declare global {
  namespace Express {
    interface Request {
      user?: User;   // or 'user: User' if you always set it
    }
  }
}
