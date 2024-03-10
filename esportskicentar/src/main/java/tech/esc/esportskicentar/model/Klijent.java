package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Klijent {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_klijent")
    private int idKlijent;
    @Basic
    @Column(name = "ime")
    private String ime;
    @Basic
    @Column(name = "prezime")
    private String prezime;
    @Basic
    @Column(name = "broj_telefona")
    private String brojTelefona;
    @Basic
    @Column(name = "korisnicko_ime")
    private String korisnickoIme;
    @Basic
    @Column(name = "lozinka")
    private String lozinka;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "blokiran")
    private boolean blokiran;

    public int getIdKlijent() {
        return idKlijent;
    }

    public void setIdKlijent(int idKlijent) {
        this.idKlijent = idKlijent;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getBrojTelefona() {
        return brojTelefona;
    }

    public void setBrojTelefona(String brojTelefona) {
        this.brojTelefona = brojTelefona;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isBlokiran() {
        return blokiran;
    }

    public void setBlokiran(boolean blokiran) {
        this.blokiran = blokiran;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Klijent klijent = (Klijent) o;

        if (idKlijent != klijent.idKlijent) return false;
        if (blokiran != klijent.blokiran) return false;
        if (ime != null ? !ime.equals(klijent.ime) : klijent.ime != null) return false;
        if (prezime != null ? !prezime.equals(klijent.prezime) : klijent.prezime != null) return false;
        if (brojTelefona != null ? !brojTelefona.equals(klijent.brojTelefona) : klijent.brojTelefona != null)
            return false;
        if (korisnickoIme != null ? !korisnickoIme.equals(klijent.korisnickoIme) : klijent.korisnickoIme != null)
            return false;
        if (lozinka != null ? !lozinka.equals(klijent.lozinka) : klijent.lozinka != null) return false;
        if (email != null ? !email.equals(klijent.email) : klijent.email != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idKlijent;
        result = 31 * result + (ime != null ? ime.hashCode() : 0);
        result = 31 * result + (prezime != null ? prezime.hashCode() : 0);
        result = 31 * result + (brojTelefona != null ? brojTelefona.hashCode() : 0);
        result = 31 * result + (korisnickoIme != null ? korisnickoIme.hashCode() : 0);
        result = 31 * result + (lozinka != null ? lozinka.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (blokiran ? 1 : 0);
        return result;
    }
}
