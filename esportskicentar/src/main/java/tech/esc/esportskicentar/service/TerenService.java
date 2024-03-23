package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Teren;
import tech.esc.esportskicentar.repository.DvoranaRepository;
import tech.esc.esportskicentar.repository.TerenRepository;
import tech.esc.esportskicentar.repository.TipTerenaRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TerenService {

    private final TerenRepository terenRepository;
    private final TipTerenaRepository tipTerenaRepository;
    private final DvoranaRepository dvoranaRepository;

    @Autowired
    public TerenService(TerenRepository terenRepository, TipTerenaRepository tipTerenaRepository, DvoranaRepository dvoranaRepository) {
        this.terenRepository = terenRepository;
        this.tipTerenaRepository = tipTerenaRepository;
        this.dvoranaRepository = dvoranaRepository;
    }

    public List<Teren> getAllTerens(){
        return terenRepository.findAll();
    }

    public Teren getTerenById(Integer id){
        return terenRepository.findById(id)
                .orElse(null);
    }

    public Teren createTeren(Teren teren) {
        teren.setDvorana(dvoranaRepository.findById(teren.getDvorana().getIdDvorana()).orElse(null));
        teren.setTipTerena(tipTerenaRepository.findById(teren.getTipTerena().getIdTipTerena()).orElse(null));
        return terenRepository.save(teren);
    }

    public Teren updateTeren(Teren newTeren, Integer id) {
        Teren teren = terenRepository.findById(id)
                .orElse(null);
        if (teren == null)
            return null;

        if (newTeren.getNazivTerena() != null)
            teren.setNazivTerena(newTeren.getNazivTerena());
        if (newTeren.getSlika() != null)
            teren.setSlika(newTeren.getSlika());
        if (newTeren.getInfo() != null)
            teren.setInfo(newTeren.getInfo());
        if (newTeren.getDvorana() != null)
            teren.setDvorana(dvoranaRepository.findById(newTeren.getDvorana().getIdDvorana())
                    .orElse(null));
        if (newTeren.getTipTerena() != null)
            teren.setTipTerena(tipTerenaRepository.findById(newTeren.getTipTerena().getIdTipTerena())
                    .orElse(null));

        return terenRepository.save(teren);
    }

    public boolean deleteTeren(Integer id) {
        Optional<Teren> teren = terenRepository.findById(id);
        if (teren.isEmpty())
            return false;
        else{
            terenRepository.deleteById(id);
            return true;
        }
    }

}
