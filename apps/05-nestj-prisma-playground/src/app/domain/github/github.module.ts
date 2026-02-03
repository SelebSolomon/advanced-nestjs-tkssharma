import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { HttpModule } from '@nestjs/axios';
import { GithubClient } from './client';
@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [GithubService, GithubClient],
})
export class GithubModule {}
