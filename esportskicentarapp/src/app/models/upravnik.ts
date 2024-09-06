import { Dvorana } from "./dvorana";

export class Upravnik {
    idUpravnik!: number;
    ime: string;
    prezime: string;
    brojTelefona: string;
    korisnickoIme: string;
    lozinka: string;
    email: string;
    blokiran: boolean;
    dvorana: Dvorana;

    constructor(ime: string, prezime: string, brojTelefona: string, 
        korisnickoIme: string, lozinka: string, email: string,
        dvorana: Dvorana, blokiran: boolean) {
        this.ime = ime; 
        this.prezime = prezime; 
        this.brojTelefona = brojTelefona; 
        this.korisnickoIme = korisnickoIme; 
        this.lozinka = lozinka; 
        this.email = email; 
        this.dvorana = dvorana; 
        this.blokiran = blokiran; 
    }
}