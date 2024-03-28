package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Zadatak;
@Repository
public interface ZadatakRepository extends JpaRepository<Zadatak, Integer> {
}
