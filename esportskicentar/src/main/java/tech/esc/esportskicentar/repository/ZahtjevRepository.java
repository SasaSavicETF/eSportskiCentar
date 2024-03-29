package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.esc.esportskicentar.model.Klijent;
import tech.esc.esportskicentar.model.Zahtjev;

public interface ZahtjevRepository extends JpaRepository<Zahtjev, Integer> {
}
