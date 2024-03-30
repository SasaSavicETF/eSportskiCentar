package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank
    @Basic
    @Column(name = "naziv_ulaza")
    private String nazivUlaza;
    @Basic
    @Column(name = "broj_ulaza")
    private Integer brojUlaza;
    @Basic
    @Column(name = "dostupan")
    private boolean dostupan;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_dvorana")
    private Dvorana dvorana;

}
