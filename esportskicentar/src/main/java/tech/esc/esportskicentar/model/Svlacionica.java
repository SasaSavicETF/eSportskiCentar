package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Svlacionica {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_svlacionica")
    private int idSvlacionica;
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
    @Basic
    @Column(name = "broj_svlacionice")
    private Integer brojSvlacionice;
    @Basic
    @Column(name = "dostupna")
    private boolean dostupna;

    public int getIdSvlacionica() {
        return idSvlacionica;
    }

    public void setIdSvlacionica(int idSvlacionica) {
        this.idSvlacionica = idSvlacionica;
    }

    public int getIdDvorana() {
        return idDvorana;
    }

    public void setIdDvorana(int idDvorana) {
        this.idDvorana = idDvorana;
    }

    public Integer getBrojSvlacionice() {
        return brojSvlacionice;
    }

    public void setBrojSvlacionice(Integer brojSvlacionice) {
        this.brojSvlacionice = brojSvlacionice;
    }

    public boolean isDostupna() {
        return dostupna;
    }

    public void setDostupna(boolean dostupna) {
        this.dostupna = dostupna;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Svlacionica that = (Svlacionica) o;

        if (idSvlacionica != that.idSvlacionica) return false;
        if (idDvorana != that.idDvorana) return false;
        if (dostupna != that.dostupna) return false;
        if (brojSvlacionice != null ? !brojSvlacionice.equals(that.brojSvlacionice) : that.brojSvlacionice != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idSvlacionica;
        result = 31 * result + idDvorana;
        result = 31 * result + (brojSvlacionice != null ? brojSvlacionice.hashCode() : 0);
        result = 31 * result + (dostupna ? 1 : 0);
        return result;
    }
}
