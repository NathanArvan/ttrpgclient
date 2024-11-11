import { Character } from "./character";
import { Item } from "./item";
import { Map } from "./map";
import { User } from "./user";

export interface Battle {
    battleId: number;
    turn: number;
    characters: Character[] | null;
    items: Item[];
}

export interface CreateBattleDTO {
    map: Map;
    characters: Character[];
    items: Item[];
} 

export interface UserJoinedDTO {
    battleId: number;
    user: User;
}

export interface CharacterMessageDTO {
    battleId: number;
    character: Character;
}