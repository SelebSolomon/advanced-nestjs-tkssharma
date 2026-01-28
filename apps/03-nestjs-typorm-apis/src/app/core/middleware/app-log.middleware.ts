import { NextFunction, Request, Response } from 'express';

export function AppLogger(req: Request, res: Response, next: NextFunction) {
  console.log('we just hit the app logger');
  next();
}
