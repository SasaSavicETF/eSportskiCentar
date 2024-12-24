package tech.esc.esportskicentar.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.model.Inventar;
import tech.esc.esportskicentar.model.PrihodiRashodiStatsDTO;
import tech.esc.esportskicentar.model.Transakcija;
import tech.esc.esportskicentar.repository.TransakcijaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * @author milan
 * @created 11/13/2024 11:26 AM
 * @project esportskicentar
 */

@Service
@Transactional
public class TransakcijaService
{
    private final TransakcijaRepository transakcijaRepository;

    @Autowired
    public TransakcijaService(TransakcijaRepository transakcijaRepository)
    {
        this.transakcijaRepository = transakcijaRepository;
    }

    public List<Transakcija> getAllTransakcijas()
    {
        return transakcijaRepository.findAll();
    }

    public Transakcija getTransakcijaById(Integer id)
    {
        return transakcijaRepository.findById(id).orElse(null);
    }

    public Transakcija createTransakcija(Transakcija transakcija)
    {
        return transakcijaRepository.save(transakcija);
    }

    public Transakcija updateTransakcija(Transakcija newTransakcija) {
        Transakcija transakcija = transakcijaRepository.findById(newTransakcija.getIdTransakcija())
                .orElse(null);
        if (transakcija == null)
            return null;

        if (newTransakcija.getSvrhaDoznake() != null)
            transakcija.setSvrhaDoznake(newTransakcija.getSvrhaDoznake());
        if (newTransakcija.getIznos() != null)
            transakcija.setIznos(newTransakcija.getIznos());

        transakcija.setPrihod(newTransakcija.isPrihod());

        return transakcijaRepository.save(transakcija);
    }

    public boolean deleteTransakcija(Integer id) {
        Optional<Transakcija> transakcija = transakcijaRepository.findById(id);
        if (transakcija.isEmpty())
            return false;
        else{
            transakcijaRepository.deleteById(id);
            return true;
        }
    }

    public PrihodiRashodiStatsDTO getFinancialOverview() {
        PrihodiRashodiStatsDTO prihodiRashodiStatsDTO = new PrihodiRashodiStatsDTO();

        BigDecimal prihod = transakcijaRepository.sumTransakcijaByPrihod();
        BigDecimal rashod = transakcijaRepository.sumTransakcijaByRashod();

        prihodiRashodiStatsDTO.setPrihodi(prihod);
        prihodiRashodiStatsDTO.setRashodi(rashod);

        return prihodiRashodiStatsDTO;
    }
}
