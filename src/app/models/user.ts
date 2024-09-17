import { Character } from "./character";

export interface User {
    userId: number;
    name: string;
    email: string;
    characters: Character[];
}