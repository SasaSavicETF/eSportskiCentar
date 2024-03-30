package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Svlacionica {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_svlacionica")
    private int idSvlacionica;
    /*
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
     */
    @Basic
    @Column(name = "broj_svlacionice")
    private Integer brojSvlacionice;
    @Basic
    @Column(name = "dostupna")
    private boolean dostupna;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_dvorana")
    private Dvorana dvorana;

}
