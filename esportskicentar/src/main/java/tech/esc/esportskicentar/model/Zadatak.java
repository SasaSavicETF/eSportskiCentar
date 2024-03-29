package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Zadatak {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_zadatak")
    private int idZadatak;
    @Basic
    @Column(name = "datum_kreiranja")
    private Date datumKreiranja;
    @Basic
    @Column(name = "rok_izvrsenja")
    private Date rokIzvrsenja;
    @Basic
    @Column(name = "info")
    private String info;
    /*
    @Basic
    @Column(name = "id_upravnik")
    private int idUpravnik;
    @Basic
    @Column(name = "id_dezurni_radnik")
    private int idDezurniRadnik;
     */

    @ManyToOne
    @JoinColumn(name = "id_upravnik")
    private Upravnik upravnik;

    @ManyToOne
    @JoinColumn(name = "id_dezurni_radnik")
    private DezurniRadnik dezurniRadnik;
}
