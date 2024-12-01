package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Dvorana;

import java.util.Optional;


@Repository
public interface DvoranaRepository extends JpaRepository<Dvorana, Integer>
{
    void deleteDvoranaByIdDvorana(Integer id);

    Optional<Dvorana> findDvoranaByIdDvorana(Integer id);

    @Query("SELECT COUNT(d) FROM Dvorana d")
    int countDvoranas();

    Optional<Dvorana> findByNazivDvorane(String dvoranaName);
}
