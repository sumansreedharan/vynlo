import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  create(createLeadDto: CreateLeadDto) {
  return this.prisma.lead.create({
    data: createLeadDto,
  });
}
}