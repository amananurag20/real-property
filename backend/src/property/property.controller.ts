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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PropertyService } from './property.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { Role, ApprovalStatus } from '../../generated/prisma/enums';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ListPropertiesDto } from './dto/list-properties.dto';
import { AddImagesDto } from './dto/add-images.dto';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new property listing' })
  @ResponseMessage('Property created successfully.')
  async create(
    @CurrentUser('id') userId: string,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    return this.propertyService.create(userId, createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all approved properties (public)' })
  @ResponseMessage('Properties retrieved successfully.')
  async findAll(@Query() listPropertiesDto: ListPropertiesDto) {
    return this.propertyService.findAll(listPropertiesDto);
  }

  @Get('my-listings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my property listings' })
  @ResponseMessage('My listings retrieved successfully.')
  async findMyListings(
    @CurrentUser('id') userId: string,
    @Query() listPropertiesDto: ListPropertiesDto,
  ) {
    return this.propertyService.findMyListings(userId, listPropertiesDto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get property by slug (public)' })
  @ResponseMessage('Property retrieved successfully.')
  async findBySlug(@Param('slug') slug: string) {
    return this.propertyService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a property' })
  @ResponseMessage('Property updated successfully.')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') propertyId: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(userId, propertyId, updatePropertyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a property (soft delete)' })
  @ResponseMessage('Property deleted successfully.')
  async softDelete(
    @CurrentUser('id') userId: string,
    @Param('id') propertyId: string,
  ) {
    return this.propertyService.softDelete(userId, propertyId);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add images to a property' })
  @ResponseMessage('Images added successfully.')
  async addImages(
    @CurrentUser('id') userId: string,
    @Param('id') propertyId: string,
    @Body() addImagesDto: AddImagesDto,
  ) {
    return this.propertyService.addImages(userId, propertyId, addImagesDto);
  }

  @Delete(':id/images/:imageId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an image from a property' })
  @ResponseMessage('Image deleted successfully.')
  async deleteImage(
    @CurrentUser('id') userId: string,
    @Param('id') propertyId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.propertyService.deleteImage(userId, propertyId, imageId);
  }

  @Patch(':id/images/:imageId/primary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set an image as primary' })
  @ResponseMessage('Primary image updated successfully.')
  async setPrimaryImage(
    @CurrentUser('id') userId: string,
    @Param('id') propertyId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.propertyService.setPrimaryImage(userId, propertyId, imageId);
  }

  @Post(':slug/view')
  @ApiOperation({ summary: 'Increment view count for a property' })
  @ResponseMessage('View count incremented.')
  async incrementViewCount(@Param('slug') slug: string) {
    return this.propertyService.incrementViewCount(slug);
  }

  @Patch(':id/approval')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update property approval status (Admin only)' })
  @ResponseMessage('Approval status updated successfully.')
  async updateApprovalStatus(
    @CurrentUser('id') adminId: string,
    @Param('id') propertyId: string,
    @Body('approvalStatus') approvalStatus: ApprovalStatus,
  ) {
    return this.propertyService.updateApprovalStatus(
      propertyId,
      approvalStatus,
      adminId,
    );
  }

  @Patch(':id/feature')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Feature a property (Admin only)' })
  @ResponseMessage('Property featured successfully.')
  async featureProperty(
    @CurrentUser('id') adminId: string,
    @Param('id') propertyId: string,
    @Body('featuredUntil') featuredUntil: Date,
  ) {
    return this.propertyService.featureProperty(
      propertyId,
      new Date(featuredUntil),
      adminId,
    );
  }
}
