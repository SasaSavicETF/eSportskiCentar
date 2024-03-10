package tech.esc.esportskicentar.model;

import jakarta.persistence.*;

@Entity
public class Grad {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_grad")
    private int idGrad;
    @Basic
    @Column(name = "naziv_grada")
    private String nazivGrada;

    public int getIdGrad() {
        return idGrad;
    }

    public void setIdGrad(int idGrad) {
        this.idGrad = idGrad;
    }

    public String getNazivGrada() {
        return nazivGrada;
    }

    public void setNazivGrada(String nazivGrada) {
        this.nazivGrada = nazivGrada;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Grad grad = (Grad) o;

        if (idGrad != grad.idGrad) return false;
        if (nazivGrada != null ? !nazivGrada.equals(grad.nazivGrada) : grad.nazivGrada != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idGrad;
        result = 31 * result + (nazivGrada != null ? nazivGrada.hashCode() : 0);
        return result;
    }
}
