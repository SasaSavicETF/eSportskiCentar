package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.esc.esportskicentar.model.Svlacionica;

import java.util.List;

public interface SvlacionicaRepository extends JpaRepository<Svlacionica, Integer>
{
    @Query(value = "SELECT * FROM svlacionica s WHERE s.dostupna = 1 AND s.id_dvorana = :idD", nativeQuery = true)
    List<Svlacionica> findSvlacionicasByDvorana(@Param("idD") Integer idD);
}
