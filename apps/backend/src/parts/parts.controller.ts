import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('parts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  @Roles('Admin', 'Service Advisor')
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @Get()
  @Roles('Admin', 'Service Advisor', 'Mechanic')
  findAll() {
    return this.partsService.findAll();
  }

  @Get(':id')
  @Roles('Admin', 'Service Advisor', 'Mechanic')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Patch(':id')
  @Roles('Admin', 'Service Advisor')
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partsService.update(id, updatePartDto);
  }

  @Delete(':id')
  @Roles('Admin')
  remove(@Param('id') id: string) {
    return this.partsService.remove(id);
  }
}

