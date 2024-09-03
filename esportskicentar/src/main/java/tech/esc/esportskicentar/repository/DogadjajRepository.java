package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.model.Klijent;

import java.util.List;

@Repository
public interface DogadjajRepository extends JpaRepository<Dogadjaj, Integer> {
    List<Dogadjaj> findByKlijent(Klijent klijent);
}
