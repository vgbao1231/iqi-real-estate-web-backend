import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMerchandiseDto } from './dto/CreateMerchandiseDto';
import { UpdateMerchandiseDto } from './dto/UpdateMerchandiseDto';
import { MerchandiseService } from './merchandise.service';

@Controller('merchandises')
export class MerchandiseController {
  constructor(private readonly merchandiseService: MerchandiseService) {}
  @Get()
  findAll() {
    return this.merchandiseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchandiseService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMerchandiseDto: CreateMerchandiseDto) {
    return this.merchandiseService.create(createMerchandiseDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateMerchandiseDto: UpdateMerchandiseDto,
  ) {
    return this.merchandiseService.update(id, updateMerchandiseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return this.merchandiseService.delete(id);
  }
}
