import { useI18n } from 'vue-i18n';
import * as validators from '@vuelidate/validators';
import { createI18nMessage } from '@vuelidate/validators';

export default function () {
  const i18n = useI18n();
  const withI18nMessage = createI18nMessage({ t: i18n.t.bind(i18n) });

  const required = withI18nMessage(validators.required, {
    messagePath: () => 'auth.validator.required',
  });

  const requiredIf = withI18nMessage(validators.requiredIf, {
    withArguments: true,
    messagePath: () => 'auth.validator.required',
  });

  const email = withI18nMessage(validators.email, {
    messagePath: () => 'auth.validator.email',
  });

  const sameAs = withI18nMessage(validators.sameAs, {
    withArguments: true,
    messagePath: () => 'auth.validator.sameAs',
  });

  const minLength = withI18nMessage(validators.minLength, {
    withArguments: true,
    messagePath: () => 'auth.validator.minLength',
  });

  const maxLength = withI18nMessage(validators.maxLength, {
    withArguments: true,
    messagePath: () => 'auth.validator.maxLength',
  });

  return {
    required,
    requiredIf,
    email,
    sameAs,
    minLength,
    maxLength,
  };
}
