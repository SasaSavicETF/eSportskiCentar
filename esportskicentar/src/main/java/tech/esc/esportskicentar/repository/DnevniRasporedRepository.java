package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.DnevniRaspored;
@Repository
public interface DnevniRasporedRepository extends JpaRepository<DnevniRaspored, Integer> {
}
