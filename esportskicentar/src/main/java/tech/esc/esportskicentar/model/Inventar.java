package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Inventar {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_inventar")
    private int idInventar;
    @Basic
    @Column(name = "id_dvorana")
    private int idDvorana;
    @Basic
    @Column(name = "naziv")
    private String naziv;
    @Basic
    @Column(name = "opis")
    private String opis;

    public int getIdInventar() {
        return idInventar;
    }

    public void setIdInventar(int idInventar) {
        this.idInventar = idInventar;
    }

    public int getIdDvorana() {
        return idDvorana;
    }

    public void setIdDvorana(int idDvorana) {
        this.idDvorana = idDvorana;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Inventar inventar = (Inventar) o;

        if (idInventar != inventar.idInventar) return false;
        if (idDvorana != inventar.idDvorana) return false;
        if (naziv != null ? !naziv.equals(inventar.naziv) : inventar.naziv != null) return false;
        if (opis != null ? !opis.equals(inventar.opis) : inventar.opis != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idInventar;
        result = 31 * result + idDvorana;
        result = 31 * result + (naziv != null ? naziv.hashCode() : 0);
        result = 31 * result + (opis != null ? opis.hashCode() : 0);
        return result;
    }
}
