import { Position } from "./position";
import { Token } from "./token";

export interface Map {
    mapId: number;
    campaignId: number;
    image: string;
    length: number;
    width: number;
    obstacles: Obstacle[];
}

export interface Obstacle {
    position: Position;
    image: string;
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

export interface MapCell {
    image: string | null;
    borderClass: string | null;
  }