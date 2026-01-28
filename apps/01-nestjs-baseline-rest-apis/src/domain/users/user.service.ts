import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/user.dto';
import { HTTP_CLIENT_TOKEN, HttpClientService } from '@dev/http';
@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @Inject(HTTP_CLIENT_TOKEN)
    private apiService: HttpClientService,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async fetchUsers() {
    try {
      this.logger.log(`handling fetchUsers`);
      await this.apiService.fetch('get', {});
      return await this.usersRepository.find({});
    } catch (err) {
      try {
        this.logger.error('fetchUsers failed', err);
      } catch (error) {
        console.log(error);
        // swallow logger errors, never crash request
      }
      throw err; // rethrow to controller or filter
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  createUser(body: CreateUserDTO) {
    return this.usersRepository.save(body);
  }
}
