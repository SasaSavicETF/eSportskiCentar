package tech.esc.esportskicentar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UsernameAlreadyExistsException.class)
    public ResponseEntity<?> handleDuplicateUsername(UsernameAlreadyExistsException ex) {
        CustomError customError = new CustomError(
                HttpStatus.CONFLICT.value(),
                "Username already exists",
                ex.getMessage()
        );
        return new ResponseEntity<>(customError, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<?> handleBadcredentials(BadCredentialsException ex) {
        CustomError customError = new CustomError(
                HttpStatus.BAD_REQUEST.value(),
                "Bad credentials",
                "Uneseni kredencijali nisu validni!"
        );
        return new ResponseEntity<>(customError, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = AccountStatusException.class)
    public ResponseEntity<?> handleAccount(AccountStatusException ex) {
        CustomError customError = new CustomError(
                HttpStatus.BAD_REQUEST.value(),
                "Account suspended",
                ex.getMessage()
        );
        return new ResponseEntity<>(customError, HttpStatus.BAD_REQUEST);
    }

}
