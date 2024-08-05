package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.exception.UserNotFoundException;
import tech.esc.esportskicentar.model.Grad;
import tech.esc.esportskicentar.repository.GradRepository;

import java.util.List;

@Service
@Transactional
public class GradService
{
    private final GradRepository gradRepository;

    @Autowired
    public GradService(GradRepository gradRepository)
    {
        this.gradRepository = gradRepository;
    }

    public Grad addGrad(Grad grad)
    {
        return gradRepository.save(grad);
    }

    public List<Grad> findAllGrads()
    {
        return  gradRepository.findAll();
    }

    public Grad updateGrad(Grad grad)
    {
        Grad stariGrad = gradRepository.findGradByIdGrad(grad.getIdGrad()).orElse(null);
        if(stariGrad == null || grad.getIdGrad() != grad.getIdGrad())
            return null;
        else
            return gradRepository.save(grad);
    }

    public Grad findGradById(Integer id)
    {
        return gradRepository.findGradByIdGrad(id).orElseThrow(() -> new UserNotFoundException("Grad by id " + id + " was not found"));
    }
    public void deleteGrad(Integer id)
    {
        gradRepository.deleteGradByIdGrad(id);
    }
}
