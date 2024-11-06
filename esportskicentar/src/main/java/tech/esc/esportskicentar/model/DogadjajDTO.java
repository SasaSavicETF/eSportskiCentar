package tech.esc.esportskicentar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DogadjajDTO {
    @NotBlank
    String infoDogadjaja;
    @NotBlank
    String vrstaTakmicenja;
    @NotBlank
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
    LocalDate datum;
    @NotBlank
    Time vrijemeOd;
    @NotBlank
    Time vrijemeDo;
    @NotBlank
    boolean odobren;
    String nazivSporta;
    String domacaEkipa;
    String gostujucaEkipa;

    public DogadjajDTO (Dogadjaj event){
        this.infoDogadjaja = event.getInfoDogadjaja();
        this.datum = event.getDnevniRaspored().getDatum().toLocalDate();
        this.vrijemeOd = event.getVrijemeOd();
        this.vrijemeDo = event.getVrijemeDo();
        this.odobren = event.isOdobren();
        if (event.getTakmicenje() != null)
            this.vrstaTakmicenja = event.getTakmicenje().getVrstaTakmicenja();
        if (event.getSport() != null)
            this.nazivSporta = event.getSport().getNazivSporta();
        if (event.getDomacaEkipa() != null)
            this.domacaEkipa = event.getDomacaEkipa().getNazivEkipe();
        if (event.getGostujucaEkipa() != null)
            this.gostujucaEkipa = event.getGostujucaEkipa().getNazivEkipe();
    }

}
