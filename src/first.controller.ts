import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { First, MyFirstService } from './myfirst.service';

export class CreateDto {
  name: string;
}

@Controller('first')
@UseGuards(AuthGuard)
export class myFirstController {
  constructor(private myFirstService: MyFirstService) {}

  //   @Get()
  //   findAll(@Req() request: Request): string {
  //     return 'My First Controller' + request;
  //   }

  @Get()
  async findAll(): Promise<First[]> {
    return this.myFirstService.findAll();
  }

  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() createDto: CreateDto) {
    this.myFirstService.create(createDto);
    return 'My first post request';
  }

  @Get('ab*cd')
  @HttpCode(204)
  @Redirect('https://nestjs.com', 301)
  wildCard(): string {
    return 'My First Wildcard';
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): string {
    return `This is the id: #${id} of the app`;
  }

  @Get('async')
  async findAllAsync(): Promise<any[]> {
    return [];
  }
}
