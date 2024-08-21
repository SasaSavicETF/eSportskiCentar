import { Dvorana } from "./dvorana";
import { TipTerena } from "./tipTerena";

export interface Teren
{
    idTeren: number;
    nazivTerena: string;
    info: string;
    slika: string;
    tipTerena: TipTerena;
    dvorana: Dvorana;
    duzina: number;
    sirina: number;
    dostupan: boolean;
}