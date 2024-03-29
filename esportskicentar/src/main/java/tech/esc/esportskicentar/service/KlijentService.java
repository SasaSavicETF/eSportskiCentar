package tech.esc.esportskicentar.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.model.Klijent;
import tech.esc.esportskicentar.repository.KlijentRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class KlijentService {
    private final KlijentRepository klijentRepository;

    @Autowired
    public KlijentService(KlijentRepository klijentRepository) {
        this.klijentRepository = klijentRepository;
    }

    public List<Klijent> getAllKlijents(){
        return klijentRepository.findAll();
    }

    public Klijent getKlijentById(Integer id){
        return klijentRepository.findById(id)
                .orElse(null);
    }

    public Klijent createKlijent(Klijent klijent) {
        return klijentRepository.save(klijent);
    }

    public Klijent updateKlijent(Klijent newKlijent, Integer id) {
        Klijent klijent = klijentRepository.findById(id)
                .orElse(null);
        if (klijent == null)
            return null;

        if (klijent.getIme() != null)
            klijent.setIme(newKlijent.getIme());
        if (newKlijent.getPrezime() != null)
            klijent.setPrezime(newKlijent.getPrezime());
        if (klijent.getBrojTelefona() != null)
            klijent.setBrojTelefona(newKlijent.getBrojTelefona());
        if (newKlijent.getKorisnickoIme() != null)
            klijent.setKorisnickoIme(newKlijent.getKorisnickoIme());
        if (klijent.getLozinka() != null)
            klijent.setLozinka(newKlijent.getLozinka());
        if (newKlijent.getEmail() != null)
            klijent.setEmail(newKlijent.getEmail());
        klijent.setBlokiran(newKlijent.isBlokiran());

        return klijentRepository.save(klijent);
    }

    public boolean deleteKlijent(Integer id) {
        Optional<Klijent> klijent = klijentRepository.findById(id);
        if (klijent.isEmpty())
            return false;
        else{
            klijentRepository.deleteById(id);
            return true;
        }
    }

}
