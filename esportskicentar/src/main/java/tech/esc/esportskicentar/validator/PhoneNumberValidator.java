package tech.esc.esportskicentar.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import tech.esc.esportskicentar.annotation.ValidPhoneNumber;

import java.util.regex.Pattern;
public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {
    private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile("^0[0-9]{8}$");

    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext constraintValidatorContext) {
        if(phoneNumber == null)
            return true;
        return PHONE_NUMBER_PATTERN.matcher(phoneNumber).matches();
    }
}
