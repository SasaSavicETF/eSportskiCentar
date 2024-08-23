package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Svlacionica;
import tech.esc.esportskicentar.repository.DvoranaRepository;
import tech.esc.esportskicentar.repository.SvlacionicaRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SvlacionicaService {

    private final SvlacionicaRepository svlacionicaRepository;
    private final DvoranaRepository dvoranaRepository;

    @Autowired
    public SvlacionicaService(SvlacionicaRepository svlacionicaRepository, DvoranaRepository dvoranaRepository) {
        this.svlacionicaRepository = svlacionicaRepository;
        this.dvoranaRepository = dvoranaRepository;
    }

    public List<Svlacionica> getAllSvlacionicas(){
        return svlacionicaRepository.findAll();
    }

    public Svlacionica getSvlacionicaById(Integer id){
        return svlacionicaRepository.findById(id)
                .orElse(null);
    }

    public Svlacionica createSvlacionica(Svlacionica svlacionica) {
        svlacionica.setDvorana(dvoranaRepository.findById(svlacionica.getDvorana().getIdDvorana()).orElse(null));
        return svlacionicaRepository.save(svlacionica);
    }

    public Svlacionica updateSvlacionica(Svlacionica newSvlacionica) {
        Svlacionica svlacionica  = svlacionicaRepository.findById(newSvlacionica.getIdSvlacionica())
                .orElse(null);
        if (svlacionica == null)
            return null;

        if (newSvlacionica.getBrojSvlacionice() != null)
            svlacionica.setBrojSvlacionice(newSvlacionica.getBrojSvlacionice());
        if (newSvlacionica.getDvorana() != null)
            svlacionica.setDvorana(dvoranaRepository.findById(newSvlacionica.getDvorana().getIdDvorana())
                    .orElse(null));
        svlacionica.setDostupna(newSvlacionica.isDostupna());

        return svlacionicaRepository.save(svlacionica);
    }

    public boolean deleteSvlacionica(Integer id) {
        Optional<Svlacionica> svlacionica = svlacionicaRepository.findById(id);
        if (svlacionica.isEmpty())
            return false;
        else{
            svlacionicaRepository.deleteById(id);
            return true;
        }
    }

}
