package tech.esc.esportskicentar.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import tech.esc.esportskicentar.validator.CompareTimeValidator;
import tech.esc.esportskicentar.validator.PhoneNumberValidator;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Constraint(validatedBy = PhoneNumberValidator.class)
@Target({FIELD,METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ValidPhoneNumber {
    String message() default "Broj telefona nije validan!";
    Class <?> [] groups() default {};
    Class <? extends Payload> [] payload() default {};
}
