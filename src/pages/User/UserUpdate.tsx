import { useLazyQuery } from '@apollo/client';
import { useState, useContext, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  mutateFromFormData,
  MUTATION_TYPE_UPDATE,
} from '../../service/mutation.service';
import { IUser, IUpdateUser, IUserInitialValues } from './User.model';
import UserForm from './_userForm';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { GET_USER_BY_ID } from '../../service/graphql/queries';
import { TabPanel, TabView } from 'primereact/tabview';
import { USE_USER_FORM } from '../../library/utilities/constant';
import { authService } from '../../service/auth/auth.service';
import { userService } from '../../service/user/user.service';
import ResetPasswordForm from '../ResetPassword/_restPasswordForm';
import { ResetPasswordValue } from '../ResetPassword/ResetPassword.model';
import { useTranslation } from 'react-i18next';
import { ability } from '../../library/ability/ability';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { ICompanyHasUser } from '../CompanyHasUser/CompanyHasUser.model';
import { statusTemplate } from '../../library/utilities/helperFunction';
import { CompanyHasUserCreate } from '../CompanyHasUser/CompanyHasUserCreate';
import CompanyHasUserList from '../CompanyHasUser/CompanyHasUserList';
const UserUpdate = (props: IUpdateUser) => {
  const { data, setUserDialog, useFor = USE_USER_FORM.EDIT_USER } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [id, setId] = useState<number>();
  const [getUser, { data: userData }] = useLazyQuery(GET_USER_BY_ID);
  const { t } = useTranslation();

  const isMyProfilePage = useFor === USE_USER_FORM.MY_PROFILE;

  const initialValues: IUserInitialValues = {
    first_name: data?.first_name,
    last_name: data?.last_name,
    active: data?.active,
  };

  const methods = useForm({
    values: initialValues,
  });

  useEffect(() => {
    if (id && !isMyProfilePage) fetchUser(id);
  }, [id, isMyProfilePage]);

  useEffect(() => {
    if (data) setId(data.id);
  }, [data]);

  const fetchUser = (id?: number) => {
    if (id) {
      getUser({ variables: { id: id } });
    }
  };

  const onSubmit = (values: IUser) => {
    const mutationData = isMyProfilePage ? values : { ...values, id: id };
    const mutationType = isMyProfilePage ? 'MyProfileUser' : 'User';
    mutateFromFormData(mutationData, mutationType, MUTATION_TYPE_UPDATE).then(
      (res) => {
        pushMessageFromMutationResponse(res.response);
        if (res.success) {
          if (!isMyProfilePage) {
            getUser({ variables: { id: id } });
          }
          if (setUserDialog) {
            setUserDialog(false);
          }
        } else {
          setErrorsToForm(res?.response, methods);
        }
      },
    );
  };

  const onSubmitResetPassword = (values: ResetPasswordValue, methods: any) => {
    return authService.resetMyPassword(values).then((res) => {
      pushMessageFromMutationResponse(res);
      methods.reset();
    });
  };

  const handleInviteUser = () => {
    data &&
      userService.inviteUser(data.id).then((res) => {
        pushMessageFromMutationResponse(res);
        if (setUserDialog) {
          setUserDialog(false);
        }
        getUser({ variables: { id: data.id } });
      });
  };

  const canViewCompanyWiseUsers = ability.can(
    PERMISSION.ACTION.VIEW,
    PERMISSION.PAGE.COMPANY_WISE_USERS,
  );
  const canCreateCompanyWiseUsers = ability.can(
    PERMISSION.ACTION.CREATE,
    PERMISSION.PAGE.COMPANY_WISE_USERS,
  );

  const companyHasUserData: ICompanyHasUser[] = useMemo(() => {
    if (userData?.getUser) {
      return userData.getUser.company_has_users.map(
        (companyHasUser: ICompanyHasUser) => {
          return {
            ...companyHasUser,
            companyActiveStatus: statusTemplate(companyHasUser.active),
            roleName: companyHasUser?.company_has_user_roles[0]?.role?.name,
          };
        },
      );
    }
    return [];
  }, [userData]);
  return (
    <TabView>
      <TabPanel header={t('objects.user.tabPanelHeader.user')}>
        <div className="flex mb-4">
          <div>
            <label>
              {t('objects.user.attributes.username')}
              {' :'}
            </label>
          </div>
          <div className="font-bold ml-1">{data?.username}</div>
        </div>
        <UserForm
          methods={methods}
          onSubmit={onSubmit}
          isEdit={true}
          handleInviteOnClick={handleInviteUser}
          isInActiveUser={data?.active === false}
        />
      </TabPanel>

      {isMyProfilePage && (
        <TabPanel header={t('objects.user.tabPanelHeader.resetPassword')}>
          <ResetPasswordForm onFormSubmit={onSubmitResetPassword} />
        </TabPanel>
      )}

      {(canViewCompanyWiseUsers || canCreateCompanyWiseUsers) &&
        !isMyProfilePage &&
        companyHasUserData.length > 0 &&
        id && (
          <TabPanel header={t('objects.user.tabPanelHeader.companyHasUser')}>
            {canCreateCompanyWiseUsers && <CompanyHasUserCreate userId={id} />}
            <div className="mt-3">
              {canViewCompanyWiseUsers && (
                <CompanyHasUserList companyHasUserData={companyHasUserData} />
              )}
            </div>
          </TabPanel>
        )}
    </TabView>
  );
};

export default UserUpdate;
