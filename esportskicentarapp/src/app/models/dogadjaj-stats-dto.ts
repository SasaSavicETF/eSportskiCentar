export class DogadjajStatsDto {
    datum: string;
    sport: string | null;

    constructor(datum: string, sport?: string) {
        this.datum = datum;
        this.sport = sport || null;
    }
}