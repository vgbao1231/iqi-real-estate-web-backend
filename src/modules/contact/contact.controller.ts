import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactService } from './contact.service';
import { UpsertContactDto } from './dto/UpsertContactDto ';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findOne() {
    return this.contactService.findOne();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  upsert(@Body() upsertContactDto: UpsertContactDto) {
    return this.contactService.upsert(upsertContactDto);
  }
}
