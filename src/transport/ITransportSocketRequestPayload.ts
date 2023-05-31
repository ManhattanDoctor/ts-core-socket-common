import { ITransportSocketCommandOptions } from './ITransportSocketCommandOptions';

export interface ITransportSocketRequestPayload<U = any> {
    id: string;
    name: string;
    request?: U;
    options?: ITransportSocketCommandOptions;
    isNeedReply?: boolean;
}
