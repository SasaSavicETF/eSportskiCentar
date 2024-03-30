package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grad {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_grad")
    private int idGrad;
    @NotBlank
    @Basic
    @Column(name = "naziv_grada")
    private String nazivGrada;
}
