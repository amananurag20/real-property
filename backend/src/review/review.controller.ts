import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ListReviewsDto } from './dto/list-reviews.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { Role } from '../auth/guards/roles.guard';

@ApiTags('Reviews')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new review' })
  @ResponseMessage('Review created successfully')
  create(@CurrentUser('id') userId: string, @Body() dto: CreateReviewDto) {
    return this.reviewService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all approved reviews' })
  findAll(@Query() dto: ListReviewsDto) {
    return this.reviewService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single review' })
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update your own review' })
  @ResponseMessage('Review updated successfully')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.reviewService.update(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete your own review' })
  @ResponseMessage('Review deleted successfully')
  softDelete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.reviewService.softDelete(userId, id);
  }

  @Patch(':id/approve')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Approve a review (Admin only)' })
  @ResponseMessage('Review approved successfully')
  approveReview(@CurrentUser('id') adminId: string, @Param('id') id: string) {
    return this.reviewService.approveReview(id, adminId);
  }

  @Patch(':id/reject')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Reject a review (Admin only)' })
  @ResponseMessage('Review rejected successfully')
  rejectReview(@CurrentUser('id') adminId: string, @Param('id') id: string) {
    return this.reviewService.rejectReview(id, adminId);
  }
}
