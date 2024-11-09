package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.esc.esportskicentar.model.Ekipa;

import java.util.List;

public interface EkipaRepository extends JpaRepository<Ekipa, Integer> {

    @Query(value = "SELECT * FROM ekipa e WHERE e.id_sport = :idS", nativeQuery = true)
    List<Ekipa> findEkipasBySport(@Param("idS") Integer idS);
}
