package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
public class Zahtjev {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_zahtjev")
    private int idZahtjev;
    @Basic
    @Column(name = "id_klijent")
    private int idKlijent;
    @Basic
    @Column(name = "id_teren")
    private int idTeren;
    @Basic
    @Column(name = "id_dnevni_raspored")
    private int idDnevniRaspored;
    @Basic
    @Column(name = "vrijeme_pocetka")
    private Time vrijemePocetka;
    @Basic
    @Column(name = "vrijeme_kraja")
    private Time vrijemeKraja;
    @Basic
    @Column(name = "poruka")
    private String poruka;
    @Basic
    @Column(name = "odobren")
    private boolean odobren;

    public int getIdZahtjev() {
        return idZahtjev;
    }

    public void setIdZahtjev(int idZahtjev) {
        this.idZahtjev = idZahtjev;
    }

    public int getIdKlijent() {
        return idKlijent;
    }

    public void setIdKlijent(int idKlijent) {
        this.idKlijent = idKlijent;
    }

    public int getIdTeren() {
        return idTeren;
    }

    public void setIdTeren(int idTeren) {
        this.idTeren = idTeren;
    }

    public int getIdDnevniRaspored() {
        return idDnevniRaspored;
    }

    public void setIdDnevniRaspored(int idDnevniRaspored) {
        this.idDnevniRaspored = idDnevniRaspored;
    }

    public Time getVrijemePocetka() {
        return vrijemePocetka;
    }

    public void setVrijemePocetka(Time vrijemePocetka) {
        this.vrijemePocetka = vrijemePocetka;
    }

    public Time getVrijemeKraja() {
        return vrijemeKraja;
    }

    public void setVrijemeKraja(Time vrijemeKraja) {
        this.vrijemeKraja = vrijemeKraja;
    }

    public String getPoruka() {
        return poruka;
    }

    public void setPoruka(String poruka) {
        this.poruka = poruka;
    }

    public boolean isOdobren() {
        return odobren;
    }

    public void setOdobren(boolean odobren) {
        this.odobren = odobren;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Zahtjev zahtjev = (Zahtjev) o;

        if (idZahtjev != zahtjev.idZahtjev) return false;
        if (idKlijent != zahtjev.idKlijent) return false;
        if (idTeren != zahtjev.idTeren) return false;
        if (idDnevniRaspored != zahtjev.idDnevniRaspored) return false;
        if (odobren != zahtjev.odobren) return false;
        if (vrijemePocetka != null ? !vrijemePocetka.equals(zahtjev.vrijemePocetka) : zahtjev.vrijemePocetka != null)
            return false;
        if (vrijemeKraja != null ? !vrijemeKraja.equals(zahtjev.vrijemeKraja) : zahtjev.vrijemeKraja != null)
            return false;
        if (poruka != null ? !poruka.equals(zahtjev.poruka) : zahtjev.poruka != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idZahtjev;
        result = 31 * result + idKlijent;
        result = 31 * result + idTeren;
        result = 31 * result + idDnevniRaspored;
        result = 31 * result + (vrijemePocetka != null ? vrijemePocetka.hashCode() : 0);
        result = 31 * result + (vrijemeKraja != null ? vrijemeKraja.hashCode() : 0);
        result = 31 * result + (poruka != null ? poruka.hashCode() : 0);
        result = 31 * result + (odobren ? 1 : 0);
        return result;
    }
}
