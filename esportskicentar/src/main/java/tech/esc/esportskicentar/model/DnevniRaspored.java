package tech.esc.esportskicentar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="dd.MM.yyyy")
    @Basic
    @Column(name = "datum")
    private Date datum;
    /*
    @Basic
    @Column(name = "id_raspored")
    private Integer idRaspored;
     */
    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_raspored")
    private Raspored raspored;
}
