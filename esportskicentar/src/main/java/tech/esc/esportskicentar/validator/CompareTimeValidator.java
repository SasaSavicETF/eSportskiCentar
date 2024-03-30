package tech.esc.esportskicentar.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import tech.esc.esportskicentar.annotation.CompareTime;

import java.lang.reflect.Field;
import java.sql.Time;

public class CompareTimeValidator implements ConstraintValidator<CompareTime, Object> {

    private String beforeField;
    private String afterField;

    @Override
    public void initialize(CompareTime constraintAnnotation) {
        beforeField = constraintAnnotation.before();
        afterField = constraintAnnotation.after();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {
        try {
            final Field beforeTimeField = value.getClass().getDeclaredField(beforeField);
            beforeTimeField.setAccessible(true);

            final Field afterTimeField = value.getClass().getDeclaredField(afterField);
            afterTimeField.setAccessible(true);

            final Time beforeTime = (Time) beforeTimeField.get(value);
            final Time afterTime = (Time) afterTimeField.get(value);
            if(beforeTime == null && afterTime == null)
                return false;
            return beforeTime != null && beforeTime.before(afterTime);
        } catch (final Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
