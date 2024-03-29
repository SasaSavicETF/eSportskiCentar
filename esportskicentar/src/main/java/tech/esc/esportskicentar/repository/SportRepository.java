package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.esc.esportskicentar.model.Sport;

public interface SportRepository extends JpaRepository<Sport, Integer> {
}
