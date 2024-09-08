package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tech.esc.esportskicentar.model.Klijent;
import tech.esc.esportskicentar.model.Zahtjev;

public interface ZahtjevRepository extends JpaRepository<Zahtjev, Integer> {
    int countByOdobrenTrue();

    @Query("SELECT COUNT(DISTINCT z.klijent) FROM Zahtjev z")
    int countByDistinctClient();
}
