package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

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
    @Basic
    @Column(name = "id_takmicenje")
    private int idTakmicenje;
    /*
    @Basic
    @Column(name = "id_domace_ekipe")
    private int idDomaceEkipe;
    @Basic
    @Column(name = "id_gostujuce_ekipe")
    private int idGostujuceEkipe;
     */
    @Basic
    @Column(name = "vrijeme")
    private Time vrijeme;
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

    @ManyToOne
    @JoinColumn(name = "id_dnevni_raspored")
    private DnevniRaspored dnevniRaspored;

    @ManyToOne
    @JoinColumn(name = "id_teren")
    private Teren teren;
}
