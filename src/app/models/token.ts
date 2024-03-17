import { File } from "./file";

export interface Token {
    tokenId: number;
    mapId: number;
    CharacterId: number;
    xPosition: number;
    yPosition: number;
    image: File | null;
}