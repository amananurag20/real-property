import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ServiceProviderProfileService } from './service-provider-profile.service';
import { CreateServiceProviderProfileDto } from './dto/create-service-provider-profile.dto';
import { UpdateServiceProviderProfileDto } from './dto/update-service-provider-profile.dto';
import { ListServiceProviderProfilesDto } from './dto/list-service-provider-profiles.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard, Role } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ApprovalStatus } from '../../generated/prisma/enums';

@ApiTags('Service Provider Profile')
@Controller('service-provider-profile')
export class ServiceProviderProfileController {
  constructor(private readonly service: ServiceProviderProfileService) {}

  /** POST /service-provider-profile — Create profile (authenticated) */
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create service provider profile' })
  @ResponseMessage('Service provider profile created successfully')
  create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateServiceProviderProfileDto,
  ) {
    return this.service.create(user.id, dto);
  }

  /** GET /service-provider-profile/me — Get own profile (authenticated) */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get own service provider profile' })
  findMe(@CurrentUser() user: { id: string }) {
    return this.service.findMe(user.id);
  }

  /** PATCH /service-provider-profile/me — Update own profile (authenticated) */
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update own service provider profile' })
  @ResponseMessage('Service provider profile updated successfully')
  updateMe(
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateServiceProviderProfileDto,
  ) {
    return this.service.updateMe(user.id, dto);
  }

  /** DELETE /service-provider-profile/me — Soft delete own profile (authenticated) */
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete own service provider profile' })
  @ResponseMessage('Service provider profile deleted successfully')
  softDeleteMe(@CurrentUser() user: { id: string }) {
    return this.service.softDeleteMe(user.id);
  }

  /** GET /service-provider-profile — List all profiles (public) */
  @Get()
  @ApiOperation({
    summary: 'List all approved service provider profiles (public)',
  })
  findAll(@Query() dto: ListServiceProviderProfilesDto) {
    return this.service.findAll(dto);
  }

  /** GET /service-provider-profile/:id — Get single profile (public) */
  @Get(':id')
  @ApiOperation({ summary: 'Get a service provider profile by ID (public)' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /** PATCH /service-provider-profile/:id/verify — [ADMIN] Verify provider */
  @Patch(':id/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Verify a service provider' })
  @ResponseMessage('Service provider verified successfully')
  verifyProvider(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.service.verifyProvider(id, user.id);
  }

  /** PATCH /service-provider-profile/:id/approval — [ADMIN] Update approval status */
  @Patch(':id/approval')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Update approval status' })
  @ResponseMessage('Approval status updated successfully')
  updateApprovalStatus(
    @Param('id') id: string,
    @Body('status') status: ApprovalStatus,
    @CurrentUser() user: { id: string },
  ) {
    return this.service.updateApprovalStatus(id, status, user.id);
  }
}
