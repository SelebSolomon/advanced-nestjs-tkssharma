import { Injectable } from '@nestjs/common';
import { forkJoin, map, Observable } from 'rxjs';
import { GithubUser } from './user';
import { GithubClient } from './client';

@Injectable()
export class GithubService {
  constructor(private readonly githubClient: GithubClient) {}
  getUser(username: string): Observable<GithubUser> {
    console.log('service github');
    return this.githubClient
      .getUser(username.trim())
      .pipe(map((res) => res.data));
  }

  getUsers(users: string): Observable<GithubUser[]> {
    const observable = users.split(',').map((user) => {
      return this.githubClient
        .getUser(user.trim())
        .pipe(map((res) => res.data));
    });
    return forkJoin(observable);
  }
}
