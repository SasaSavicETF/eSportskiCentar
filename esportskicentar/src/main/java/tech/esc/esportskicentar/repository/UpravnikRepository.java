package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Upravnik;

@Repository
public interface UpravnikRepository extends JpaRepository<Upravnik, Integer> {
}
