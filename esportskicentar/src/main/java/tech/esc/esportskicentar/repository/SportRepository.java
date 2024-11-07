package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.esc.esportskicentar.model.Sport;

import java.math.BigDecimal;
import java.util.List;

public interface SportRepository extends JpaRepository<Sport, Integer> {

    @Query(value = "SELECT * FROM sport s WHERE s.duzina <= :tDuzina AND s.sirina <= :tSirina AND s.id_tip_terena = :tipTerena", nativeQuery = true)
    List<Sport> findSportsByTeren(@Param("tDuzina") BigDecimal tDuzina, @Param("tSirina") BigDecimal tSirina, @Param("tipTerena") Integer tipTerena);
}
