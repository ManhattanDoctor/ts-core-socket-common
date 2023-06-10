import { TransportSocketUserId } from "./TransportSocketUserId";

export interface ITransportSocketEventOptions {
    userId?: TransportSocketUserId;
    clientId?: string;
    isOnlyOne?: boolean;
}