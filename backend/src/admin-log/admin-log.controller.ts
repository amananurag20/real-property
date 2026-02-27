import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminLogService } from './admin-log.service';
import { ListAdminLogsDto } from './dto/list-admin-logs.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../generated/prisma/enums';

@ApiTags('Admin Logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin-log')
export class AdminLogController {
  constructor(private readonly adminLogService: AdminLogService) {}

  @Get()
  @ApiOperation({ summary: '[ADMIN] List admin audit logs' })
  findAll(@Query() dto: ListAdminLogsDto) {
    return this.adminLogService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '[ADMIN] Get log details' })
  findOne(@Param('id') id: string) {
    return this.adminLogService.findOne(id);
  }
}
