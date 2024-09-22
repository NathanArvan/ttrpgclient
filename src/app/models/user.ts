import { Character } from "./character";

export interface User {
    userId: number | null;
    name: string;
    email: string;
    characters: Character[] | null;
}