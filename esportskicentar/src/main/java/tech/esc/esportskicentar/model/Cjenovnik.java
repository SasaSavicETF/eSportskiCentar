package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import tech.esc.esportskicentar.annotation.CompareTime;

import java.math.BigDecimal;
import java.sql.Time;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompareTime(before = "vrijemeOd", after = "vrijemeDo", message = "Vrijeme od mora biti prije vremena do!")
public class Cjenovnik {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_cjenovnik")
    private int idCjenovnik;
    @NotNull
    @Basic
    @Column(name = "vrijeme_od")
    private Time vrijemeOd;
    @NotNull
    @Basic
    @Column(name = "vrijeme_do")
    private Time vrijemeDo;
    @NotNull
    @PositiveOrZero
    @Basic
    @Column(name = "cijena")
    private BigDecimal cijena;
    /*
    @Basic
    @Column(name = "id_teren")
    private int idTeren;
    */
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_teren")
    private Teren teren;
}
