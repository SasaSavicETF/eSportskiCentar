import { Dvorana } from "./dvorana";

export class UserDTO {
    id!: number;
    ime: string | null;
    prezime: string | null;
    korisnickoIme: string | null;
    lozinka: string | null;
    brojTelefona: string | null;
    email: string | null;
    role : string | null;
    blokiran : boolean;
    dvorana : Dvorana | null;

    constructor(ime:string | null, prezime:string | null, korisnickoIme:string | null, lozinka:string | null, 
                brojTelefona:string | null, email : string | null, role : string | null) {
        this.ime = ime;
        this.prezime = prezime;
        this.korisnickoIme = korisnickoIme;
        this.lozinka = lozinka;
        this.brojTelefona = brojTelefona;
        this.email = email;
        this.role = role;
        this.blokiran = false;
        this.dvorana = null;
    }
}
