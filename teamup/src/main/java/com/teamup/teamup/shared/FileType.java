package com.teamup.teamup.shared;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { FileTypeValidator.class })
public @interface FileType {
	
	String message() default "{teamup.constraint.FileType.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
	
	String[] types();

}
