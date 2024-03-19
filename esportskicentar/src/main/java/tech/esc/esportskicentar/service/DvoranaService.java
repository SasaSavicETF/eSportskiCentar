package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.DvoranaResource;
import tech.esc.esportskicentar.exception.UserNotFoundException;
import tech.esc.esportskicentar.model.Dvorana;
import tech.esc.esportskicentar.repository.DvoranaRepository;

import java.util.List;

@Service
@Transactional
public class DvoranaService
{
    private final DvoranaRepository dvoranaRepository;

    @Autowired
    public DvoranaService(DvoranaRepository dvoranaRepository)
    {
        this.dvoranaRepository = dvoranaRepository;
    }

    public List<Dvorana> findAllDvoranas()
    {
        return dvoranaRepository.findAll();
    }

    public Dvorana addDvorana(Dvorana dvorana)
    {
        return dvoranaRepository.save(dvorana);
    }

    public Dvorana updateDvorana(Dvorana dvorana)
    {
        return dvoranaRepository.save(dvorana);
    }

    public Dvorana findDvoranaById(Integer id)
    {
        return dvoranaRepository.findDvoranaByIdDvorana(id).orElseThrow(() -> new UserNotFoundException("Dvorana by id " + id + " was not found"));
    }

    public void deleteDvorana(Integer id)
    {
        dvoranaRepository.deleteDvoranaByIdDvorana(id);
    }
}
