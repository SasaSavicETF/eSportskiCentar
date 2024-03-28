package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Raspored {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_raspored")
    private int idRaspored;
    @Basic
    @Column(name = "tip_rasporeda")
    private String tipRasporeda;
}
