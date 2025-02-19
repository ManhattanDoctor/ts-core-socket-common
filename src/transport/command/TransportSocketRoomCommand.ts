import { TransformUtil, TransportCommandAsync } from "@ts-core/common";
import { IsEnum, IsString } from 'class-validator';

export class TransportSocketRoomCommand extends TransportCommandAsync<ITransportSocketRoomDto, string> {
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

    constructor(request: ITransportSocketRoomDto) {
        super(TransportSocketRoomCommand.NAME, TransformUtil.toClass(TransportSocketRoomDto, request));
    }
}

export interface ITransportSocketRoomDto {
    name: string;
    action: TransportSocketRoomAction;
}
export enum TransportSocketRoomAction {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}

class TransportSocketRoomDto implements ITransportSocketRoomDto {
    @IsString()
    public name: string;

    @IsEnum(TransportSocketRoomAction)
    public action: TransportSocketRoomAction;
}