package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "dnevni_raspored", schema = "e_sportski_centar", catalog = "")
public class DnevniRaspored {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_dnevni_raspored")
    private int idDnevniRaspored;
    @Basic
    @Column(name = "datum")
    private Date datum;
    @Basic
    @Column(name = "id_raspored")
    private Integer idRaspored;

    public int getIdDnevniRaspored() {
        return idDnevniRaspored;
    }

    public void setIdDnevniRaspored(int idDnevniRaspored) {
        this.idDnevniRaspored = idDnevniRaspored;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public Integer getIdRaspored() {
        return idRaspored;
    }

    public void setIdRaspored(Integer idRaspored) {
        this.idRaspored = idRaspored;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DnevniRaspored that = (DnevniRaspored) o;

        if (idDnevniRaspored != that.idDnevniRaspored) return false;
        if (datum != null ? !datum.equals(that.datum) : that.datum != null) return false;
        if (idRaspored != null ? !idRaspored.equals(that.idRaspored) : that.idRaspored != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idDnevniRaspored;
        result = 31 * result + (datum != null ? datum.hashCode() : 0);
        result = 31 * result + (idRaspored != null ? idRaspored.hashCode() : 0);
        return result;
    }
}
