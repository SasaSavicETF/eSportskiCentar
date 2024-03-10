package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Teren {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_teren")
    private int idTeren;
    @Basic
    @Column(name = "id_tip_terena")
    private int idTipTerena;
    @Basic
    @Column(name = "naziv_terena")
    private String nazivTerena;
    @Basic
    @Column(name = "info")
    private String info;
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
    @Basic
    @Column(name = "slika")
    private String slika;

    public int getIdTeren() {
        return idTeren;
    }

    public void setIdTeren(int idTeren) {
        this.idTeren = idTeren;
    }

    public int getIdTipTerena() {
        return idTipTerena;
    }

    public void setIdTipTerena(int idTipTerena) {
        this.idTipTerena = idTipTerena;
    }

    public String getNazivTerena() {
        return nazivTerena;
    }

    public void setNazivTerena(String nazivTerena) {
        this.nazivTerena = nazivTerena;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public int getIdDvorana() {
        return idDvorana;
    }

    public void setIdDvorana(int idDvorana) {
        this.idDvorana = idDvorana;
    }

    public String getSlika() {
        return slika;
    }

    public void setSlika(String slika) {
        this.slika = slika;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Teren teren = (Teren) o;

        if (idTeren != teren.idTeren) return false;
        if (idTipTerena != teren.idTipTerena) return false;
        if (idDvorana != teren.idDvorana) return false;
        if (nazivTerena != null ? !nazivTerena.equals(teren.nazivTerena) : teren.nazivTerena != null) return false;
        if (info != null ? !info.equals(teren.info) : teren.info != null) return false;
        if (slika != null ? !slika.equals(teren.slika) : teren.slika != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idTeren;
        result = 31 * result + idTipTerena;
        result = 31 * result + (nazivTerena != null ? nazivTerena.hashCode() : 0);
        result = 31 * result + (info != null ? info.hashCode() : 0);
        result = 31 * result + idDvorana;
        result = 31 * result + (slika != null ? slika.hashCode() : 0);
        return result;
    }
}
