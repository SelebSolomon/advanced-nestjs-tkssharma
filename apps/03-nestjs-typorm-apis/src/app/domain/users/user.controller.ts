import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UsersEntity } from './entities/user.entity';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreatedUserResponseDto,
  CreateUserDTO,
  QueryDto,
} from './dto/user.dto';
import { AuthGuard } from 'src/app/core/guards/auth-guard';
import { Role, Roles } from 'src/app/core/decorators/role-allowed';

@ApiTags('users')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [CreatedUserResponseDto],
    description: 'User created sucessfully',
  })
  @ApiOperation({ description: 'user create api' })
  @ApiConsumes('application/json')
  @Get()
  async findAll(@Query() query: QueryDto): Promise<UsersEntity[]> {
    console.log(query);
    return await this.userService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [CreatedUserResponseDto],
    description: 'User created sucessfully',
  })
  @ApiOperation({ description: 'user create api' })
  @ApiConsumes('application/json')
  @Get('fetch-users')
  fetchUsers() {
    return this.userService.fetchUsers();
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CreatedUserResponseDto,
    description: 'User created sucessfully',
  })
  @ApiOperation({ description: 'user create api' })
  @ApiConsumes('application/json')
  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }
}
