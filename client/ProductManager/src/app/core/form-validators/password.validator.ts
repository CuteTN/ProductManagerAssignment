import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

interface PasswordValidationErrors {
  invalidPassword: {
    type:
      | 'null'
      | 'too-short'
      | 'no-digit'
      | 'no-lowercase'
      | 'no-uppercase'
      | 'no-non-alphanumeric';
    message: string;
  };
}

const PASSWORD_MIN_LENGTH = 6;

const PASSWORD_VALIDATING_REGEXES = {
  lowercases: /[a-z]/,
  uppercases: /[A-Z]/,
  digits: /[0-9]/,
  nonalphanumerics: /[~!@#\$%^&\*\(\)\-\+=\?\/<>\|\[\]{}_ :;\.,\\`]/,
};

export function passwordValidator(
  control: AbstractControl
): PasswordValidationErrors | null {
  const password = control.value as string;

  if (!password)
    return {
      invalidPassword: {
        type: 'null',
        message: 'Password is required.',
      },
    };

  if (password.length < PASSWORD_MIN_LENGTH)
    return {
      invalidPassword: {
        type: 'too-short',
        message: `Password must have at least ${PASSWORD_MIN_LENGTH} characters.`,
      },
    };

  if (!PASSWORD_VALIDATING_REGEXES.digits.test(password))
    return {
      invalidPassword: {
        type: 'no-digit',
        message: 'Password must have at least one digit.',
      },
    };

  if (!PASSWORD_VALIDATING_REGEXES.lowercases.test(password))
    return {
      invalidPassword: {
        type: 'no-lowercase',
        message: 'Password must have at least one lowercase letter.',
      },
    };

  if (!PASSWORD_VALIDATING_REGEXES.uppercases.test(password))
    return {
      invalidPassword: {
        type: 'no-uppercase',
        message: 'Password must have at least one uppercase letter.',
      },
    };

  if (!PASSWORD_VALIDATING_REGEXES.nonalphanumerics.test(password))
    return {
      invalidPassword: {
        type: 'no-non-alphanumeric',
        message: 'Password must have at least one non-alphanumeric character.',
      },
    };

  return null;
}
