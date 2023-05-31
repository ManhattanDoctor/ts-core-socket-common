import { TransportCommandOptions } from '@ts-core/common';
import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { ITransportSocketCommandOptions } from './ITransportSocketCommandOptions';

export class TransportSocketCommandOptions extends TransportCommandOptions implements ITransportSocketCommandOptions {
    @IsOptional()
    @IsString()
    userId?: string;

    @IsOptional()
    @IsBoolean()
    isOnlyOne?: boolean;
}
