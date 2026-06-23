import { Body, Controller, Get, Post, UseGuards,Patch,Param } from '@nestjs/common';

import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateLeadDto } from './dto/update-lead.dto';
@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }
  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }
  @Patch(':id')
update(
  @Param('id') id: string,
  @Body() updateLeadDto: UpdateLeadDto,
) {
  return this.leadsService.update(
    id,
    updateLeadDto,
  );
}
}
