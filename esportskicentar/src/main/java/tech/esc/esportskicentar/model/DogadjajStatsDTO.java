package tech.esc.esportskicentar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DogadjajStatsDTO {

    @NotNull
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
    private Date datum;
    private String sport;

    public DogadjajStatsDTO(Dogadjaj dogadjaj) {
        this.datum = dogadjaj.getDnevniRaspored().getDatum();
        if(dogadjaj.getSport() != null)
            this.sport = dogadjaj.getSport().getNazivSporta();
    }
}
