package tech.esc.esportskicentar.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import tech.esc.esportskicentar.validator.CompareTimeValidator;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Constraint(validatedBy = CompareTimeValidator.class)
@Target({TYPE,FIELD,ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CompareTime {
    String message() default "Vremena nisu validna";
    Class <?> [] groups() default {};
    Class <? extends Payload> [] payload() default {};

    String before();
    String after();
}
