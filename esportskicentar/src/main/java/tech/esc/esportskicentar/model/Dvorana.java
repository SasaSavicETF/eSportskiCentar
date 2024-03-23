package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;

import java.math.BigDecimal;

@Entity
public class Dvorana {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_dvorana")
    private int idDvorana;
    @Basic
    @Column(name = "naziv_dvorane")
    private String nazivDvorane;
    /*@Basic
    @Column(name = "id_grad")
    private int idGrad;*/
    @Basic
    @Column(name = "kapacitet")
    private Integer kapacitet;
    @Basic
    @Column(name = "duzina")
    private BigDecimal duzina;
    @Basic
    @Column(name = "sirina")
    private BigDecimal sirina;
    @Basic
    @Column(name = "info")
    private String info;

    @ManyToOne
    @JoinColumn(name = "id_grad")
    private Grad grad;

    public int getIdDvorana() {
        return idDvorana;
    }

    public void setIdDvorana(int idDvorana) {
        this.idDvorana = idDvorana;
    }

    public String getNazivDvorane() {
        return nazivDvorane;
    }

    public void setNazivDvorane(String nazivDvorane) {
        this.nazivDvorane = nazivDvorane;
    }
/*
    public int getIdGrad() {
        return idGrad;
    }

    public void setIdGrad(int idGrad) {
        this.idGrad = idGrad;
    }*/

    public Integer getKapacitet() {
        return kapacitet;
    }

    public void setKapacitet(Integer kapacitet) {
        this.kapacitet = kapacitet;
    }

    public BigDecimal getDuzina() {
        return duzina;
    }

    public void setDuzina(BigDecimal duzina) {
        this.duzina = duzina;
    }

    public BigDecimal getSirina() {
        return sirina;
    }

    public void setSirina(BigDecimal sirina) {
        this.sirina = sirina;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Grad getGrad() {
        return grad;
    }

    public void setGrad(Grad grad) {
        this.grad = grad;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Dvorana dvorana = (Dvorana) o;

        if (idDvorana != dvorana.idDvorana) return false;
        //if (idGrad != dvorana.idGrad) return false;
        if (nazivDvorane != null ? !nazivDvorane.equals(dvorana.nazivDvorane) : dvorana.nazivDvorane != null)
            return false;
        if (kapacitet != null ? !kapacitet.equals(dvorana.kapacitet) : dvorana.kapacitet != null) return false;
        if (duzina != null ? !duzina.equals(dvorana.duzina) : dvorana.duzina != null) return false;
        if (sirina != null ? !sirina.equals(dvorana.sirina) : dvorana.sirina != null) return false;
        if (info != null ? !info.equals(dvorana.info) : dvorana.info != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idDvorana;
        result = 31 * result + (nazivDvorane != null ? nazivDvorane.hashCode() : 0);
        //result = 31 * result + idGrad;
        result = 31 * result + (kapacitet != null ? kapacitet.hashCode() : 0);
        result = 31 * result + (duzina != null ? duzina.hashCode() : 0);
        result = 31 * result + (sirina != null ? sirina.hashCode() : 0);
        result = 31 * result + (info != null ? info.hashCode() : 0);
        return result;
    }
}
