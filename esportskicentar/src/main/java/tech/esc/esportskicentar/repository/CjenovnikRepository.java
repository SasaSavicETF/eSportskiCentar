package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Cjenovnik;
@Repository
public interface CjenovnikRepository extends JpaRepository<Cjenovnik, Integer> {
}
