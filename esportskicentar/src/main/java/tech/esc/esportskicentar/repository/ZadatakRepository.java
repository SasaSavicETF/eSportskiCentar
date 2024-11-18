package tech.esc.esportskicentar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.esc.esportskicentar.model.Zadatak;

import java.sql.Date;
import java.util.List;

@Repository
public interface ZadatakRepository extends JpaRepository<Zadatak, Integer> {
    List<Zadatak> findAllByUpravnikIdUpravnik(Integer userId);

    int countByUpravnikIdUpravnikAndZavrsenTrueAndDatumKreiranjaBetween(Integer userId, Date startDate, Date endDate);

    int countByUpravnikIdUpravnikAndZavrsenFalseAndDatumKreiranjaBetweenAndRokIzvrsenjaBefore(Integer userId, Date start, Date end, Date today);

    int countByUpravnikIdUpravnikAndZavrsenFalseAndDatumKreiranjaBetween(Integer userId, Date start, Date end);
}
