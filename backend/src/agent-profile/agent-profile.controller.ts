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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AgentProfileService } from './agent-profile.service';
import { CreateAgentProfileDto } from './dto/create-agent-profile.dto';
import { UpdateAgentProfileDto } from './dto/update-agent-profile.dto';
import { ListAgentProfilesDto } from './dto/list-agent-profiles.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ApprovalStatus } from '../../generated/prisma/enums';
import { Role } from '../auth/guards/roles.guard';
import { IsEnum } from 'class-validator';

class UpdateApprovalStatusDto {
  @IsEnum(ApprovalStatus)
  approvalStatus!: ApprovalStatus;
}

@ApiTags('Agent Profile')
@Controller('agent-profile')
export class AgentProfileController {
  constructor(private readonly agentProfileService: AgentProfileService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create agent profile' })
  @ResponseMessage('Agent profile created successfully')
  create(
    @CurrentUser('id') userId: string,
    @Body() createAgentProfileDto: CreateAgentProfileDto,
  ) {
    return this.agentProfileService.create(userId, createAgentProfileDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my agent profile' })
  @ResponseMessage('Agent profile retrieved successfully')
  findMe(@CurrentUser('id') userId: string) {
    return this.agentProfileService.findMe(userId);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update my agent profile' })
  @ResponseMessage('Agent profile updated successfully')
  updateMe(
    @CurrentUser('id') userId: string,
    @Body() updateAgentProfileDto: UpdateAgentProfileDto,
  ) {
    return this.agentProfileService.updateMe(userId, updateAgentProfileDto);
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete my agent profile' })
  @ResponseMessage('Agent profile deleted successfully')
  softDeleteMe(@CurrentUser('id') userId: string) {
    return this.agentProfileService.softDeleteMe(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all agent profiles (public)' })
  @ResponseMessage('Agent profiles retrieved successfully')
  findAll(@Query() listAgentProfilesDto: ListAgentProfilesDto) {
    return this.agentProfileService.findAll(listAgentProfilesDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agent profile by ID (public)' })
  @ResponseMessage('Agent profile retrieved successfully')
  findOne(@Param('id') id: string) {
    return this.agentProfileService.findOne(id);
  }

  @Patch(':id/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify agent profile (admin only)' })
  @ResponseMessage('Agent profile verified successfully')
  verifyAgent(
    @Param('id') id: string,
    @CurrentUser('id') adminId: string,
  ) {
    return this.agentProfileService.verifyAgent(id, adminId);
  }

  @Patch(':id/approval')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update agent profile approval status (admin only)' })
  @ResponseMessage('Agent profile approval status updated successfully')
  updateApprovalStatus(
    @Param('id') id: string,
    @CurrentUser('id') adminId: string,
    @Body() body: UpdateApprovalStatusDto,
  ) {
    return this.agentProfileService.updateApprovalStatus(
      id,
      body.approvalStatus,
      adminId,
    );
  }
}
