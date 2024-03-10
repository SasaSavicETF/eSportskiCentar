package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Sport {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_sport")
    private int idSport;
    @Basic
    @Column(name = "naziv_sporta")
    private String nazivSporta;
    @Basic
    @Column(name = "duzina")
    private BigDecimal duzina;
    @Basic
    @Column(name = "sirina")
    private BigDecimal sirina;

    public int getIdSport() {
        return idSport;
    }

    public void setIdSport(int idSport) {
        this.idSport = idSport;
    }

    public String getNazivSporta() {
        return nazivSporta;
    }

    public void setNazivSporta(String nazivSporta) {
        this.nazivSporta = nazivSporta;
    }

    public BigDecimal getDuzina() {
        return duzina;
    }

    public void setDuzina(BigDecimal duzina) {
        this.duzina = duzina;
    }

    public BigDecimal getSirina() {
        return sirina;
    }

    public void setSirina(BigDecimal sirina) {
        this.sirina = sirina;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Sport sport = (Sport) o;

        if (idSport != sport.idSport) return false;
        if (nazivSporta != null ? !nazivSporta.equals(sport.nazivSporta) : sport.nazivSporta != null) return false;
        if (duzina != null ? !duzina.equals(sport.duzina) : sport.duzina != null) return false;
        if (sirina != null ? !sirina.equals(sport.sirina) : sport.sirina != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idSport;
        result = 31 * result + (nazivSporta != null ? nazivSporta.hashCode() : 0);
        result = 31 * result + (duzina != null ? duzina.hashCode() : 0);
        result = 31 * result + (sirina != null ? sirina.hashCode() : 0);
        return result;
    }
}
