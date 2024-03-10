package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Zadatak {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_zadatak")
    private int idZadatak;
    @Basic
    @Column(name = "datum_kreiranja")
    private Date datumKreiranja;
    @Basic
    @Column(name = "rok_izvrsenja")
    private Date rokIzvrsenja;
    @Basic
    @Column(name = "info")
    private String info;
    @Basic
    @Column(name = "id_upravnik")
    private int idUpravnik;
    @Basic
    @Column(name = "id_dezurni_radnik")
    private int idDezurniRadnik;

    public int getIdZadatak() {
        return idZadatak;
    }

    public void setIdZadatak(int idZadatak) {
        this.idZadatak = idZadatak;
    }

    public Date getDatumKreiranja() {
        return datumKreiranja;
    }

    public void setDatumKreiranja(Date datumKreiranja) {
        this.datumKreiranja = datumKreiranja;
    }

    public Date getRokIzvrsenja() {
        return rokIzvrsenja;
    }

    public void setRokIzvrsenja(Date rokIzvrsenja) {
        this.rokIzvrsenja = rokIzvrsenja;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public int getIdUpravnik() {
        return idUpravnik;
    }

    public void setIdUpravnik(int idUpravnik) {
        this.idUpravnik = idUpravnik;
    }

    public int getIdDezurniRadnik() {
        return idDezurniRadnik;
    }

    public void setIdDezurniRadnik(int idDezurniRadnik) {
        this.idDezurniRadnik = idDezurniRadnik;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Zadatak zadatak = (Zadatak) o;

        if (idZadatak != zadatak.idZadatak) return false;
        if (idUpravnik != zadatak.idUpravnik) return false;
        if (idDezurniRadnik != zadatak.idDezurniRadnik) return false;
        if (datumKreiranja != null ? !datumKreiranja.equals(zadatak.datumKreiranja) : zadatak.datumKreiranja != null)
            return false;
        if (rokIzvrsenja != null ? !rokIzvrsenja.equals(zadatak.rokIzvrsenja) : zadatak.rokIzvrsenja != null)
            return false;
        if (info != null ? !info.equals(zadatak.info) : zadatak.info != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idZadatak;
        result = 31 * result + (datumKreiranja != null ? datumKreiranja.hashCode() : 0);
        result = 31 * result + (rokIzvrsenja != null ? rokIzvrsenja.hashCode() : 0);
        result = 31 * result + (info != null ? info.hashCode() : 0);
        result = 31 * result + idUpravnik;
        result = 31 * result + idDezurniRadnik;
        return result;
    }
}
