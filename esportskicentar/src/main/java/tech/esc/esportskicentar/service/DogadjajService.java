package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Cjenovnik;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.repository.CjenovnikRepository;
import tech.esc.esportskicentar.repository.DogadjajRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class DogadjajService {

    private final DogadjajRepository dogadjajRepository;
    private final CjenovnikRepository cjenovnikRepository;

    @Autowired
    public DogadjajService(DogadjajRepository dogadjajRepository, CjenovnikRepository cjenovnikRepository)
    {
        this.dogadjajRepository = dogadjajRepository;
        this.cjenovnikRepository = cjenovnikRepository;
    }

    public List<Dogadjaj> findAllDogadjajs(){
        return dogadjajRepository.findAll();
    }

    public Dogadjaj findDogadjajById(Integer id){
        return dogadjajRepository.findById(id).orElse(null);
    }

    public Dogadjaj addDogadjaj(Dogadjaj dogadjaj)
    {
        List<Cjenovnik> cjenovnici = cjenovnikRepository.findAll();
        long vrijemeOdMillis = dogadjaj.getVrijemeOd().getTime();
        long vrijemeDoMillis = dogadjaj.getVrijemeDo().getTime();

        long diffMillis = vrijemeDoMillis - vrijemeOdMillis;
        double diffHours = 0.0;
        double cijena = 0.0;

        for(Cjenovnik c : cjenovnici)
        {
            if(c.getTeren().getIdTeren() == dogadjaj.getTeren().getIdTeren())
            {
                if((dogadjaj.getVrijemeOd().compareTo(c.getVrijemeOd()) > 0 && dogadjaj.getVrijemeOd().compareTo(c.getVrijemeDo()) < 0) &&
                        (dogadjaj.getVrijemeDo().compareTo(c.getVrijemeOd()) > 0 && dogadjaj.getVrijemeDo().compareTo(c.getVrijemeDo()) < 0))
                {

                    diffHours = ((double)diffMillis) / 3600000.0D;
                    cijena = diffHours * c.getCijena().doubleValue();
                }
                else if((dogadjaj.getVrijemeOd().compareTo(c.getVrijemeOd()) > 0 && dogadjaj.getVrijemeOd().compareTo(c.getVrijemeDo()) < 0) &&
                        (dogadjaj.getVrijemeDo().compareTo(c.getVrijemeDo()) > 0))
                {
                    boolean first = true;
                    boolean rad = false;
                    for(Cjenovnik temp : cjenovnici)
                    {
                        if((dogadjaj.getVrijemeOd().compareTo(temp.getVrijemeOd()) > 0 && dogadjaj.getVrijemeOd().compareTo(temp.getVrijemeDo()) < 0)){
                           rad = true;
                        }
                        if(rad)
                        {
                            if(first)
                            {
                                diffMillis = temp.getVrijemeDo().getTime() - vrijemeOdMillis;
                                diffHours = ((double)diffMillis) / 3600000.0D;
                                cijena += diffHours * temp.getCijena().doubleValue();
                                //System.out.println("1." + cijena);
                                first = false;
                            }
                            else if(!first && dogadjaj.getVrijemeDo().compareTo(temp.getVrijemeDo()) > 0)
                            {
                                diffMillis = temp.getVrijemeDo().getTime() - temp.getVrijemeOd().getTime();
                                diffHours = ((double)diffMillis) / 3600000.0D;
                                cijena += diffHours * temp.getCijena().doubleValue();
                                //System.out.println("2." + cijena);
                            }
                            else if(!first && dogadjaj.getVrijemeDo().compareTo(temp.getVrijemeDo()) < 0)
                            {
                                diffMillis = dogadjaj.getVrijemeDo().getTime() - temp.getVrijemeOd().getTime();
                                diffHours = ((double)diffMillis) / 3600000.0D;
                                cijena += diffHours * temp.getCijena().doubleValue();
                                //System.out.println("3." + cijena);
                                break;
                            }
                        }
                    }
                }
            }
        }
        dogadjaj.setCijena(BigDecimal.valueOf(cijena));
        //System.out.println(cijena);
        return dogadjajRepository.save(dogadjaj);
    }

    public Dogadjaj updateDogadjaj(Integer id, Dogadjaj dogadjaj){
        Dogadjaj stariDogadjaj = dogadjajRepository.findById(id).orElse(null);
        if(stariDogadjaj == null || id != dogadjaj.getIdDogadjaj())
            return null;
        else
            return dogadjajRepository.save(dogadjaj);
    }

    public void deleteDogadjaj(Integer id){
        dogadjajRepository.deleteById(id);
    }
}
