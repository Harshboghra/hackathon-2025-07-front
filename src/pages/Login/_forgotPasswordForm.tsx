import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { authService } from '../../service/auth/auth.service';
import { MessageContext } from '../../contexts/message';
import AppButton from '../../components/button/AppButton';
import { IForgotPasswordForm } from './login.model';
import { BUTTON_TYPE, IFormFieldType } from '../../library/utilities/constant';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { Input } from '../../components/form/input/Input';
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = (props: IForgotPasswordForm) => {
  const { setIsForgotPassword } = props;
  const { t } = useTranslation();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const login_attributes: IAttributeObject = {
    username: {
      label: t('common.login.userName'),
      placeholder: t('common.login.userName'),
      rules: {
        required: true,
      },
    },
  };

  const methods = useForm();

  const handleForgotPasswordSubmit = (values: any) => {
    authService.forgotPassword(values.username).then((res) => {
      pushMessageFromMutationResponse(res);
      if (setIsForgotPassword) setIsForgotPassword(false);
    });
  };

  const handleBackToLogin = (e: any) => {
    e.preventDefault();
    if (setIsForgotPassword) setIsForgotPassword(false);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleForgotPasswordSubmit)}>
          <Input
            attribute="username"
            form={login_attributes}
            fieldType={IFormFieldType.NO_LABEL}
          />
          <AppButton
            type={BUTTON_TYPE.CHECK}
            label={t('components.button.name.send')}
          />
          <div className="text-right">
            <a
              href="/login"
              onClick={handleBackToLogin}
              className="text-blue-500 hover:text-blue-700"
            >
              {t('common.login.backToLogin')}
            </a>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgotPasswordForm;
