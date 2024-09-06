export class Administrator {
    idAdministrator!: number; 
    ime: string | null;
    prezime: string | null; 
    brojTelefona: string | null; 
    korisnickoIme: string | null; 
    lozinka: string | null; 
    email: string | null; 

    constructor(ime: string | null, prezime: string | null, brojTelefona: string | null, 
        korisnickoIme: string | null, lozinka: string | null, email: string | null) {
        this.ime = ime; 
        this.prezime = prezime; 
        this.brojTelefona = brojTelefona; 
        this.korisnickoIme = korisnickoIme; 
        this.lozinka = lozinka; 
        this.email = email; 
    }
}