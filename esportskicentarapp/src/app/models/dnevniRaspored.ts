import { Raspored } from "./raspored";

export interface DnevniRaspored
{
    idDnevniRaspored?: number;
    datum: string;
    raspored: Raspored;
}