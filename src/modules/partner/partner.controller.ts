import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdatePartnerDto } from './dto/UpdatePartnerDto';
import { PartnerService } from './partner.service';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async findAll() {
    return this.partnerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.partnerService.findById(id);
  }

  @Post()
  async create(@Body() body: Prisma.PartnerCreateInput) {
    return this.partnerService.create(body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
    return this.partnerService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.partnerService.delete(id);
  }
}
