import { TransformUtil, TransportCommand } from "@ts-core/common";
import { IsDefined, IsEnum } from 'class-validator';

export class TransportSocketRoomCommand<T = string> extends TransportCommand<ITransportSocketRoomDto<T>>{
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'TransportSocketRoomCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: ITransportSocketRoomDto<T>) {
        super(TransportSocketRoomCommand.NAME, TransformUtil.toClass(TransportSocketRoomDto<T>, request));
    }
}

export interface ITransportSocketRoomDto<T = string> {
    name: T;
    action: TransportSocketRoomAction;
}
export enum TransportSocketRoomAction {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}

class TransportSocketRoomDto<T> implements ITransportSocketRoomDto<T> {
    @IsDefined()
    name: T;

    @IsEnum(TransportSocketRoomAction)
    action: TransportSocketRoomAction;
}