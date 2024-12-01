package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

/**
 * @author milan
 * @created 11/11/2024 11:11 AM
 * @project esportskicentar
 */

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transakcija
{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_transakcija")
    private int idTransakcija;
    @NotBlank
    @Basic
    @Column(name = "svrha_doznake")
    private String svrhaDoznake;
    @NotNull
    @Basic
    @Column(name = "prihod")
    private boolean prihod;
    @NotNull
    @Positive
    @Basic
    @Column(name = "iznos")
    private BigDecimal iznos;

    public Transakcija(String svrhaDoznake, boolean prihod, BigDecimal iznos)
    {
        this.svrhaDoznake = svrhaDoznake;
        this.prihod = prihod;
        this.iznos = iznos;
    }
}
