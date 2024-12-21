export class PrihodiRashodiStatsDto {
    datum: string;
    prihodi: number;
    rashodi: number;

    constructor(datum: string, prihodi: number, rashodi: number) {
        this.datum = datum;
        this.prihodi = prihodi;
        this.rashodi = rashodi;
    }
}