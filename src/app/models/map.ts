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

export interface MapCell {
    image: string | null;
    borderClass: string | null;
  }