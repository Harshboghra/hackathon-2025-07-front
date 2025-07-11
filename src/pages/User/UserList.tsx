import { useState, useContext, useMemo } from 'react';
import { deleteObject } from '../../service/mutation.service';
import { useLazyQuery } from '@apollo/client';
import { Dialog } from 'primereact/dialog';
import { IUser, IUserList } from './User.model';
import UserUpdate from './UserUpdate';
import { MessageContext } from '../../contexts/message';
import { GET_All_USERS } from '../../service/graphql/queries';
import { statusTemplate } from '../../library/utilities/helperFunction';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../contexts/user';
import AppButton from '../../components/button/AppButton';
import { ConfirmDialog } from '../../components/confrimDialog/ConfirmDialog';
import { BUTTON_TYPE } from '../../library/utilities/constant';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { Can } from '../../library/ability/Can';
import GenericDataTableWrapper from '../../components/table/GenericDataTableWrapper';

const UserList = (props: IUserList) => {
  const { data, selectedData, setSelectedData, openNew } = props;
  const [userDialog, setUserDialog] = useState(false);
  const [user, setUser] = useState<IUser>();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [id, setId] = useState<number>(0);
  const { user: currentUser } = useContext(UserContext);
  const [getAllUser, { loading }] = useLazyQuery(GET_All_USERS);
  const { t } = useTranslation();

  const modifyUserData = useMemo(() => {
    if (data) {
      return data.map((user: IUser) => ({
        ...user,
        status: statusTemplate(user.active),
      }));
    }
  }, [data]);

  const columns = [
    { field: 'first_name', header: t('objects.user.attributes.first_name') },
    { field: 'last_name', header: t('objects.user.attributes.last_name') },
    {
      field: 'status',
      header: t('objects.user.attributes.active'),
    },
  ];

  const actionBody = (rowData: IUser) => {
    return (
      <div className="actions">
        <Can I={PERMISSION.ACTION.UPDATE} a={PERMISSION.PAGE.USERS}>
          <AppButton
            type={BUTTON_TYPE.EDIT}
            onClick={() => {
              setUserDialog(true);
              setUser(rowData);
            }}
          />
        </Can>
        <Can I={PERMISSION.ACTION.DELETE} a={PERMISSION.PAGE.USERS}>
          <AppButton
            type={BUTTON_TYPE.DELETE}
            onClick={() => deleteUser(rowData.id)}
          />
        </Can>
      </div>
    );
  };

  const deleteUser = (id: number) => {
    setId(id);
    setConfirmDialog(true);
  };

  const confirmedDeleteUser = () => {
    deleteObject(id, 'User').then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res?.success) {
        getAllUser({
          variables: {
            companyHasUserId: currentUser?.companyHasUserId,
          },
        });
        setConfirmDialog(false);
      }
    });
  };

  const hideDialog = () => {
    setUserDialog(false);
  };

  return (
    <>
      {userDialog && (
        <Dialog
          visible={userDialog}
          className="w-4"
          header={t('objects.user.dialogHeader')}
          modal
          onHide={() => hideDialog()}
        >
          <UserUpdate setUserDialog={setUserDialog} data={user} />
        </Dialog>
      )}
      <GenericDataTableWrapper
        headerText={`${t('objects.user.tableHeader')}`}
        dataLoading={loading}
        columns={columns}
        value={modifyUserData}
        actionBodyTemplate={actionBody}
        selectedRecords={selectedData}
        handleCheckBoxSelectionEvent={(e) => setSelectedData(e.value)}
        openNew={openNew}
        entityName={`${t('objects.user.entityName')}`}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        onConfirm={confirmedDeleteUser}
        type={'Delete'}
        confirmDialogText={t('objects.user.confirmations.deleteUser.text')}
      />
    </>
  );
};
export default UserList;
