package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.model.Klijent;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DogadjajRepository extends JpaRepository<Dogadjaj, Integer> {
    List<Dogadjaj> findByKlijentAndOdobrenTrue(Klijent klijent);

    @Query("SELECT COUNT(d) FROM Dogadjaj d")
    int countDogadjajs();

    @Query("SELECT d FROM Dogadjaj d JOIN d.dnevniRaspored dr WHERE dr.datum BETWEEN :startDate AND :endDate")
    List<Dogadjaj> findAllByDateRange(LocalDate startDate, LocalDate endDate);

    int countByOdobrenTrue();

    @Query("SELECT COUNT(DISTINCT d.klijent) FROM Dogadjaj d")
    int countByDistinctClient();
}
