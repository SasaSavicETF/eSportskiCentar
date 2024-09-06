package tech.esc.esportskicentar.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.esc.esportskicentar.model.Klijent;

import java.util.Optional;

public interface KlijentRepository extends JpaRepository<Klijent, Integer> {

    @Query("SELECT COUNT(k) FROM Klijent k")
    int countKlijents();

    boolean existsByKorisnickoIme(@NotBlank String korisnickoIme);

    Optional<Klijent> findByKorisnickoImeAndLozinka(@NotBlank String korisnickoIme,@NotBlank String lozinka);
}
