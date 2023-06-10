import { TransportSocketUserId } from "./TransportSocketUserId";

export interface ITransportSocketEventOptions {
    room?: string;
    clientId?: string;

    userId?: TransportSocketUserId;
    isOnlyOne?: boolean;
}