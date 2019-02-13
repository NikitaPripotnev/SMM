package smm.agency.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.DefaultBotOptions;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import smm.agency.model.SendMessageRequest;

@Slf4j
@Component
public class TelegramBotService extends TelegramLongPollingBot {
    private String token;
    private String username;
    private long chatId;

    @Autowired
    public TelegramBotService(DefaultBotOptions botOptionsWithProxy,
                              @Value("${bot.token}") String token,
                              @Value("${bot.username}") String username,
                              @Value("${receiver.chat-id}") long chatId) {

        super(botOptionsWithProxy);
        this.token = token;
        this.username = username;
        this.chatId = chatId;
    }


    @Override
    public String getBotToken() {
        return token;
    }

    @Override
    public void onUpdateReceived(Update update) {
        log.info("chatId: {}", update.getMessage().getChat().getId());
    }

    @Override
    public String getBotUsername() {
        return username;
    }


    public void sendMessage(SendMessageRequest sendMessageRequest) {
        SendMessage response = new SendMessage();

        response.setChatId(chatId);
        String text = String.format("Phone: %s\nFullname: %s\n", sendMessageRequest.getPhone(), sendMessageRequest.getFullname());
        response.setText(text);
        try {
            execute(response);
            log.info("Sent message \"{}\" to {}", text, chatId);
        } catch (TelegramApiException e) {
            log.error("Failed to send message \"{}\" to {} due to error: {}", text, chatId, e);
        }
    }
}
