package org.example.clothes_shop_backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.example.clothes_shop_backend.email.EnumEmail;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

//    @Async
    public void senderEmail(
            String email,
            String name,
            EnumEmail enumEmail,
            String confirmationUrl,
            String token,
            String subject
    ) throws MessagingException
    {
        String template;
        if(enumEmail == null)
            template="confirm-email";
        else
            template = enumEmail.name();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
          mimeMessage,
          MimeMessageHelper.MULTIPART_MODE_MIXED,
          StandardCharsets.UTF_8.name()
        );

        Map<String,Object> properties = new HashMap<>();
        properties.put("username",name);
        properties.put("confirmUrl",confirmationUrl);
        properties.put("token",token);

        Context context = new Context();
        context.setVariables(properties);

        helper.setFrom("lenguyento2k4@gmail.com");
        helper.setTo(email);
        helper.setSubject(subject);
        String templateName = templateEngine.process(template,context);
        helper.setText(templateName,true);

        javaMailSender.send(mimeMessage);
    }
}
