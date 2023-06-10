import { ITransportCommandOptions } from '@ts-core/common';
import { TransportSocketUserId } from './TransportSocketUserId';

export interface ITransportSocketCommandOptions extends ITransportCommandOptions {
    userId?: TransportSocketUserId;
    clientId?: string;
    isOnlyOne?: boolean;
}
