package tech.esc.esportskicentar.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Upravnik;

import java.util.Optional;

@Repository
public interface UpravnikRepository extends JpaRepository<Upravnik, Integer> {

    boolean existsByKorisnickoIme(@NotBlank String korisnickoIme);

    Optional<Upravnik> findByKorisnickoImeAndLozinka(@NotBlank String korisnickoIme, @NotBlank String lozinka);
}
