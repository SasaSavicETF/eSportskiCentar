package tech.esc.esportskicentar.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import tech.esc.esportskicentar.model.Klijent;

import java.util.Optional;

public interface KlijentRepository extends JpaRepository<Klijent, Integer> {

    boolean existsByKorisnickoIme(@NotBlank String korisnickoIme);

    Optional<Klijent> findByKorisnickoImeAndLozinka(@NotBlank String korisnickoIme,@NotBlank String lozinka);
}
