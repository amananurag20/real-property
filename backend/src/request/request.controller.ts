import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ListRequestsDto } from './dto/list-requests.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ApprovalStatus } from '../../generated/prisma/enums';
import { Role } from '../auth/guards/roles.guard';

interface UserPayload {
  userId: string;
  email: string;
  role: Role;
}

@ApiTags('Requests')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new property request' })
  @ApiResponse({ status: 201, description: 'Request created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ResponseMessage('Request created successfully')
  async create(
    @CurrentUser() user: UserPayload,
    @Body() createRequestDto: CreateRequestDto,
  ) {
    return this.requestService.create(user.userId, createRequestDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my property requests (paginated)' })
  @ApiResponse({ status: 200, description: 'List of user requests' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ResponseMessage('My requests fetched successfully')
  async findMyRequests(
    @CurrentUser() user: UserPayload,
    @Query() dto: ListRequestsDto,
  ) {
    return this.requestService.findMyRequests(user.userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all public property requests (paginated, filtered)' })
  @ApiResponse({ status: 200, description: 'List of public requests' })
  @ResponseMessage('Requests fetched successfully')
  async findAll(@Query() dto: ListRequestsDto) {
    return this.requestService.findAll(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single request by ID' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Request details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Request not found' })
  @ResponseMessage('Request fetched successfully')
  async findOne(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return this.requestService.findOne(id, user.userId, user.role);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a property request (owner only)' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Request updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Request not found' })
  @ResponseMessage('Request updated successfully')
  async update(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return this.requestService.update(user.userId, id, updateRequestDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a property request (owner only)' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Request deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Request not found' })
  @ResponseMessage('Request deleted successfully')
  async remove(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    return this.requestService.softDelete(user.userId, id);
  }

  @Patch(':id/approval')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update request approval status (admin only)' })
  @ApiParam({ name: 'id', description: 'Request ID' })
  @ApiResponse({ status: 200, description: 'Approval status updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  @ApiResponse({ status: 404, description: 'Request not found' })
  @ResponseMessage('Approval status updated successfully')
  async updateApprovalStatus(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Body('status') status: ApprovalStatus,
  ) {
    return this.requestService.updateApprovalStatus(id, status, user.userId);
  }
}
