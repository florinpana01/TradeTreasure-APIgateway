// src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the Firebase JWT
      const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);

      // Attach the decoded token to the request for later use
      req['user'] = decodedToken;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
