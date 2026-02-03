import { Role } from './decorators/role-allowed';
import 'express';

declare module 'express' {
  export interface Request {
    roles?: Role[];
  }
}
