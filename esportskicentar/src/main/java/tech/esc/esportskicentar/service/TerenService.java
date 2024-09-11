package tech.esc.esportskicentar.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import tech.esc.esportskicentar.model.Teren;
import tech.esc.esportskicentar.repository.DvoranaRepository;
import tech.esc.esportskicentar.repository.TerenRepository;
import tech.esc.esportskicentar.repository.TipTerenaRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TerenService {
    @Value("${upload.path}")
    private String uploadPath;
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

    public Teren createTeren(String terenJson, MultipartFile image) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Teren teren = objectMapper.readValue(terenJson, Teren.class);
        if (image != null && !image.isEmpty()) {
            Path filePath = Paths.get(System.getProperty("user.dir")+ File.separator + uploadPath + File.separator
                    + teren.getSlika());
            Files.write(filePath, image.getBytes());
            teren.setSlika("http://localhost:8080/pictures/" + teren.getSlika());
        }

        return terenRepository.save(teren);
    }

    public Teren updateTeren(Teren newTeren) {
        Teren teren = terenRepository.findById(newTeren.getIdTeren())
                .orElse(null);
        if (teren == null)
            return null;

        if (newTeren.getNazivTerena() != null)
            teren.setNazivTerena(newTeren.getNazivTerena());
        if (newTeren.getSlika() != null)
            teren.setSlika(newTeren.getSlika());
        if (newTeren.getInfo() != null)
            teren.setInfo(newTeren.getInfo());
        if (newTeren.getDuzina() != null)
            teren.setDuzina(newTeren.getDuzina());
        if (newTeren.getSirina() != null)
            teren.setSirina(newTeren.getSirina());
        teren.setDostupan(newTeren.isDostupan());
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
