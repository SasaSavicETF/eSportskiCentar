package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventar {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_inventar")
    private int idInventar;
    /*
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
     */
    @Basic
    @Column(name = "naziv")
    private String naziv;
    @Basic
    @Column(name = "opis")
    private String opis;

    @ManyToOne
    @JoinColumn(name = "id_dvorana")
    private Dvorana dvorana;

}
