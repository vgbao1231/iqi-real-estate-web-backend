import { PartialType } from '@nestjs/swagger';
import { CreateMerchandiseDto } from './CreateMerchandiseDto';

export class UpdateMerchandiseDto extends PartialType(CreateMerchandiseDto) {}
