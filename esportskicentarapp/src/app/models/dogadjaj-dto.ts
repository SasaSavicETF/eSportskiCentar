export class DogadjajDTO {

    infoDogadjaja: string;
    datum: string;
    vrijemeOd: string;
    vrijemeDo: string;
    odobren: boolean;
    vrstaTakmicenja: string;
    nazivSporta: string | null;
    domacaEkipa: string | null;
    gostujucaEkipa: string | null;
    rowspan: number;
    display: boolean = false;

    constructor(info: string, datum: string, vrijemeOd: string, vrijemeDo: string, odobren: boolean,
                vrstaTakmicenja: string, nazivSporta: string | null, domacaEkipa: string | null, gostujucaEkipa: string | null){
        this.infoDogadjaja = info;
        this.datum = datum;
        this.vrijemeOd = vrijemeOd;
        this.vrijemeDo = vrijemeDo;
        this.odobren = odobren;
        this.vrstaTakmicenja = vrstaTakmicenja;
        this.nazivSporta = nazivSporta;
        this.domacaEkipa = domacaEkipa;
        this.gostujucaEkipa = gostujucaEkipa;
        this.rowspan = 0;
    }
}
