package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teren {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_teren")
    private int idTeren;
    /*
    @Basic
    @Column(name = "id_tip_terena")
    private int idTipTerena;
    */
    @Basic
    @Column(name = "naziv_terena")
    private String nazivTerena;
    @Basic
    @Column(name = "info")
    private String info;
    /*
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
     */
    @Basic
    @Column(name = "slika")
    private String slika;

    @ManyToOne
    @JoinColumn(name = "id_tip_terena")
    private TipTerena tipTerena;

    @ManyToOne
    @JoinColumn(name = "id_dvorana")
    private Dvorana dvorana;

}
