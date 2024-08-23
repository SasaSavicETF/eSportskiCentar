import { Dvorana } from "./dvorana";

export interface Inventar
{
    idInventar: number;
    naziv: string;
    opis: string;
    dvorana: Dvorana;
}