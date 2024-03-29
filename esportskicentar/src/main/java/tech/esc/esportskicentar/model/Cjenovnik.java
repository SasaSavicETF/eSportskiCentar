package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Time;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cjenovnik {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_cjenovnik")
    private int idCjenovnik;
    @Basic
    @Column(name = "vrijeme_od")
    private Time vrijemeOd;
    @Basic
    @Column(name = "vrijeme_do")
    private Time vrijemeDo;
    @Basic
    @Column(name = "cijena")
    private BigDecimal cijena;
    /*
    @Basic
    @Column(name = "id_teren")
    private int idTeren;
    */

    @ManyToOne
    @JoinColumn(name = "id_teren")
    private Teren teren;
}
