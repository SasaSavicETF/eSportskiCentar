package tech.esc.esportskicentar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ZaradaStatsDTO {
    @NotNull
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
    private LocalDate datum;
    private BigDecimal zaradaOdRezervacija;
    private BigDecimal zaradaOdSporta;

    public ZaradaStatsDTO(Object datumString, BigDecimal zaradaOdRezervacija, BigDecimal zaradaOdSporta) {
        this.zaradaOdRezervacija = zaradaOdRezervacija;
        this.zaradaOdSporta = zaradaOdSporta;
        if(datumString instanceof String)
        convertDatumStringToDate((String) datumString);
    }

    public void convertDatumStringToDate(String datumString) {
        DateTimeFormatter formatter;
        formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.datum = LocalDate.parse(datumString, formatter);
    }
}
