package tech.esc.esportskicentar.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustomError {
    private int status;
    private String error;
    private String message;
    private String path = "/error";

    public CustomError(int status, String error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
    }
}
