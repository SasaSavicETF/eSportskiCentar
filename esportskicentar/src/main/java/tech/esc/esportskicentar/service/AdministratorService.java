package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.PaswordHasher;
import tech.esc.esportskicentar.model.Administrator;
import tech.esc.esportskicentar.repository.AdministratorRepository;

import java.util.List;

@Service
@Transactional
public class AdministratorService {

    private final AdministratorRepository administratorRepository;

    private final PaswordHasher paswordHasher;

    @Autowired
    public AdministratorService(AdministratorRepository administratorRepository, PaswordHasher paswordHasher){
        this.administratorRepository = administratorRepository;
        this.paswordHasher = paswordHasher;
    }

    public List<Administrator> findAllAdministrators() {
        return administratorRepository.findAll();
    }

    public Administrator findAdministratorById(Integer id){
        return administratorRepository.findById(id).orElse(null);
    }

    public Administrator addAdministrator(Administrator administrator){
        administrator.setLozinka(paswordHasher.hashPassword(administrator.getLozinka()));
        System.out.println("Hashed password: " + administrator.getLozinka());
        return administratorRepository.save(administrator);
    }

    public Administrator updateAdministrator(Integer id, Administrator administrator){
        Administrator stariAdministrator = administratorRepository.findById(id).orElse(null);
        if(stariAdministrator == null || id != administrator.getIdAdministrator())
            return null;
        else {
            administrator.setLozinka(paswordHasher.hashPassword(administrator.getLozinka()));
            return administratorRepository.save(administrator);
        }
    }

    public void deleteAdministrator(Integer id){
        administratorRepository.deleteById(id);
    }


}
