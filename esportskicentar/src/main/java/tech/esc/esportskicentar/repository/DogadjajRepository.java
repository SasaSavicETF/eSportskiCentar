package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.model.Klijent;
import tech.esc.esportskicentar.model.StatsDTO;
import tech.esc.esportskicentar.model.ZaradaStatsDTO;

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

    @Query("SELECT d FROM Dogadjaj d " +
            "JOIN d.dnevniRaspored dr " +
            "WHERE d.teren.idTeren = :idTeren AND d.odobren = true AND dr.datum = :date")
    List<Dogadjaj> findByTerenAndDate(int idTeren, LocalDate date);

    List<Dogadjaj> findAllByTerenIdTerenIn(List<Integer> terensIds);

    @Query("SELECT d FROM Dogadjaj d JOIN d.dnevniRaspored dr WHERE d.teren.idTeren in :terensIds AND dr.datum BETWEEN :startDate AND :endDate")
    List<Dogadjaj> findAllByTerenIdTerenInAndDatumBetween(List<Integer> terensIds, LocalDate startDate, LocalDate endDate);

    @Query("SELECT new tech.esc.esportskicentar.model.ZaradaStatsDTO( " +
            "FUNCTION('DATE_FORMAT', d.dnevniRaspored.datum, :groupByPattern), " +
            "SUM(CASE WHEN d.klijent IS NOT NULL THEN d.cijena ELSE 0 END), " +
            "SUM(CASE WHEN d.klijent IS NULL THEN d.cijena ELSE 0 END)) " +
            "FROM Dogadjaj d " +
            "JOIN d.dnevniRaspored dr " +
            "WHERE dr.datum BETWEEN :startDate AND :endDate " +
            "GROUP BY FUNCTION('DATE_FORMAT', d.dnevniRaspored.datum, :groupByPattern)")
    List<ZaradaStatsDTO> summarizeRevenueForPeriodByType(@Param("groupByPattern") String groupByPattern,
                                                         @Param("startDate") LocalDate startDate,
                                                         @Param("endDate") LocalDate endDate);

    @Query("SELECT d.sport.nazivSporta AS sport, SUM(d.cijena) AS total " +
            "FROM Dogadjaj d " +
            "JOIN d.dnevniRaspored dr " +
            "WHERE dr.datum BETWEEN :startDate AND :endDate " +
            "GROUP BY sport")
    List<Object[]> summarizeRevenueForPeriodBySport(LocalDate startDate, LocalDate endDate);

    @Query("SELECT new tech.esc.esportskicentar.model.StatsDTO( " +
            "FUNCTION('DATE_FORMAT', d.dnevniRaspored.datum, :groupByPattern), " +
            "SUM(d.cijena)) " +
            "FROM Dogadjaj d " +
            "WHERE d.dnevniRaspored.datum BETWEEN :startDate AND :endDate AND d.sport.idSport = :sportId " +
            "GROUP BY FUNCTION('DATE_FORMAT', d.dnevniRaspored.datum, :groupByPattern)")
    List<StatsDTO> sumarizeRevenueForPeriodForSport(@Param("groupByPattern") String groupByPattern,
                                                    @Param("startDate") LocalDate startDate,
                                                    @Param("endDate") LocalDate endDate,
                                                    @Param("sportId")  Integer sportId);


    @Query("SELECT d.teren.dvorana.nazivDvorane AS dvorana, SUM(d.cijena) AS total " +
            "FROM Dogadjaj d " +
            "JOIN d.dnevniRaspored dr " +
            "WHERE dr.datum BETWEEN :startDate AND :endDate " +
            "GROUP BY dvorana")
    List<Object[]> summarizeRevenueForPeriodByDvorana(LocalDate startDate, LocalDate endDate);

    @Query("SELECT new tech.esc.esportskicentar.model.StatsDTO( " +
            "FUNCTION('DATE_FORMAT', d.dnevniRaspored.datum, :groupByPattern), " +
            "SUM(d.cijena)) " +
            "FROM Dogadjaj d " +
            "WHERE d.dnevniRaspored.datum BETWEEN :startDate AND :endDate AND d.teren.dvorana.idDvorana = :dvoranaId " +
            "GROUP BY FUNCTION('DATE_FORMAT', d.dnevniRaspored.datum, :groupByPattern)")
    List<StatsDTO> sumarizeRevenueForPeriodForDvorana(@Param("groupByPattern") String groupByPattern,
                                                      @Param("startDate") LocalDate startDate,
                                                      @Param("endDate") LocalDate endDate,
                                                      @Param("dvoranaId") int dvoranaId);
}
