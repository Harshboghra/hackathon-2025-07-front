import { useContext, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import UserList from './UserList';
import UserCreate from './UserCreate';
import { IUser, IUserIndex } from './User.model';
import { Dialog } from 'primereact/dialog';
import {
  GET_All_USERS,
  GET_COMPANY_WITH_USERS,
} from '../../service/graphql/queries';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../contexts/user';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { ability } from '../../library/ability/ability';

const UserIndex = (props: IUserIndex) => {
  const { companyId } = props;
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [userDialog, setUserDialog] = useState(false);
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [getAllUser, { data: getUsers }] = useLazyQuery(GET_All_USERS);
  const [getCompanyUsers, { data: getCompanyUsersData }] = useLazyQuery(
    GET_COMPANY_WITH_USERS,
  );

  useEffect(() => {
    if (user?.companyHasUserId && !companyId) {
      getAllUser({
        variables: {
          companyHasUserId: user.companyHasUserId,
        },
      });
    }
    if (companyId) {
      getCompanyUsers({
        variables: {
          id: companyId,
        },
      });
    }
  }, [user, companyId]);

  const userData = useMemo(() => {
    if (getUsers?.getCurrentUser && !companyId) {
      return getUsers.getCurrentUser.company_has_users[0].company.user;
    }
    if (getCompanyUsersData) {
      return getCompanyUsersData.getCompany.user;
    }
    return [];
  }, [getUsers, companyId, getCompanyUsersData]);

  const openNew = () => setUserDialog(true);

  const hideDialog = () => setUserDialog(false);

  return (
    <div className="card">
      <Dialog
        visible={userDialog}
        className="w-4"
        header={t('objects.user.dialogHeader')}
        modal
        onHide={() => hideDialog()}
      >
        <UserCreate setUserDialog={setUserDialog} companyId={companyId} />
      </Dialog>
      <UserList
        data={userData}
        selectedData={selectedUsers}
        setSelectedData={setSelectedUsers}
        openNew={
          ability.can(PERMISSION.ACTION.CREATE, PERMISSION.PAGE.USERS)
            ? openNew
            : undefined
        }
        companyId={companyId}
      />
    </div>
  );
};

export default UserIndex;
