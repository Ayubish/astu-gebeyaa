import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        // Add other user properties as needed
      };
    }
  }
}

export interface RequestWithUser extends Request {
  user: {
    id: string;
    role: string;
    // Add other user properties as needed
  };
}
