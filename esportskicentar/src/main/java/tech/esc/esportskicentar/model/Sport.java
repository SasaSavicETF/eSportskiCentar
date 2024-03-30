package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sport {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_sport")
    private int idSport;
    @NotBlank
    @Basic
    @Column(name = "naziv_sporta")
    private String nazivSporta;
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

}
