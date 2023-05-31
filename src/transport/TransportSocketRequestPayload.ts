import { IsBoolean, IsOptional, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import * as _ from 'lodash';
import { ITransportCommand, TransformUtil, Transport, TransportInvalidDataError, ValidateUtil } from '@ts-core/common';
import { ITransportSocketRequestPayload } from './ITransportSocketRequestPayload';
import { TransportSocketCommandOptions } from './TransportSocketCommandOptions';

export class TransportSocketRequestPayload<U = any> implements ITransportSocketRequestPayload<U> {
    // --------------------------------------------------------------------------
    //
    //  Static Methods
    //
    // --------------------------------------------------------------------------

    public static parse<U = any>(data: ITransportSocketRequestPayload): ITransportSocketRequestPayload<U> {
        let item: TransportSocketRequestPayload<U> = null;
        try {
            item = TransformUtil.toClass(TransportSocketRequestPayload, data);
        } catch (error) {
            throw new TransportInvalidDataError(`Invalid payload: ${error.message}`, data);
        }
        ValidateUtil.validate(item);
        return item;
    }

    public static setDefaultOptions<U>(item: ITransportSocketRequestPayload<U>): void {
        if (_.isNil(item)) {
            return;
        }
        if (_.isNil(item.options)) {
            item.options = {};
        }
        Transport.setDefaultOptions(item.options);
    }

    public static clearDefaultOptions<U>(item: ITransportSocketRequestPayload<U>): void {
        if (_.isNil(item)) {
            return;
        }
        Transport.clearDefaultOptions(item.options);
    }

    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------

    @IsString()
    public id: string;

    @IsString()
    public name: string;

    @IsOptional()
    public request?: U;

    @Type(() => TransportSocketCommandOptions)
    @IsOptional()
    @ValidateNested()
    public options?: TransportSocketCommandOptions;

    @IsOptional()
    @IsBoolean()
    public isNeedReply?: boolean;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(command?: ITransportCommand<U>, options?: TransportSocketCommandOptions) {
        if (!_.isNil(command)) {
            this.id = command.id;
            this.name = command.name;
            this.request = command.request;
        }
        if (!_.isNil(options)) {
            this.options = TransformUtil.toClass(TransportSocketCommandOptions, options);
            TransportSocketRequestPayload.clearDefaultOptions(this);
        }

        if (_.isEmpty(this.request)) {
            this.request = null;
            delete this.request;
        }
        if (_.isEmpty(this.options)) {
            this.options = null;
            delete this.options;
        }
    }
}