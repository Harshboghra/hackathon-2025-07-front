import { useContext, useEffect } from 'react';
import ResetPasswordForm from './_restPasswordForm';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { ResetPasswordValue } from './ResetPassword.model';
import { authService } from '../../service/auth/auth.service';
import {
  MUTATION_TYPE_CREATE,
  mutateFromFormData,
} from '../../service/mutation.service';
import {
  VALIDATION_LINK_LOG_ACTION_TYPE,
  VALIDATION_LINK_TYPE,
} from '../../library/utilities/constant';
import { MessageContext, pushMessage } from '../../contexts/message';
import { useTranslation } from 'react-i18next';
import { VALIDATE_LINK_BY_TOKEN } from '../../service/graphql/queries';
import { client } from '../../service/graphql/graphql';

const ResetPasswordIndex = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useParams();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const { data: validationLinkData } = useQuery(VALIDATE_LINK_BY_TOKEN, {
    variables: { token: token, type: VALIDATION_LINK_TYPE.RESET_PASSWORD },
  });

  useEffect(() => {
    client.clearStore();
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (
      validationLinkData &&
      validationLinkData.validateLinkByToken === false
    ) {
      pushMessage({
        message: [
          {
            show: true,
            type: 'error',
            message: t('common.resetPassword.invalidLinkError'),
          },
        ],
      });
      navigate('/login');
    } else if (
      validationLinkData &&
      validationLinkData.validateLinkByToken === true
    ) {
      if (sessionStorage.getItem('linkToken') !== token) {
        const logData = {
          token: token,
          token_type: VALIDATION_LINK_TYPE.RESET_PASSWORD,
          action_type: VALIDATION_LINK_LOG_ACTION_TYPE.PAGE_LOAD,
        };
        mutateFromFormData(
          logData,
          'ValidationLinkLogByLinkToken',
          MUTATION_TYPE_CREATE,
        ).then(() => {
          sessionStorage.setItem('linkToken', token || '');
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationLinkData, navigate]);

  const handleFormSubmit = (values: ResetPasswordValue) => {
    return authService
      .resetPassword({ ...values, token: token || '' })
      .then((res) => {
        pushMessageFromMutationResponse(res);
        navigate('/login');
      });
  };

  return (
    <div
      className="flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
      style={{
        backgroundImage: `url("/images/login_bg.png")`,
        backgroundSize: 'cover',
        overflow: 'hidden',
      }}
    >
      <ResetPasswordForm
        onFormSubmit={handleFormSubmit}
        className="bg-red-50 card overflow-hidden"
      />
    </div>
  );
};

export default ResetPasswordIndex;
