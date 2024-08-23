import { NumberValueAccessor } from "@angular/forms";
import { DnevniRaspored } from "./dnevniRaspored";
import { Ekipa } from "./ekipa";
import { Teren } from "./teren";

export interface Dogadjaj {

    idDogadjaj: number;
    idTakmicenje: number;
    vrijemeOd: string;
    vrijemDo: string;
    infoDogadjaja: string;
    domacaEkipa: Ekipa;
    gostujucaEkipa: Ekipa;
    dnevniRaspored: DnevniRaspored;
    teren: Teren;
    cijena: number;
}