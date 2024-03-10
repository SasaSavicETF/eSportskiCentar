package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Takmicenje {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_takmicenje")
    private int idTakmicenje;
    @Basic
    @Column(name = "vrsta_takmicenja")
    private String vrstaTakmicenja;

    public int getIdTakmicenje() {
        return idTakmicenje;
    }

    public void setIdTakmicenje(int idTakmicenje) {
        this.idTakmicenje = idTakmicenje;
    }

    public String getVrstaTakmicenja() {
        return vrstaTakmicenja;
    }

    public void setVrstaTakmicenja(String vrstaTakmicenja) {
        this.vrstaTakmicenja = vrstaTakmicenja;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Takmicenje that = (Takmicenje) o;

        if (idTakmicenje != that.idTakmicenje) return false;
        if (vrstaTakmicenja != null ? !vrstaTakmicenja.equals(that.vrstaTakmicenja) : that.vrstaTakmicenja != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idTakmicenje;
        result = 31 * result + (vrstaTakmicenja != null ? vrstaTakmicenja.hashCode() : 0);
        return result;
    }
}
