package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Zadatak;
import tech.esc.esportskicentar.repository.ZadatakRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ZadatakService {

    private final ZadatakRepository zadatakRepository;

    @Autowired
    public ZadatakService(ZadatakRepository zadatakRepository){
        this.zadatakRepository = zadatakRepository;
    }
    public List<Zadatak> findAllZadataks(){
        return zadatakRepository.findAll();
    }

    public Zadatak findZadatakById(Integer id){
        return zadatakRepository.findById(id).orElse(null);
    }

    public Zadatak addZadatak(Zadatak zadatak){
        return  zadatakRepository.save(zadatak);
    }

    public Zadatak updateZadatak(Zadatak zadatak){
        Zadatak stariZadatak = zadatakRepository.findById(zadatak.getIdZadatak()).orElse(null);
        if(stariZadatak == null)
            return null;
        else
            return  zadatakRepository.save(zadatak);
    }

    public boolean deleteZadatak(Integer id){
        Optional<Zadatak> zadatak = zadatakRepository.findById(id);
        if(zadatak.isEmpty())
            return false;
        else {
            zadatakRepository.deleteById(id);
            return true;
        }
    }
}
