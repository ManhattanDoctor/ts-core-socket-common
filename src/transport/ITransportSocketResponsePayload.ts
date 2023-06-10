import { ExtendedError } from '@ts-core/common';
import { TransportSocketUserId } from './TransportSocketUserId';

export interface ITransportSocketResponsePayload<V = any> {
    id: string;
    userId?: TransportSocketUserId;
    clientId?: string;
    response?: V | ExtendedError;
}
