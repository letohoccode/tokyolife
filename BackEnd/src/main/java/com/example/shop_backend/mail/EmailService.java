package com.example.shop_backend.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@EnableAsync
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine springTemplateEngine;

    @Async
    public void SendEmail(String to,
                          String UserName,
                          EmailTemplate emailTemplate,
                          String confirmUrl,
                          String Code,
                          String subject) throws MessagingException {
        String templateName;
        if(emailTemplate == null)
            templateName = "confirm-email";
        else
            templateName = emailTemplate.name();
        MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(
                mimeMailMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );
        Map<String,Object> properties = new HashMap<>();
        properties.put("username",UserName);
        properties.put("confirmUrl",confirmUrl);
        properties.put("code",Code);

        Context context = new Context();
        context.setVariables(properties);

        mimeMessageHelper.setFrom("lenguyento2k4@gmail.com");
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);

        String template = springTemplateEngine.process(templateName,context);

        mimeMessageHelper.setText(template,true);
        javaMailSender.send(mimeMailMessage);

    }

}
