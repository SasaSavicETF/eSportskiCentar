package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Ulaz {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_ulaz")
    private int idUlaz;
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
    @Basic
    @Column(name = "naziv_ulaza")
    private String nazivUlaza;
    @Basic
    @Column(name = "broj_ulaza")
    private Integer brojUlaza;
    @Basic
    @Column(name = "dostupan")
    private boolean dostupan;

    public int getIdUlaz() {
        return idUlaz;
    }

    public void setIdUlaz(int idUlaz) {
        this.idUlaz = idUlaz;
    }

    public int getIdDvorana() {
        return idDvorana;
    }

    public void setIdDvorana(int idDvorana) {
        this.idDvorana = idDvorana;
    }

    public String getNazivUlaza() {
        return nazivUlaza;
    }

    public void setNazivUlaza(String nazivUlaza) {
        this.nazivUlaza = nazivUlaza;
    }

    public Integer getBrojUlaza() {
        return brojUlaza;
    }

    public void setBrojUlaza(Integer brojUlaza) {
        this.brojUlaza = brojUlaza;
    }

    public boolean isDostupan() {
        return dostupan;
    }

    public void setDostupan(boolean dostupan) {
        this.dostupan = dostupan;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Ulaz ulaz = (Ulaz) o;

        if (idUlaz != ulaz.idUlaz) return false;
        if (idDvorana != ulaz.idDvorana) return false;
        if (dostupan != ulaz.dostupan) return false;
        if (nazivUlaza != null ? !nazivUlaza.equals(ulaz.nazivUlaza) : ulaz.nazivUlaza != null) return false;
        if (brojUlaza != null ? !brojUlaza.equals(ulaz.brojUlaza) : ulaz.brojUlaza != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idUlaz;
        result = 31 * result + idDvorana;
        result = 31 * result + (nazivUlaza != null ? nazivUlaza.hashCode() : 0);
        result = 31 * result + (brojUlaza != null ? brojUlaza.hashCode() : 0);
        result = 31 * result + (dostupan ? 1 : 0);
        return result;
    }
}
