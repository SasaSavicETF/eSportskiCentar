package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

import java.sql.Time;

@Entity
public class Dogadjaj {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_dogadjaj")
    private int idDogadjaj;
    @Basic
    @Column(name = "id_takmicenje")
    private int idTakmicenje;
    @Basic
    @Column(name = "id_domace_ekipe")
    private int idDomaceEkipe;
    @Basic
    @Column(name = "id_gostujuce_ekipe")
    private int idGostujuceEkipe;
    @Basic
    @Column(name = "vrijeme")
    private Time vrijeme;
    @Basic
    @Column(name = "info_dogadjaja")
    private String infoDogadjaja;
    @Basic
    @Column(name = "id_dnevni_raspored")
    private int idDnevniRaspored;
    @Basic
    @Column(name = "id_teren")
    private int idTeren;

    public int getIdDogadjaj() {
        return idDogadjaj;
    }

    public void setIdDogadjaj(int idDogadjaj) {
        this.idDogadjaj = idDogadjaj;
    }

    public int getIdTakmicenje() {
        return idTakmicenje;
    }

    public void setIdTakmicenje(int idTakmicenje) {
        this.idTakmicenje = idTakmicenje;
    }

    public int getIdDomaceEkipe() {
        return idDomaceEkipe;
    }

    public void setIdDomaceEkipe(int idDomaceEkipe) {
        this.idDomaceEkipe = idDomaceEkipe;
    }

    public int getIdGostujuceEkipe() {
        return idGostujuceEkipe;
    }

    public void setIdGostujuceEkipe(int idGostujuceEkipe) {
        this.idGostujuceEkipe = idGostujuceEkipe;
    }

    public Time getVrijeme() {
        return vrijeme;
    }

    public void setVrijeme(Time vrijeme) {
        this.vrijeme = vrijeme;
    }

    public String getInfoDogadjaja() {
        return infoDogadjaja;
    }

    public void setInfoDogadjaja(String infoDogadjaja) {
        this.infoDogadjaja = infoDogadjaja;
    }

    public int getIdDnevniRaspored() {
        return idDnevniRaspored;
    }

    public void setIdDnevniRaspored(int idDnevniRaspored) {
        this.idDnevniRaspored = idDnevniRaspored;
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

        Dogadjaj dogadjaj = (Dogadjaj) o;

        if (idDogadjaj != dogadjaj.idDogadjaj) return false;
        if (idTakmicenje != dogadjaj.idTakmicenje) return false;
        if (idDomaceEkipe != dogadjaj.idDomaceEkipe) return false;
        if (idGostujuceEkipe != dogadjaj.idGostujuceEkipe) return false;
        if (idDnevniRaspored != dogadjaj.idDnevniRaspored) return false;
        if (idTeren != dogadjaj.idTeren) return false;
        if (vrijeme != null ? !vrijeme.equals(dogadjaj.vrijeme) : dogadjaj.vrijeme != null) return false;
        if (infoDogadjaja != null ? !infoDogadjaja.equals(dogadjaj.infoDogadjaja) : dogadjaj.infoDogadjaja != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idDogadjaj;
        result = 31 * result + idTakmicenje;
        result = 31 * result + idDomaceEkipe;
        result = 31 * result + idGostujuceEkipe;
        result = 31 * result + (vrijeme != null ? vrijeme.hashCode() : 0);
        result = 31 * result + (infoDogadjaja != null ? infoDogadjaja.hashCode() : 0);
        result = 31 * result + idDnevniRaspored;
        result = 31 * result + idTeren;
        return result;
    }
}
