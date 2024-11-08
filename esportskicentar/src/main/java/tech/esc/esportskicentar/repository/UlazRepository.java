package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Ulaz;

import java.util.List;

@Repository
public interface UlazRepository extends JpaRepository<Ulaz, Integer> {

    @Query("SELECT ulaz FROM Ulaz " +
            "ulaz JOIN FETCH ulaz.dvorana dvorana " +
            "WHERE ulaz.idUlaz = :id")
    Ulaz findChildByIdWithParent(@Param("id") Integer id);

    @Query(value = "SELECT * FROM ulaz u WHERE u.dostupan = 1 AND u.id_dvorana = :idD", nativeQuery = true)
    List<Ulaz> findUlazsByDvorana(@Param("idD") Integer idD);

}
