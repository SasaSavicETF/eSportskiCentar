package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Ekipa {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_ekipa")
    private int idEkipa;
    @Basic
    @Column(name = "naziv_ekipe")
    private String nazivEkipe;
    @Basic
    @Column(name = "id_sport")
    private int idSport;
    @Basic
    @Column(name = "id_takmicenje")
    private int idTakmicenje;

    public int getIdEkipa() {
        return idEkipa;
    }

    public void setIdEkipa(int idEkipa) {
        this.idEkipa = idEkipa;
    }

    public String getNazivEkipe() {
        return nazivEkipe;
    }

    public void setNazivEkipe(String nazivEkipe) {
        this.nazivEkipe = nazivEkipe;
    }

    public int getIdSport() {
        return idSport;
    }

    public void setIdSport(int idSport) {
        this.idSport = idSport;
    }

    public int getIdTakmicenje() {
        return idTakmicenje;
    }

    public void setIdTakmicenje(int idTakmicenje) {
        this.idTakmicenje = idTakmicenje;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Ekipa ekipa = (Ekipa) o;

        if (idEkipa != ekipa.idEkipa) return false;
        if (idSport != ekipa.idSport) return false;
        if (idTakmicenje != ekipa.idTakmicenje) return false;
        if (nazivEkipe != null ? !nazivEkipe.equals(ekipa.nazivEkipe) : ekipa.nazivEkipe != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idEkipa;
        result = 31 * result + (nazivEkipe != null ? nazivEkipe.hashCode() : 0);
        result = 31 * result + idSport;
        result = 31 * result + idTakmicenje;
        return result;
    }
}
