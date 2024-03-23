package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Ulaz;

@Repository
public interface UlazRepository extends JpaRepository<Ulaz, Integer> {

    @Query("SELECT ulaz FROM Ulaz " +
            "ulaz JOIN FETCH ulaz.dvorana dvorana " +
            "WHERE ulaz.idUlaz = :id")
    Ulaz findChildByIdWithParent(@Param("id") Integer id);

}
