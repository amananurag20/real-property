import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContactInquiryService } from './contact-inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { ListInquiriesDto } from './dto/list-inquiries.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { Role } from '../auth/guards/roles.guard';

@ApiTags('Contact Inquiries')
@Controller('contact-inquiry')
export class ContactInquiryController {
  constructor(private readonly contactInquiryService: ContactInquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a contact inquiry (Public)' })
  @ResponseMessage('Contact inquiry submitted successfully')
  create(@Body() dto: CreateInquiryDto) {
    return this.contactInquiryService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all contact inquiries (Admin only)' })
  findAll(@Query() dto: ListInquiriesDto) {
    return this.contactInquiryService.findAll(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a single contact inquiry (Admin only)' })
  findOne(@Param('id') id: string) {
    return this.contactInquiryService.findOne(id);
  }

  @Patch(':id/resolve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark inquiry as resolved (Admin only)' })
  @ResponseMessage('Contact inquiry marked as resolved')
  markResolved(
    @CurrentUser('id') adminId: string,
    @Param('id') id: string,
    @Body('notes') notes?: string,
  ) {
    return this.contactInquiryService.markResolved(id, adminId, notes);
  }
}
