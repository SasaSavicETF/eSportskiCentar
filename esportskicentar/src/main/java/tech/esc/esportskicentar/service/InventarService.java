package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Inventar;
import tech.esc.esportskicentar.model.Teren;
import tech.esc.esportskicentar.repository.DvoranaRepository;
import tech.esc.esportskicentar.repository.InventarRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InventarService {

    private final InventarRepository inventarRepository;
    private final DvoranaRepository dvoranaRepository;

    @Autowired
    public InventarService(InventarRepository inventarRepository, DvoranaRepository dvoranaRepository) {
        this.inventarRepository = inventarRepository;
        this.dvoranaRepository = dvoranaRepository;
    }

    public List<Inventar> getAllInventars(){
        return inventarRepository.findAll();
    }

    public Inventar getInventarById(Integer id){
        return inventarRepository.findById(id)
                .orElse(null);
    }

    public Inventar createInventar(Inventar inventar) {
        inventar.setDvorana(dvoranaRepository.findById(inventar.getDvorana().getIdDvorana()).orElse(null));
        return inventarRepository.save(inventar);
    }

    public Inventar updateInventar(Inventar newInventar, Integer id) {
        Inventar inventar = inventarRepository.findById(id)
                .orElse(null);
        if (inventar == null)
            return null;

        if (newInventar.getNaziv() != null)
            inventar.setNaziv(newInventar.getNaziv());
        if (newInventar.getOpis() != null)
            inventar.setOpis(newInventar.getOpis());
        if (newInventar.getDvorana() != null)
            inventar.setDvorana(dvoranaRepository.findById(newInventar.getDvorana().getIdDvorana())
                    .orElse(null));

        return inventarRepository.save(inventar);
    }

    public boolean deleteInventar(Integer id) {
        Optional<Inventar> inventar = inventarRepository.findById(id);
        if (inventar.isEmpty())
            return false;
        else{
            inventarRepository.deleteById(id);
            return true;
        }
    }

}
