import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard, Role } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** GET /users/me — authenticated user's own profile */
  @Get('me')
  @ApiOperation({ summary: 'Get own profile' })
  getMe(@CurrentUser() user: { id: string; role: string }) {
    return this.usersService.findMe(user.id, user.role);
  }

  /** PATCH /users/me — update own profile */
  @Patch('me')
  @ApiOperation({ summary: 'Update own profile' })
  updateMe(@CurrentUser() user: { id: string }, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateMe(user.id, dto);
  }

  /** GET /users — [ADMIN] list all users */
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '[ADMIN] List all users' })
  findAll() {
    return this.usersService.findAll();
  }

  /** PATCH /users/:id/suspend — [ADMIN] suspend a user */
  @Patch(':id/suspend')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '[ADMIN] Suspend a user' })
  suspend(@Param('id') id: string) {
    return this.usersService.setSuspended(id, true);
  }

  /** PATCH /users/:id/unsuspend — [ADMIN] unsuspend a user */
  @Patch(':id/unsuspend')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '[ADMIN] Unsuspend a user' })
  unsuspend(@Param('id') id: string) {
    return this.usersService.setSuspended(id, false);
  }
}
