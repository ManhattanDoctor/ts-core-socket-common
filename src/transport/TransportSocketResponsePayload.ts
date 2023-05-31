
import { TransformUtil, ValidateUtil, ExtendedError, TransportInvalidDataError, ITransportCommandAsync } from '@ts-core/common';
import { IsOptional, IsString } from 'class-validator';
import { ITransportSocketResponsePayload } from './ITransportSocketResponsePayload';
import * as _ from 'lodash';

export class TransportSocketResponsePayload<U = any, V = any> implements ITransportSocketResponsePayload<V> {
    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static parse<V>(data: any): TransportSocketResponsePayload<V> {
        if (_.isNil(data)) {
            throw new TransportInvalidDataError(`Invalid payload: nil response message`, data);
        }

        let item: TransportSocketResponsePayload<V> = null;
        try {
            item = TransformUtil.toClass(TransportSocketResponsePayload, data);
        } catch (error) {
            throw new TransportInvalidDataError(`Invalid payload: ${error.message}`, data);
        }
        ValidateUtil.validate(item);
        return item;
    }

    public static fromError(id: string, error: ExtendedError): ITransportSocketResponsePayload {
        let payload = new TransportSocketResponsePayload();
        payload.id = id;
        payload.response = error;
        return payload;
    }

    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @IsString()
    public id: string;

    @IsOptional()
    @IsString()
    public userId?: string;

    @IsOptional()
    @IsString()
    public clientId?: string;

    @IsOptional()
    public response?: V | ExtendedError;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(command?: ITransportCommandAsync<U, V>) {
        if (_.isNil(command)) {
            return;
        }
        this.id = command.id;
        this.response = _.isNil(command.error) ? command.data : command.error;
    }
}
