import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';
import {
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  CreateRestaurantBodyDto,
  getRestaurantByIdDto,
  SearchQueryDto,
} from '../dto/restaurant.dto';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NO_ENTITY_FOUND,
  UNAUTHORIZED_REQUEST,
} from 'src/app/app.constants';

// interceptor
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFile } from 'src/app/core/decorators/file-upload-decorator';
import { imageFileFilter } from 'src/app/core/filter/file.filter';
import type { Request } from 'express';

@Controller('restaurants')
export class RestaurantController {
  constructor(private service: RestaurantService) {}

  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'search restaurants based on lat/lon',
  })
  @ApiOkResponse({
    description: 'return search restaurants successfully',
  })
  @Get('/search')
  public async searchRestaurant(@Query() query: SearchQueryDto) {
    return await this.service.search(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'search restaurants based on lat/lon',
  })
  @ApiOkResponse({
    description: 'return search restaurants successfully',
  })
  @Post('/')
  public async createRestaurant(@Body() payload: CreateRestaurantBodyDto) {
    return await this.service.createRestaurant(payload);
  }

  @HttpCode(HttpStatus.OK)
  @ApiConsumes('application/json')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @ApiOperation({
    description: 'search restaurants based on lat/lon',
  })
  @ApiOkResponse({
    description: 'return search restaurants successfully',
  })
  @Get('/:id')
  public async getRestaurantById(@Param() param: getRestaurantByIdDto) {
    return await this.service.getRestaurantById(param);
  }

  @ApiConsumes('multipart/form-data')
  // this is a custom swagger configuration that i created uploadfile
  @uploadFile('file')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 5 })
        .addFileTypeValidator({ fileType: /(jpg|jpeg|png|)$/ })
        .build(),
    )
    file,
  ) {
    console.log(file);
    return {
      data: file,
      message: 'File uploaded successfully',
    };
  }

  // this is another way we can do it using a custom filter i created for the interceptors
  @ApiConsumes('multipart/form-data')
  // this is a custom swagger configuration that i created uploadfile
  @uploadFile('file')
  @ApiNotFoundResponse({ description: NO_ENTITY_FOUND })
  @ApiForbiddenResponse({ description: UNAUTHORIZED_REQUEST })
  @ApiUnprocessableEntityResponse({ description: BAD_REQUEST })
  @ApiInternalServerErrorResponse({ description: INTERNAL_SERVER_ERROR })
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  @Post('upload-with-filter')
  customFilterUpload(
    @Req() req: Request,
    @UploadedFile()
    file,
  ) {
    const request = req as Request & { fileValidationError?: string };

    if (!file || request.fileValidationError) {
      throw new BadRequestException('invalid file provider');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // 'imagination'.split('')[3];
    console.log(file);
    return {
      data: file,
      message: 'File uploaded successfully',
    };
  }
}
