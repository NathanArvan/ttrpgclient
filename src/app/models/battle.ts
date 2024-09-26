import { Character } from "./character";
import { User } from "./user";

export interface Battle {
    battleId: number;
    turn: number;
    characters: Character[] | null;
}

export interface UserJoinedDTO {
    battleId: number;
    user: User;
}