package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tip_terena", schema = "e_sportski_centar", catalog = "")
public class TipTerena {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_tip_terena")
    private int idTipTerena;
    @Basic
    @Column(name = "naziv_tipa_terena")
    private String nazivTipaTerena;
    @Basic
    @Column(name = "info")
    private String info;

    public int getIdTipTerena() {
        return idTipTerena;
    }

    public void setIdTipTerena(int idTipTerena) {
        this.idTipTerena = idTipTerena;
    }

    public String getNazivTipaTerena() {
        return nazivTipaTerena;
    }

    public void setNazivTipaTerena(String nazivTipaTerena) {
        this.nazivTipaTerena = nazivTipaTerena;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TipTerena tipTerena = (TipTerena) o;

        if (idTipTerena != tipTerena.idTipTerena) return false;
        if (nazivTipaTerena != null ? !nazivTipaTerena.equals(tipTerena.nazivTipaTerena) : tipTerena.nazivTipaTerena != null)
            return false;
        if (info != null ? !info.equals(tipTerena.info) : tipTerena.info != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idTipTerena;
        result = 31 * result + (nazivTipaTerena != null ? nazivTipaTerena.hashCode() : 0);
        result = 31 * result + (info != null ? info.hashCode() : 0);
        return result;
    }
}
