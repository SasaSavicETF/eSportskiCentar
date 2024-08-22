import { DezurniRadnik } from "./dezurniRadnik";
import { Upravnik } from "./upravnik";

export interface Zadatak {
    
    idZadatak: number;
    datumKreiranja: Date;
    rokIzvrsenja: Date;
    info: string;
    upravnik: Upravnik;
    dezurniRadnik: DezurniRadnik;
}