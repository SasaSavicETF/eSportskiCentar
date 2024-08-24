import { Raspored } from "./raspored";

export interface DnevniRaspored
{
    idDnevniRaspored?: number;
    datum: Date;
    raspored: Raspored;
}