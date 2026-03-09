import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PropertyRequestLinkService } from './property-request-link.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkStatusDto } from './dto/update-link-status.dto';
import { BuyerResponseDto } from './dto/buyer-response.dto';
import { ListLinksDto } from './dto/list-links.dto';

@ApiTags('Triangle Connection')
@Controller('triangle')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PropertyRequestLinkController {
  constructor(
    private readonly propertyRequestLinkService: PropertyRequestLinkService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a triangle link (agent matches property to request)',
  })
  @ResponseMessage('Triangle link created successfully')
  async createLink(
    @CurrentUser('id') userId: string,
    @Body() createLinkDto: CreateLinkDto,
  ) {
    return this.propertyRequestLinkService.createLink(userId, createLinkDto);
  }

  @Get('my-links')
  @ApiOperation({ summary: 'Get agent links (properties matched by agent)' })
  @ResponseMessage('Agent links retrieved successfully')
  async findAgentLinks(
    @CurrentUser('id') userId: string,
    @Query() listLinksDto: ListLinksDto,
  ) {
    return this.propertyRequestLinkService.findAgentLinks(userId, listLinksDto);
  }

  @Get('my-matches')
  @ApiOperation({
    summary: 'Get buyer matches (properties matched to buyer requests)',
  })
  @ResponseMessage('Buyer matches retrieved successfully')
  async findBuyerMatches(
    @CurrentUser('id') userId: string,
    @Query() listLinksDto: ListLinksDto,
  ) {
    return this.propertyRequestLinkService.findBuyerMatches(
      userId,
      listLinksDto,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single triangle link by ID' })
  @ResponseMessage('Triangle link retrieved successfully')
  async findOne(
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
    @Param('id') id: string,
  ) {
    return this.propertyRequestLinkService.findOne(userId, id, role as any);
  }

  @Patch(':id/agent-note')
  @ApiOperation({ summary: 'Update agent note on a triangle link' })
  @ResponseMessage('Agent note updated successfully')
  async updateAgentNote(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() body: { agentNote: string },
  ) {
    return this.propertyRequestLinkService.updateAgentNote(
      userId,
      id,
      body.agentNote,
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update triangle link status (agent)' })
  @ResponseMessage('Triangle link status updated successfully')
  async updateStatus(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() updateLinkStatusDto: UpdateLinkStatusDto,
  ) {
    return this.propertyRequestLinkService.updateStatus(
      userId,
      id,
      updateLinkStatusDto.status,
    );
  }

  @Patch(':id/respond')
  @ApiOperation({ summary: 'Buyer responds to a triangle match' })
  @ResponseMessage('Buyer response submitted successfully')
  async buyerRespond(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() buyerResponseDto: BuyerResponseDto,
  ) {
    return this.propertyRequestLinkService.buyerRespond(
      userId,
      id,
      buyerResponseDto,
    );
  }
}
