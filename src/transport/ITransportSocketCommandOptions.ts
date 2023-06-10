import { ITransportCommandOptions } from '@ts-core/common';
import { TransportSocketUserId } from './TransportSocketUserId';

export interface ITransportSocketCommandOptions extends ITransportCommandOptions {
    room?: string;
    clientId?: string;

    userId?: TransportSocketUserId;
    isOnlyOne?: boolean;
}
