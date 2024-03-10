package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Grad;

import java.util.Optional;

@Repository
public interface GradRepository extends JpaRepository<Grad, Integer>
{
    void deleteGradByIdGrad(Integer id);

    Optional<Grad> findGradByIdGrad(Integer id);
}
