import { NumberValueAccessor } from "@angular/forms";
import { DnevniRaspored } from "./dnevniRaspored";
import { Ekipa } from "./ekipa";
import { Teren } from "./teren";
import { Takmicenje } from "./takmicenje";
import { Klijent } from "./klijent";

export interface Dogadjaj {

    idDogadjaj: number;
    takmicenje: Takmicenje;
    vrijemeOd: string;
    vrijemeDo: string;
    infoDogadjaja: string;
    domacaEkipa: Ekipa;
    gostujucaEkipa: Ekipa;
    dnevniRaspored: DnevniRaspored;
    teren: Teren;
    cijena: number;
    klijent: Klijent;
}