import { Sport } from "./sport";
import { Takmicenje } from "./takmicenje";

export interface Ekipa
{
    idEkipa: number;
    nazivEkipe: string;
    sport: Sport;
    takmicenje: Takmicenje;
}