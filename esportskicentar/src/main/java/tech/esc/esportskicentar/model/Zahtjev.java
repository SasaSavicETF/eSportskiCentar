package tech.esc.esportskicentar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Zahtjev {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_zahtjev")
    private int idZahtjev;
    @NotNull
    @Column(name = "vrijeme_pocetka")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "hh:mm dd.MM.yyyy.")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="hh:mm dd.MM.yyyy.")
    private Timestamp vrijemePocetka;
    @NotNull
    @Column(name = "vrijeme_kraja")
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "hh:mm dd.MM.yyyy.")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="hh:mm dd.MM.yyyy.")
    private Date vrijemeKraja;
    /*
    @Basic
    @Column(name = "vrijeme_pocetka")
    private Time vrijemePocetka;
    @Basic
    @Column(name = "vrijeme_kraja")
    private Time vrijemeKraja;
     */

    @Basic
    @Column(name = "poruka")
    private String poruka;
    @NotNull
    @Basic
    @Column(name = "odobren")
    private boolean odobren;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_klijent")
    private Klijent klijent;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_teren")
    private Teren teren;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_dnevni_raspored")
    private DnevniRaspored dnevniRaspored;

}
