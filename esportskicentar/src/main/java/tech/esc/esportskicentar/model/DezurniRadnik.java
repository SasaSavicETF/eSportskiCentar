package tech.esc.esportskicentar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import tech.esc.esportskicentar.annotation.ValidPhoneNumber;

@Entity
@Table(name = "dezurni_radnik", schema = "e_sportski_centar", catalog = "")
@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DezurniRadnik {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_dezurni_radnik")
    private int idDezurniRadnik;
    @NotBlank
    @Basic
    @Column(name = "ime")
    private String ime;
    @NotBlank
    @Basic
    @Column(name = "prezime")
    private String prezime;
    @NotNull
    @ValidPhoneNumber
    @Basic
    @Column(name = "broj_telefona")
    private String brojTelefona;
    @NotBlank
    @Basic
    @Column(name = "korisnicko_ime")
    private String korisnickoIme;
    @NotBlank
    @Basic
    @Column(name = "lozinka")
    private String lozinka;
    @NotNull
    @Email
    @Basic
    @Column(name = "email")
    private String email;
    @NotNull
    @Basic
    @Column(name = "blokiran")
    private boolean blokiran;
}
