package smm.agency.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendMessageRequest {
    @ApiModelProperty(value = "User phone", example = "+79001221212")
    private String phone;
    @ApiModelProperty(value = "Full name", example = "Сергеенко Петрушка Максимович")
    private String fullname;
}
