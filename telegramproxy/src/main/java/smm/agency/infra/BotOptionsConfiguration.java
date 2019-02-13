package smm.agency.infra;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.bots.DefaultBotOptions;
import org.telegram.telegrambots.meta.ApiContext;

@Configuration
@Slf4j
public class BotOptionsConfiguration {

    @Bean
    public DefaultBotOptions botOptionsWithProxy(@Value("${proxy.host}") String proxyHost,
                                                 @Value("${proxy.port}") int proxyPort) {
        DefaultBotOptions botOptions = ApiContext.getInstance(DefaultBotOptions.class);

        botOptions.setProxyHost(proxyHost);
        botOptions.setProxyPort(proxyPort);
        botOptions.setProxyType(DefaultBotOptions.ProxyType.HTTP);

        return botOptions;
    }
}
