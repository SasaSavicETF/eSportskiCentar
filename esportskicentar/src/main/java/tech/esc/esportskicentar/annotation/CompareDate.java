package tech.esc.esportskicentar.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import tech.esc.esportskicentar.validator.CompareDateValidator;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
@Constraint(validatedBy = CompareDateValidator.class)
@Target({TYPE,FIELD,ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CompareDate {
    String message() default "Datumi nisu validni!";
    Class <?> [] groups() default {};
    Class <? extends Payload> [] payload() default {};

    String before();
    String after();
}
