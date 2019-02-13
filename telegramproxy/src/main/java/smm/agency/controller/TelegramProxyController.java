package smm.agency.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import smm.agency.model.SendMessageRequest;
import smm.agency.service.TelegramBotService;

@RestController
@Api(value = "InfoSender", description = "Sending info about SMM client", tags = { "RequestSender" })
public class TelegramProxyController {
    private TelegramBotService bot;

    @Autowired
    public TelegramProxyController(TelegramBotService bot) {
        this.bot = bot;
    }

    @PostMapping("/send-info/telegram")
    @ApiOperation(
            value = "Sending message to telegram",
            notes = "Final message that will be sent to telegram: \n\"Phone: +79001221111\nFullname: Сергеенко Петрушка Максимович\"")
    public void sendToTelegram(@RequestBody SendMessageRequest sendMessageRequest) {
        bot.sendMessage(sendMessageRequest);
    }

}