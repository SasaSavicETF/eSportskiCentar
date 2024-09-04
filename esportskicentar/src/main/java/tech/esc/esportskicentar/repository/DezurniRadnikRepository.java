package tech.esc.esportskicentar.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.DezurniRadnik;

import java.util.Optional;

@Repository
public interface DezurniRadnikRepository extends JpaRepository<DezurniRadnik, Integer> {

    boolean existsByKorisnickoIme(@NotBlank String korisnickoIme);

    Optional<DezurniRadnik> findByKorisnickoImeAndLozinka(@NotBlank String korisnickoIme, @NotBlank String lozinka);
}
