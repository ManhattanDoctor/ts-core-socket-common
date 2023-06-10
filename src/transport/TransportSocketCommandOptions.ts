import { TransportCommandOptions } from '@ts-core/common';
import { IsOptional, IsBoolean, IsString } from 'class-validator';
import { ITransportSocketCommandOptions } from './ITransportSocketCommandOptions';
import { TransportSocketUserId } from './TransportSocketUserId';

export class TransportSocketCommandOptions extends TransportCommandOptions implements ITransportSocketCommandOptions {
    @IsOptional()
    @IsString()
    room?: string;

    @IsOptional()
    @IsString()
    clientId?: string;

    @IsOptional()
    userId?: TransportSocketUserId;

    @IsOptional()
    @IsBoolean()
    isOnlyOne?: boolean;
}
