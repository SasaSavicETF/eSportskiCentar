import { DezurniRadnik } from "./dezurniRadnik";
import { Upravnik } from "./upravnik";

export interface Zadatak {
    
    idZadatak: number;
    datumKreiranja: string;
    rokIzvrsenja: string;
    info: string;
    upravnik: Upravnik;
    dezurniRadnik: DezurniRadnik;
}