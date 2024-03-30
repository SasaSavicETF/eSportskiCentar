package tech.esc.esportskicentar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import tech.esc.esportskicentar.annotation.CompareDate;

import java.sql.Date;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompareDate(before = "datumKreiranja", after="rokIzvrsenja", message = "Datum kreiranja mora biti prije roka izvrsenja")
public class Zadatak {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_zadatak")
    private int idZadatak;
    @NotNull
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
    @Basic
    @Column(name = "datum_kreiranja")
    private Date datumKreiranja;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
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
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_upravnik")
    private Upravnik upravnik;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_dezurni_radnik")
    private DezurniRadnik dezurniRadnik;
}
