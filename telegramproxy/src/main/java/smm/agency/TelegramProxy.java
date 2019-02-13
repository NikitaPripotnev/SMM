package smm.agency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.telegram.telegrambots.ApiContextInitializer;

@SpringBootApplication
public class TelegramProxy {

    public static void main(String[] args) {
        ApiContextInitializer.init();
        SpringApplication.run(TelegramProxy.class, args);
    }

}
