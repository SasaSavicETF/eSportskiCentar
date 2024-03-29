package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ekipa {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_ekipa")
    private int idEkipa;
    @Basic
    @Column(name = "naziv_ekipe")
    private String nazivEkipe;

    @ManyToOne
    @JoinColumn(name = "id_sport")
    private Sport sport;
    @ManyToOne
    @JoinColumn(name = "id_takmicenje")
    private Takmicenje takmicenje;

}
