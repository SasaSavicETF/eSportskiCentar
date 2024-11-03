package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query(value = "SELECT * FROM dogadjaj d WHERE d.id_dnevni_raspored = :idDnevniR AND d.id_teren = :idTeren AND d.odobren = 1", nativeQuery = true)
    List<Dogadjaj> findAllFilteredDogadjajs(@Param("idDnevniR") Integer idDnevniR, @Param("idTeren") Integer idTeren);
}
