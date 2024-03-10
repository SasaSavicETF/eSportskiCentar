package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Time;

@Entity
public class Cjenovnik {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_cjenovnik")
    private int idCjenovnik;
    @Basic
    @Column(name = "vrijeme_od")
    private Time vrijemeOd;
    @Basic
    @Column(name = "vrijeme_do")
    private Time vrijemeDo;
    @Basic
    @Column(name = "cijena")
    private BigDecimal cijena;
    @Basic
    @Column(name = "id_teren")
    private int idTeren;

    public int getIdCjenovnik() {
        return idCjenovnik;
    }

    public void setIdCjenovnik(int idCjenovnik) {
        this.idCjenovnik = idCjenovnik;
    }

    public Time getVrijemeOd() {
        return vrijemeOd;
    }

    public void setVrijemeOd(Time vrijemeOd) {
        this.vrijemeOd = vrijemeOd;
    }

    public Time getVrijemeDo() {
        return vrijemeDo;
    }

    public void setVrijemeDo(Time vrijemeDo) {
        this.vrijemeDo = vrijemeDo;
    }

    public BigDecimal getCijena() {
        return cijena;
    }

    public void setCijena(BigDecimal cijena) {
        this.cijena = cijena;
    }

    public int getIdTeren() {
        return idTeren;
    }

    public void setIdTeren(int idTeren) {
        this.idTeren = idTeren;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Cjenovnik cjenovnik = (Cjenovnik) o;

        if (idCjenovnik != cjenovnik.idCjenovnik) return false;
        if (idTeren != cjenovnik.idTeren) return false;
        if (vrijemeOd != null ? !vrijemeOd.equals(cjenovnik.vrijemeOd) : cjenovnik.vrijemeOd != null) return false;
        if (vrijemeDo != null ? !vrijemeDo.equals(cjenovnik.vrijemeDo) : cjenovnik.vrijemeDo != null) return false;
        if (cijena != null ? !cijena.equals(cjenovnik.cijena) : cjenovnik.cijena != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idCjenovnik;
        result = 31 * result + (vrijemeOd != null ? vrijemeOd.hashCode() : 0);
        result = 31 * result + (vrijemeDo != null ? vrijemeDo.hashCode() : 0);
        result = 31 * result + (cijena != null ? cijena.hashCode() : 0);
        result = 31 * result + idTeren;
        return result;
    }
}
