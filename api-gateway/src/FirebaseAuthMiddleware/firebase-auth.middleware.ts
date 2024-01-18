import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authorization token not provided' });
    }

    // Extract the actual JWT without the "Bearer" prefix
    const jwtToken = authToken.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(jwtToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error('Firebase Token Verification Error:', error);
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid authorization token' });
    }
  }
}
