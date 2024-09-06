import { Dvorana } from "./dvorana";

export class DezurniRadnik {
    idDezurniRadnik!: number;
    ime: string;
    prezime: string;
    brojTelefona: string;
    korisnickoIme: string;
    lozinka: string;
    email: string;
    blokiran: boolean;

    constructor(ime: string, prezime: string, brojTelefona: string, 
        korisnickoIme: string, lozinka: string, email: string,
        blokiran: boolean) {
        this.ime = ime; 
        this.prezime = prezime; 
        this.brojTelefona = brojTelefona; 
        this.korisnickoIme = korisnickoIme; 
        this.lozinka = lozinka; 
        this.email = email; 
        this.blokiran = blokiran; 
    }
}