import { Token } from "./token";

export interface Map {
    mapId: number;
    campaignId: number;
    image: string;
    length: number;
    width: number;
    tokens: Token[];
}