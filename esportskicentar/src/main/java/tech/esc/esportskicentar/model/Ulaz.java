package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ulaz {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_ulaz")
    private int idUlaz;
    /*
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
     */
    @Basic
    @Column(name = "naziv_ulaza")
    private String nazivUlaza;
    @Basic
    @Column(name = "broj_ulaza")
    private Integer brojUlaza;
    @Basic
    @Column(name = "dostupan")
    private boolean dostupan;

    @ManyToOne
    @JoinColumn(name = "id_dvorana")
    private Dvorana dvorana;

}
