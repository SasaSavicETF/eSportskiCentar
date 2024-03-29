package tech.esc.esportskicentar.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.model.Takmicenje;
import tech.esc.esportskicentar.repository.TakmicenjeRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TakmicenjeService {
    private final TakmicenjeRepository takmicenjeRepository;
    @Autowired
    public TakmicenjeService(TakmicenjeRepository takmicenjeRepository) {
        this.takmicenjeRepository = takmicenjeRepository;
    }

    public List<Takmicenje> getAllTakmicenja(){
        return takmicenjeRepository.findAll();
    }

    public Takmicenje getTakmicenjeById(Integer id){
        return takmicenjeRepository.findById(id)
                .orElse(null);
    }

    public Takmicenje createTakmicenje(Takmicenje takmicenje) {
        return takmicenjeRepository.save(takmicenje);
    }

    public Takmicenje updateTakmicenje(Takmicenje newTakmicenje, Integer id) {
        Takmicenje takmicenje = takmicenjeRepository.findById(id)
                .orElse(null);
        if (takmicenje == null)
            return null;

        if (newTakmicenje.getVrstaTakmicenja() != null)
            takmicenje.setVrstaTakmicenja(newTakmicenje.getVrstaTakmicenja());

        return takmicenjeRepository.save(takmicenje);
    }

    public boolean deleteTakmicenje(Integer id) {
        Optional<Takmicenje> takmicenje = takmicenjeRepository.findById(id);
        if (takmicenje.isEmpty())
            return false;
        else{
            takmicenjeRepository.deleteById(id);
            return true;
        }
    }

}
