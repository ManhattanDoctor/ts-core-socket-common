import { ITransportCommandOptions } from '@ts-core/common';

export interface ITransportSocketCommandOptions extends ITransportCommandOptions {
    userId?: string;
    clientId?: string;
    isOnlyOne?: boolean;
}
