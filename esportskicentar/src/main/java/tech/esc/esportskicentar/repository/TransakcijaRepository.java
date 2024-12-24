package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.esc.esportskicentar.model.Transakcija;

import java.math.BigDecimal;

/**
 * @author milan
 * @created 11/13/2024 11:25 AM
 * @project esportskicentar
 */
public interface TransakcijaRepository extends JpaRepository<Transakcija, Integer> {

    @Query("SELECT SUM(t.iznos) FROM Transakcija t WHERE t.prihod = true")
    BigDecimal sumTransakcijaByPrihod();

    @Query("SELECT SUM(t.iznos) FROM Transakcija t WHERE t.prihod = false")
    BigDecimal sumTransakcijaByRashod();
}
