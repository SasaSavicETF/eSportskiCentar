package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.esc.esportskicentar.model.Teren;

import java.util.List;

public interface TerenRepository extends JpaRepository<Teren, Integer> {

    @Query(value = "SELECT * FROM teren t WHERE t.dostupan = 1 AND t.id_dvorana = :idDvorana", nativeQuery = true)
    List<Teren> findTerensByDostupanAndDvorana(@Param("idDvorana") Integer idDvorana);

}
