package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jdk.jfr.DataAmount;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dvorana {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_dvorana")
    private int idDvorana;
    @NotBlank
    @Basic
    @Column(name = "naziv_dvorane")
    private String nazivDvorane;
    /*@Basic
    @Column(name = "id_grad")
    private int idGrad;*/
    @Basic
    @Column(name = "kapacitet")
    private Integer kapacitet;
    /*
    @NotNull
    @Positive
    @Basic
    @Column(name = "duzina")
    private BigDecimal duzina;
    @NotNull
    @Positive
    @Basic
    @Column(name = "sirina")
    private BigDecimal sirina;
    */

    @Basic
    @Column(name = "info")
    private String info;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_grad")
    private Grad grad;
}
