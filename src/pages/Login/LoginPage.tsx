import { FormProvider, useForm } from 'react-hook-form';
import AppButton from '../../components/button/AppButton';
import { ILoginForm } from './login.model';
import { BUTTON_TYPE, IFormFieldType } from '../../library/utilities/constant';
import { Input } from '../../components/form/input/Input';
import { useTranslation } from 'react-i18next';

const LoginPage = (props: ILoginForm) => {
  const { login_attributes, onSubmit, handelForgotPassword } = props;
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  return (
    <div className="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between">
      {/* Login Form Top */}
      <img
        src={`/images/logo/logo.png`}
        className="mt-5 mx-auto"
        alt="diamond-layout"
      />
      <div className="flex flex-column align-items-center gap-4">
        <div className="mb-3">
          <h2>{t('common.login.loginAccount')}</h2>
          <p>
            {t('common.login.forgotPassword')}{' '}
            <a
              className="text-primary hover:underline cursor-pointer font-medium"
              onClick={handelForgotPassword}
            >
              {t('common.login.clickHere')}
            </a>{' '}
            {t('common.login.toReset')}
          </p>
        </div>

        {/* Login Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-6">
            <Input
              attribute="username"
              form={login_attributes}
              fieldType={IFormFieldType.NO_LABEL}
            />
            <Input
              attribute="password"
              form={login_attributes}
              fieldType={IFormFieldType.NO_LABEL}
            />
            <AppButton
              className="w-full"
              type={BUTTON_TYPE.PRIMARY}
              label={t('components.button.name.continue')}
            />
          </form>
        </FormProvider>
      </div>

      {/* Login Form Footer */}
      <p className="text-color-secondary font-semibold">
        {t('common.login.problemText')}{' '}
        <a className="text-primary hover:underline cursor-pointer font-medium">
          {t('common.login.clickHere')}
        </a>{' '}
        {t('common.login.helpYouText')}
      </p>
    </div>
  );
};

export default LoginPage;
