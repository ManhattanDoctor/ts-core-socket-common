import { TransportSocketUserId } from "./TransportSocketUserId";

export interface ITransportSocketEventOptions {
    room?: string | Array<string>;
    userId?: TransportSocketUserId;
    clientId?: string;
    isOnlyOne?: boolean;
}