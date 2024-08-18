package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.TipTerena;
import tech.esc.esportskicentar.repository.TipTerenaRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TipTerenaService {

    private final TipTerenaRepository tipTerenaRepository;

    @Autowired
    public TipTerenaService(tech.esc.esportskicentar.repository.TipTerenaRepository tipTerenaRepository) {
        this.tipTerenaRepository = tipTerenaRepository;
    }

    public List<TipTerena> getAllTipTerena(){
        return tipTerenaRepository.findAll();
    }

    public TipTerena getTipTerenaById(Integer id){
        return tipTerenaRepository.findById(id)
                .orElse(null);
    }

    public TipTerena createTipTerena(TipTerena tipTerena) {
        return tipTerenaRepository.save(tipTerena);
    }

    public TipTerena updateTipTerena(TipTerena newTipTerena) {
        TipTerena tipTerena = tipTerenaRepository.findById(newTipTerena.getIdTipTerena())
                .orElse(null);
        if (tipTerena == null)
            return null;

        if (newTipTerena.getNazivTipaTerena() != null)
            tipTerena.setNazivTipaTerena(newTipTerena.getNazivTipaTerena());
        if (newTipTerena.getInfo() != null)
            tipTerena.setInfo(newTipTerena.getInfo());

        return tipTerenaRepository.save(tipTerena);
    }

    public boolean deleteTipTerena(Integer id) {
        Optional<TipTerena> tipTerena = tipTerenaRepository.findById(id);
        if (tipTerena.isEmpty())
            return false;
        else{
            tipTerenaRepository.deleteById(id);
            return true;
        }
    }



}
