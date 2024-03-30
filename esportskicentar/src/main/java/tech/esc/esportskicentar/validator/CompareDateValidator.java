package tech.esc.esportskicentar.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import tech.esc.esportskicentar.annotation.CompareDate;

import java.lang.reflect.Field;
import java.sql.Date;

public class CompareDateValidator implements ConstraintValidator<CompareDate, Object> {
    private String beforeField;
    private String afterField;

    @Override
    public void initialize(CompareDate constraintAnnotation) {
        beforeField = constraintAnnotation.before();
        afterField = constraintAnnotation.after();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext constraintValidatorContext) {
        try {
            final Field beforeDateField = value.getClass().getDeclaredField(beforeField);
            beforeDateField.setAccessible(true);

            final Field afterDateField = value.getClass().getDeclaredField(afterField);
            afterDateField.setAccessible(true);

            final Date beforeDate = (Date) beforeDateField.get(value);
            final Date afterDate = (Date) afterDateField.get(value);
            if(beforeDate != null && afterDate == null)
                return true;
            return beforeDate != null && beforeDate.before(afterDate);
        } catch (final Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
