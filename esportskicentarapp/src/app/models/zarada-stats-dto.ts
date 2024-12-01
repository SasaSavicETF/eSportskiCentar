export class ZaradaStatsDto {
    datum: string;
    zaradaOdRezervacija: number;
    zaradaOdSporta: number;

    constructor(datum: string, zaradaOdRezervacija: number, zaradaOdSporta: number) {
        this.datum = datum;
        this.zaradaOdRezervacija = zaradaOdRezervacija;
        this.zaradaOdSporta = zaradaOdSporta;
    }
}