package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Raspored {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_raspored")
    private int idRaspored;
    @Basic
    @Column(name = "tip_rasporeda")
    private String tipRasporeda;

    public int getIdRaspored() {
        return idRaspored;
    }

    public void setIdRaspored(int idRaspored) {
        this.idRaspored = idRaspored;
    }

    public String getTipRasporeda() {
        return tipRasporeda;
    }

    public void setTipRasporeda(String tipRasporeda) {
        this.tipRasporeda = tipRasporeda;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Raspored raspored = (Raspored) o;

        if (idRaspored != raspored.idRaspored) return false;
        if (tipRasporeda != null ? !tipRasporeda.equals(raspored.tipRasporeda) : raspored.tipRasporeda != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idRaspored;
        result = 31 * result + (tipRasporeda != null ? tipRasporeda.hashCode() : 0);
        return result;
    }
}
