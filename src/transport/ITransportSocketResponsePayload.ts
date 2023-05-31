import { ExtendedError } from '@ts-core/common';

export interface ITransportSocketResponsePayload<V = any> {
    id: string;
    userId?: string;
    clientId?: string;
    response?: V | ExtendedError;
}
