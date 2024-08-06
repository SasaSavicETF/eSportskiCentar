import { Dvorana } from "./dvorana";

export interface Ulaz
{
    idUlaz: number;
    nazivUlaza: string;
    brojUlaza: number;
    dostupan: boolean;
    dvorana: Dvorana;
}