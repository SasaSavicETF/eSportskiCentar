package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Cjenovnik;

import java.util.List;

@Repository
public interface CjenovnikRepository extends JpaRepository<Cjenovnik, Integer> {

    @Query("SELECT c FROM Cjenovnik c WHERE c.teren.idTeren = :terenId " +
            "ORDER BY c.vrijemeOd ASC")
    List<Cjenovnik> findByTerenId(Integer terenId);
}
