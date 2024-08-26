package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Time;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dogadjaj {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_dogadjaj")
    private int idDogadjaj;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_takmicenje")
    private Takmicenje takmicenje;
    /*
    @Basic
    @Column(name = "id_domace_ekipe")
    private int idDomaceEkipe;
    @Column(name = "id_gostujuce_ekipe")
    @Basic
    private int idGostujuceEkipe;
     */
    @NotNull
    @Basic
    @Column(name = "vrijeme_od")
    private Time vrijemeOd;
    @NotNull
    @Basic
    @Column(name = "vrijeme_do")
    private Time vrijemeDo;
    @Basic
    @Column(name = "info_dogadjaja")
    private String infoDogadjaja;
    /*
    @Basic
    @Column(name = "id_dnevni_raspored")
    private int idDnevniRaspored;
    @Basic
    @Column(name = "id_teren")
    private int idTeren;
     */
    @ManyToOne
    @JoinColumn(name = "id_domace_ekipe")
    private Ekipa domacaEkipa;
    @ManyToOne
    @JoinColumn(name = "id_gostujuce_ekipe")
    private Ekipa gostujucaEkipa;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_dnevni_raspored")
    private DnevniRaspored dnevniRaspored;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_teren")
    private Teren teren;
    @NotNull
    @Positive
    @Basic
    @Column(name = "cijena")
    private BigDecimal cijena;
    @ManyToOne
    @JoinColumn(name = "id_klijent")
    private Klijent klijent;
}
