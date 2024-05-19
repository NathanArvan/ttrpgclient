import { Token } from "./token";

export interface Character {
    characterId: number;
    name: string;
    tokenId: number;
    token: Token | null;
    carryingCapacity: number;
    equippedItems: any[];
    storedItems: any[];
    hitPoints: number;
    manaPoints: number;
    staminaPoints: number;
    poise: number;
    movement: number;
    martialVision: number;
    arcaneVision: number;
    actions: number;
    accuracy:number;
    evasion: number;
}