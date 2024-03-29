package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Takmicenje {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_takmicenje")
    private int idTakmicenje;
    @Basic
    @Column(name = "vrsta_takmicenja")
    private String vrstaTakmicenja;

}
