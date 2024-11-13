package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.esc.esportskicentar.model.Transakcija;

/**
 * @author milan
 * @created 11/13/2024 11:25 AM
 * @project esportskicentar
 */
public interface TransakcijaRepository extends JpaRepository<Transakcija, Integer> {
}
