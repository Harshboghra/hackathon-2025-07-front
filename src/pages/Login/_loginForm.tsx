import { FormProvider, useForm } from 'react-hook-form';
import { ILoginForm, LoginValues } from './login.model';
import AppButton from '../../components/button/AppButton';
import { Input } from '../../components/form/input/Input';
import { useTranslation } from 'react-i18next';
import { BUTTON_TYPE } from '../../library/utilities/constant';

const LoginForm = (props: ILoginForm) => {
  const { login_attributes, onSubmit } = props;
  const { t } = useTranslation();
  const methods = useForm<LoginValues>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input attribute="username" form={login_attributes} />
        <Input attribute="password" form={login_attributes} />
        <AppButton
          className="w-full"
          type={BUTTON_TYPE.PRIMARY}
          label={t('components.button.name.continue')}
        />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
