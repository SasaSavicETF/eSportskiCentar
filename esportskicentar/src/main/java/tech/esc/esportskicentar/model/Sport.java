package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
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
    @Basic
    @Column(name = "naziv_sporta")
    private String nazivSporta;
    @Basic
    @Column(name = "duzina")
    private BigDecimal duzina;
    @Basic
    @Column(name = "sirina")
    private BigDecimal sirina;

}
