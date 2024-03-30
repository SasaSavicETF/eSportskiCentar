package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "tip_terena", schema = "e_sportski_centar", catalog = "")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipTerena {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_tip_terena")
    private int idTipTerena;
    @NotBlank
    @Basic
    @Column(name = "naziv_tipa_terena")
    private String nazivTipaTerena;
    @Basic
    @Column(name = "info")
    private String info;

}
