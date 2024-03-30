package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.DezurniRadnik;

@Repository
public interface DezurniRadnikRepository extends JpaRepository<DezurniRadnik, Integer> {
}
