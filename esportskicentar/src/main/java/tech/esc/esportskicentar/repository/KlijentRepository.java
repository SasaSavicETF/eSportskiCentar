package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.esc.esportskicentar.model.Klijent;

public interface KlijentRepository extends JpaRepository<Klijent, Integer> {
}
