
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const formatedDate = new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 2
    }).format(new Date());

    console.log(`[${formatedDate}]`, req.method, req.url);
    
    next();
  }
}
