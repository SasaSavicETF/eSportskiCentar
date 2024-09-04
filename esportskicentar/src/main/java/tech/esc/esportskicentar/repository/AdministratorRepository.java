package tech.esc.esportskicentar.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Administrator;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {

    boolean existsByKorisnickoIme(@NotBlank String korisnickoIme);

    Optional<Administrator> findByKorisnickoImeAndLozinka(@NotBlank String korisnickoIme, @NotBlank String lozinka);
}
