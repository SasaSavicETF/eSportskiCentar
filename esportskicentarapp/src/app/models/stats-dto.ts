export class StatsDto {
    datum: string;
    zaradaOdSporta: number;

    constructor(datum: string, zaradaOdSporta: number) {
        this.datum = datum;
        this.zaradaOdSporta = zaradaOdSporta;
    }
}