package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Administrator;
import tech.esc.esportskicentar.repository.AdministratorRepository;

import java.util.List;

@Service
@Transactional
public class AdministratorService {

    private final AdministratorRepository administratorRepository;

    @Autowired
    public AdministratorService(AdministratorRepository administratorRepository){
        this.administratorRepository = administratorRepository;
    }

    public List<Administrator> findAllAdministrators() {
        return administratorRepository.findAll();
    }

    public Administrator findAdministratorById(Integer id){
        return administratorRepository.findById(id).orElse(null);
    }

    public Administrator addAdministrator(Administrator administrator){
        return administratorRepository.save(administrator);
    }

    public Administrator updateAdministrator(Integer id, Administrator administrator){
        Administrator stariAdministrator = administratorRepository.findById(id).orElse(null);
        if(stariAdministrator == null || id != administrator.getIdAdministrator())
            return null;
        else
            return administratorRepository.save(administrator);
    }

    public void deleteAdministrator(Integer id){
        administratorRepository.deleteById(id);
    }


}
