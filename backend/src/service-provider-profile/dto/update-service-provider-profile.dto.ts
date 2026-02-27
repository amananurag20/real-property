import { PartialType } from '@nestjs/swagger';
import { CreateServiceProviderProfileDto } from './create-service-provider-profile.dto';

export class UpdateServiceProviderProfileDto extends PartialType(CreateServiceProviderProfileDto) {}
