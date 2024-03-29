package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "dnevni_raspored", schema = "e_sportski_centar", catalog = "")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DnevniRaspored {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_dnevni_raspored")
    private int idDnevniRaspored;
    @Basic
    @Column(name = "datum")
    private Date datum;
    /*
    @Basic
    @Column(name = "id_raspored")
    private Integer idRaspored;
     */

    @ManyToOne
    @JoinColumn(name = "id_raspored")
    private Raspored raspored;
}
