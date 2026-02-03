import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { Observable } from 'rxjs';
import { GithubUser } from './user';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('users/:user')
  getUser(@Param('user') userName: string): Observable<GithubUser> {
    console.log('entered');
    return this.githubService.getUser(userName);
  }

  @Get('users')
  getUsers(@Query('users') user: string) {
    return this.githubService.getUsers(user);
  }
}
