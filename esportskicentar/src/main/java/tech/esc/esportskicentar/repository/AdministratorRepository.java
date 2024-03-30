package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Administrator;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {
}
