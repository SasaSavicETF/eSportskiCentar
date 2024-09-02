package tech.esc.esportskicentar.service;

import jakarta.validation.constraints.NotBlank;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.mail.javamail.JavaMailSender;

@Service
@Transactional
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendEmail(String userEmail, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userEmail);
        mailMessage.setSubject("ESportskiCentar");
        mailMessage.setText(message);

        javaMailSender.send(mailMessage);
    }

    public record EmailRequest(
            @NotBlank
            String userEmail,
            @NotBlank
            String message)
    {}
}
