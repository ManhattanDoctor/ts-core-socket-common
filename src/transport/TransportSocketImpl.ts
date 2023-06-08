import * as _ from 'lodash';
import { ClassType, DateUtil, ExtendedError, ITransportCommand, ITransportCommandAsync, ITransportCommandRequest, ITransportEvent, ITransportSettings, ObjectUtil, TransformUtil, TransportCommand, TransportCommandAsync, TransportEvent, TransportImpl, TransportLogType, ValidateUtil } from '@ts-core/common';
import { ITransportSocketEventOptions } from './ITransportSocketEventOptions';
import { TransportSocketRequestPayload } from './TransportSocketRequestPayload';
import { ITransportSocketCommandOptions } from './ITransportSocketCommandOptions';
import { ITransportSocketRequestPayload } from './ITransportSocketRequestPayload';
import { TransportSocketResponsePayload } from './TransportSocketResponsePayload';
import { ITransportSocketResponsePayload } from './ITransportSocketResponsePayload';

export abstract class TransportSocketImpl extends TransportImpl<ITransportSettings, ITransportSocketCommandOptions, ITransportSocketCommandRequest, ITransportSocketEventOptions> {
    // --------------------------------------------------------------------------
    //
    //  Request Methods
    //
    // --------------------------------------------------------------------------

    protected createRequestPayload<U>(command: ITransportCommand<U>, options: ITransportSocketCommandOptions, isNeedReply: boolean): ITransportSocketRequestPayload<U> {
        let item = new TransportSocketRequestPayload<U>(command, options);
        item.isNeedReply = isNeedReply;
        ValidateUtil.validate(item);
        return item;
    }

    protected requestResponseReceived = (item: any): void => {
        if (_.isNil(item) || _.isNil(item.id)) {
            this.warn(`Received nil or invalid response message`);
            return;
        }

        let promise = this.promises.get(item.id);
        if (_.isNil(promise)) {
            this.warn(`Unable to find command promise: probably command was already completed`);
            return;
        }
        let payload: TransportSocketResponsePayload = null;
        try {
            payload = TransportSocketResponsePayload.parse(item);
        } catch (error) {
            payload = TransportSocketResponsePayload.fromError(item.id, ExtendedError.create(error));
        }
        finally {
            this.commandRequestResponseReceived(promise, payload.response);
        }
    }

    // --------------------------------------------------------------------------
    //
    //  Response Methods
    //
    // --------------------------------------------------------------------------

    protected createResponsePayload<U, V>(command: ITransportCommandAsync<U, V>, request: ITransportSocketCommandRequest): ITransportSocketResponsePayload<V> {
        let item = new TransportSocketResponsePayload(command);
        ValidateUtil.validate(item);
        return item;
    }

    protected responseRequestReceived = <U>(item: any): void => {
        if (_.isNil(item) || _.isNil(item.id)) {
            this.warn(`Received nil or invalid request`);
            return;
        }

        let command: ITransportCommand<U> = null;
        let payload: ITransportSocketRequestPayload<U> = null;
        try {
            payload = TransportSocketRequestPayload.parse(item);
            command = this.createCommand(payload);
        } catch (error) {
            this.warn(`Received invalid request: ${error.message}`);
            return;
        }

        this.logCommand(command, TransportLogType.REQUEST_RECEIVED);
        let request = this.checkRequestStorage(command, payload);
        this.commandResponseRequestDispatch(command, payload.options, payload.isNeedReply);
    }

    protected createCommand<U>(item: ITransportSocketRequestPayload<U>): ITransportCommand<U> {
        let CommandType: ClassType<ITransportCommand<U>> = item.isNeedReply ? TransportCommandAsync : TransportCommand;
        return new CommandType(item.name, item.request, item.id);
    }

    protected checkRequestStorage<U>(command: ITransportCommand<U>, payload: ITransportSocketRequestPayload<U>): ITransportSocketCommandRequest {
        let item = this.requests.get(command.id);
        if (!_.isNil(item)) {
            item.waited++;
            return item;
        }

        item = { waited: 0, isNeedReply: payload.isNeedReply, expired: null };
        item = ObjectUtil.copyProperties(payload.options, item);
        if (item.isNeedReply) {
            item.expired = DateUtil.getDate(Date.now() + this.getCommandTimeoutDelay(command, payload.options));
        }
        this.requests.set(command.id, item);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Event Methods
    //
    // --------------------------------------------------------------------------

    protected requestEventReceived = <U>(item: any): void => {
        if (_.isNil(item) || _.isNil(item.uid)) {
            this.warn(`Received nil or invalid event`);
            return;
        }

        let event: ITransportEvent<U> = null;
        try {
            event = this.createEvent(item)
        } catch (error) {
            this.warn(`Received invalid event: ${error.message}`);
            return;
        }
        this.eventRequestReceived(event);
    }

    protected createEvent<U>(item: any): ITransportEvent<U> {
        return TransformUtil.toClass(TransportEvent, item);
    }
}

export interface ITransportSocketCommandRequest extends ITransportCommandRequest {
    userId?: string;
    clientId?: string;
}
