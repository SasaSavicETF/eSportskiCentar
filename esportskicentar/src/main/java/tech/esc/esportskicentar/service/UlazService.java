package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Ulaz;
import tech.esc.esportskicentar.repository.DvoranaRepository;
import tech.esc.esportskicentar.repository.UlazRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UlazService {
    private final UlazRepository ulazRepository;
    private final DvoranaRepository dvoranaRepository;

    @Autowired
    public UlazService(UlazRepository ulazRepository, DvoranaRepository dvoranaRepository){
        this.ulazRepository=ulazRepository;
        this.dvoranaRepository = dvoranaRepository;
    }

    public List<Ulaz> getAllUlaz(){
        return ulazRepository.findAll();
    }

    public Ulaz getUlazById(Integer id){
        return ulazRepository.findById(id)
                .orElse(null);
    }

    public Ulaz createUlaz(Ulaz ulaz) {
        ulaz.setDvorana(dvoranaRepository.findById(ulaz.getDvorana().getIdDvorana()).orElse(null));
        return ulazRepository.save(ulaz);
    }

    public Ulaz updateUlaz(Ulaz newUlaz) {
        Ulaz ulaz = ulazRepository.findById(newUlaz.getIdUlaz())
                .orElse(null);
        if (ulaz == null)
            return null;

        if (newUlaz.getNazivUlaza() != null)
            ulaz.setNazivUlaza(newUlaz.getNazivUlaza());
        if (newUlaz.getBrojUlaza() != null)
            ulaz.setBrojUlaza(newUlaz.getBrojUlaza());
        ulaz.setDostupan(newUlaz.isDostupan());
        if (newUlaz.getDvorana() != null)
            ulaz.setDvorana(dvoranaRepository.findById(newUlaz.getDvorana().getIdDvorana())
                    .orElse(null));

        return ulazRepository.save(ulaz);
    }

    public boolean deleteUlaz(Integer id) {
        Optional<Ulaz> ulaz = ulazRepository.findById(id);
        if (ulaz.isEmpty())
            return false;
        else{
            ulazRepository.deleteById(id);
            return true;
        }
    }

    public Ulaz findParent(Integer id) {
        return ulazRepository.findChildByIdWithParent(id);
    }

    public List<Ulaz> findUlazsByDvorana(Integer idD)
    {
        return ulazRepository.findUlazsByDvorana(idD);
    }
}
