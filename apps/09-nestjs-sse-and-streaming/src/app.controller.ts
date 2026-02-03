import { Controller, Get, Res, StreamableFile, Sse } from '@nestjs/common';
import { createReadStream } from 'fs';
import type { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageEvent } from './sse.interface';

@Controller()
export class AppController {
  constructor() {}

  // This one here is just for download file you know... if you hit this endpoint in browser it will download the package.json for you.
  @Get('/file')
  getFileChangingResponseObjDirectly(
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  // THIS ENDPOINT HERE IS FOR SSE server sent event for one way communication
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } }) as MessageEvent),
    );
  }
}
