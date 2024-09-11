package tech.esc.esportskicentar.service;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.PaswordHasher;
import tech.esc.esportskicentar.exception.AccountStatusException;
import tech.esc.esportskicentar.exception.BadCredentialsException;
import tech.esc.esportskicentar.exception.UsernameAlreadyExistsException;
import tech.esc.esportskicentar.model.*;
import tech.esc.esportskicentar.repository.AdministratorRepository;
import tech.esc.esportskicentar.repository.DezurniRadnikRepository;
import tech.esc.esportskicentar.repository.KlijentRepository;
import tech.esc.esportskicentar.repository.UpravnikRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class KlijentService {
    private final KlijentRepository klijentRepository;
    private final AdministratorRepository administratorRepository;
    private final DezurniRadnikRepository dezurniRadnikRepository;
    private final UpravnikRepository upravnikRepository;
    private final PaswordHasher paswordHasher;

    @Autowired
    public KlijentService(KlijentRepository klijentRepository, AdministratorRepository administratorRepository,
                          DezurniRadnikRepository dezurniRadnikRepository,
                          UpravnikRepository upravnikRepository, PaswordHasher paswordHasher) {
        this.klijentRepository = klijentRepository;
        this.administratorRepository = administratorRepository;
        this.dezurniRadnikRepository = dezurniRadnikRepository;
        this.upravnikRepository = upravnikRepository;
        this.paswordHasher = paswordHasher;
    }

    public List<Klijent> getAllKlijents(){
        return klijentRepository.findAll();
    }

    public Klijent getKlijentById(Integer id){
        return klijentRepository.findById(id)
                .orElse(null);
    }

    public void registerKlijent(Klijent klijent) {
        if (this.klijentRepository.existsByKorisnickoIme(klijent.getKorisnickoIme())
                || administratorRepository.existsByKorisnickoIme(klijent.getKorisnickoIme()))
            throw new UsernameAlreadyExistsException("Username: " + klijent.getKorisnickoIme() + " is already taken!");

        klijent.setLozinka(paswordHasher.hashPassword(klijent.getLozinka()));
        klijentRepository.save(klijent);
    }

    public UserDTO loginKlijent(LoginRequest loginRequest) {
        Klijent klijent = klijentRepository.findByKorisnickoImeAndLozinka(
                        loginRequest.username(), paswordHasher.hashPassword(loginRequest.password))
                        .orElse(null);
        if (klijent != null && klijent.isBlokiran())
            throw new AccountStatusException("Vaš nalog je blokiran!");
        if (klijent != null)
            return convertKlijentToDTO(klijent);

        Administrator admin = administratorRepository.findByKorisnickoImeAndLozinka(
                        loginRequest.username(), paswordHasher.hashPassword(loginRequest.password))
                .orElse(null);
        if (admin != null)
            return convertAdminToDTO(admin);

        DezurniRadnik radnik = dezurniRadnikRepository.findByKorisnickoImeAndLozinka(
                        loginRequest.username(), paswordHasher.hashPassword(loginRequest.password))
                .orElse(null);
        if (radnik != null && radnik.isBlokiran())
            throw new AccountStatusException("Vaš nalog je blokiran!");
        if (radnik != null)
            return convertRadnikToDTO(radnik);

        Upravnik upravnik = upravnikRepository.findByKorisnickoImeAndLozinka(
                        loginRequest.username(), paswordHasher.hashPassword(loginRequest.password))
                .orElse(null);
        if (upravnik != null && upravnik.isBlokiran())
            throw new AccountStatusException("Vaš nalog je blokiran!");
        if (upravnik != null)
            return convertUpravnikToDTO(upravnik);

        throw new BadCredentialsException();
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

    public int getNumberOfKlijents() {
        return klijentRepository.countKlijents();
    }

    public record LoginRequest(
            @NotBlank
            String username,
            @NotBlank
            String password)
    {}

    public record UserDTO(
            @NotNull
            int id,
            @NotBlank
            String ime,
            @NotBlank
            String prezime,
            @NotBlank
            String brojTelefona,
            @NotBlank
            String korisnickoIme,
            @NotBlank
            String lozinka,
            @NotBlank
            String email,
            @NotBlank
            String role,
            boolean blokiran,
            Dvorana dvorana)
    {}

    private UserDTO convertKlijentToDTO(Klijent klijent) {
        return new UserDTO(
                klijent.getIdKlijent(),
                klijent.getIme(),
                klijent.getPrezime(),
                klijent.getBrojTelefona(),
                klijent.getKorisnickoIme(),
                klijent.getLozinka(),
                klijent.getEmail(),
                "user",
                klijent.isBlokiran(),
                null
        );
    }

    private UserDTO convertAdminToDTO(Administrator admin) {
        return new UserDTO(
                admin.getIdAdministrator(),
                admin.getIme(),
                admin.getPrezime(),
                admin.getBrojTelefona(),
                admin.getKorisnickoIme(),
                admin.getLozinka(),
                admin.getEmail(),
                "admin",
                false,
                null
        );
    }

    private UserDTO convertRadnikToDTO(DezurniRadnik radnik) {
        return new UserDTO(
                radnik.getIdDezurniRadnik(),
                radnik.getIme(),
                radnik.getPrezime(),
                radnik.getBrojTelefona(),
                radnik.getKorisnickoIme(),
                radnik.getLozinka(),
                radnik.getEmail(),
                "radnik",
                radnik.isBlokiran(),
                null
        );
    }

    private UserDTO convertUpravnikToDTO(Upravnik upravnik) {
        return new UserDTO(
                upravnik.getIdUpravnik(),
                upravnik.getIme(),
                upravnik.getPrezime(),
                upravnik.getBrojTelefona(),
                upravnik.getKorisnickoIme(),
                upravnik.getLozinka(),
                upravnik.getEmail(),
                "upravnik",
                upravnik.isBlokiran(),
                upravnik.getDvorana()
        );
    }

}
