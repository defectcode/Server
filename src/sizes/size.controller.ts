import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { Auth } from 'src/auth/decorators/auth.decorator';
  import { SizeService } from './size.service';
  import { SizeDto } from './dto/size.dto';
  
  @Controller('sizes')
  export class SizeController {
    constructor(private readonly sizeService: SizeService) {}
  
    @Auth()
    @Get('by-storeId/:storeId')
    async getByStoreId(@Param('storeId') storeId: string) {
      return this.sizeService.getByStoreId(storeId);
    }
  
    @Auth()
    @Get('by-id/:id')
    async getById(@Param('id') id: string) {
      return this.sizeService.getById(id);
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Post(':storeId')
    async create(@Param('storeId') storeId: string, @Body() dto: SizeDto) {
      return this.sizeService.create(storeId, dto);
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: SizeDto) {
      return this.sizeService.update(id, dto);
    }
  
    @HttpCode(200)
    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.sizeService.delete(id);
    }
  }
  