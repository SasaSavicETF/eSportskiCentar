package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Raspored;
@Repository
public interface RasporedRepository extends JpaRepository<Raspored, Integer> {
}
