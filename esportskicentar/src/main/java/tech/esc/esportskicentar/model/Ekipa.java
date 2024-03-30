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
public class Ekipa {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_ekipa")
    private int idEkipa;
    @NotBlank
    @Basic
    @Column(name = "naziv_ekipe")
    private String nazivEkipe;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_sport")
    private Sport sport;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_takmicenje")
    private Takmicenje takmicenje;

}
