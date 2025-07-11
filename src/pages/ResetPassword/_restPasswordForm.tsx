import { FormProvider, useForm } from 'react-hook-form';
import { BUTTON_TYPE, Pattern } from '../../library/utilities/constant';
import { useTranslation } from 'react-i18next';
import { IResetPasswordForm } from './ResetPassword.model';
import { setApiErrorsToForm } from '../../contexts/message';
import AppButton from '../../components/button/AppButton';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { Input } from '../../components/form/input/Input';

const ResetPasswordForm = (props: IResetPasswordForm) => {
  const { onFormSubmit, className } = props;
  const { t } = useTranslation();
  const login_attributes: IAttributeObject = {
    password: {
      label: t('common.resetPassword.password'),
      rules: {
        required: true,
        type: 'password',
      },
    },
    confirmPassword: {
      label: t('common.resetPassword.confirmPassword'),
      rules: {
        required: true,
        patterns: Pattern.password,
        type: 'password',
      },
    },
  };

  const methods = useForm();
  const onSubmit = (values: any) => {
    onFormSubmit(values, methods).catch((err) => {
      setApiErrorsToForm(err?.response, methods);
    });
  };

  return (
    <div className={className}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input attribute="password" form={login_attributes} />
          <Input attribute="confirmPassword" form={login_attributes} />
          <AppButton
            type={BUTTON_TYPE.CHECK}
            label={t('components.button.name.save')}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default ResetPasswordForm;
