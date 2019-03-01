package smm.agency.infra;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.bots.DefaultBotOptions;
import org.telegram.telegrambots.meta.ApiContext;

import java.net.Authenticator;
import java.net.PasswordAuthentication;

@Configuration
@Slf4j
public class BotOptionsConfiguration {

    @Bean
    public DefaultBotOptions botOptionsWithProxy(@Value("${proxy.host}") String proxyHost,
                                                 @Value("${proxy.port}") int proxyPort,
                                                 @Value("${proxy.login}") String proxyLogin,
                                                 @Value("${proxy.password}") String proxyPassword) {

        Authenticator.setDefault(new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(proxyLogin, proxyPassword.toCharArray());
            }
        });

        DefaultBotOptions botOptions = ApiContext.getInstance(DefaultBotOptions.class);

        botOptions.setProxyHost(proxyHost);
        botOptions.setProxyPort(proxyPort);
        botOptions.setProxyType(DefaultBotOptions.ProxyType.SOCKS5);

        return botOptions;
    }
}
