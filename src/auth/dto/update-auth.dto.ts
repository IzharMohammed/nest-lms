import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './registerUser-auth.dto';

export class UpdateAuthDto extends PartialType(RegisterDto) { }
