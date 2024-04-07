import { Token } from "./token";

export interface Map {
    mapId: number;
    campaignId: number;
    image: string;
    length: number;
    width: number;
    tokens: Token[];
}

export interface MapCreateDTO {
    campaignId: number | null;
    image: string | null;
    length: number;
    width: number;
}

export interface MapUpdateDTO {
    mapId: number;
    campaignId: number | null;
    image: string | null;
    length: number;
    width: number;
}