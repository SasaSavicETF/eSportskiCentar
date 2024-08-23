export class Klijent {

    idKlijent!: number;
    ime: string | null;
    prezime: string | null;
    korisnickoIme: string | null;
    lozinka: string | null;
    brojTelefona: string | null;
    email: string | null;
    role : string | null;
    blokiran : boolean;

    constructor(name:string | null, lastname:string | null, username:string | null, password:string | null, 
                phoneNumber:string | null, email : string | null, role : string | null) {
        this.ime = name;
        this.prezime = lastname;
        this.korisnickoIme = username;
        this.lozinka = password;
        this.brojTelefona = phoneNumber;
        this.email = email;
        this.role = role;
        this.blokiran = false;
    }


}
