import { useState, useContext } from 'react';
import { IRole, IRoleList } from './Role.model';
import { MessageContext } from '../../contexts/message';
import { deleteObject } from '../../service/mutation.service';
import { useLazyQuery } from '@apollo/client';
import { Dialog } from 'primereact/dialog';
import { useTranslation } from 'react-i18next';
import { GET_All_ROLES } from '../../service/graphql/queries/Role/role.query';
import RoleUpdate from './RoleUpdate';
import { useNavigate } from 'react-router';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { Can } from '../../library/ability/Can';
import AppButton from '../../components/button/AppButton';
import { ConfirmDialog } from '../../components/confrimDialog/ConfirmDialog';
import { ability } from '../../library/ability/ability';
import { BUTTON_TYPE } from '../../library/utilities/constant';
import GenericDataTableWrapper from '../../components/table/GenericDataTableWrapper';

const RoleList = (props: IRoleList) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, selectedData, setSelectedData, openNew, mainRoles } = props;
  const [roleDialog, setRoleDialog] = useState(false);
  const [role, setRole] = useState<IRole>();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [id, setId] = useState<number>(0);
  const [, { refetch }] = useLazyQuery(GET_All_ROLES);
  const columns = [
    {
      field: 'name',
      header: t('objects.role.attributes.name'),
      filter: true,
    },
    {
      field: 'description',
      header: t('objects.role.attributes.description'),
      filter: true,
    },
    {
      field: 'role_type.name',
      header: t('objects.role.attributes.roleType'),
      filter: true,
    },
    {
      field: 'parent_role.name',
      header: t('objects.role.attributes.parentRole'),
      filter: true,
    },
  ];
  const actionBody = (rowData: IRole) => {
    return (
      <div className="actions">
        <Can I={PERMISSION.ACTION.UPDATE} a={PERMISSION.PAGE.ROLES}>
          <AppButton
            type={BUTTON_TYPE.EDIT}
            onClick={() => {
              setRoleDialog(true);
              setRole(rowData);
            }}
          />
        </Can>
        <Can I={PERMISSION.ACTION.DELETE} a={PERMISSION.PAGE.ROLES}>
          <AppButton
            type={BUTTON_TYPE.DELETE}
            className="mr-1"
            onClick={() => deleteRole(rowData.id)}
          />
        </Can>
        <Can I={PERMISSION.ACTION.VIEW} a={PERMISSION.PAGE.ROLES}>
          <AppButton
            type={BUTTON_TYPE.PERMISSION}
            onClick={() => navigate(`/role/${rowData.id}`)}
          />
        </Can>
      </div>
    );
  };

  const deleteRole = (id: number) => {
    setId(id);
    setConfirmDialog(true);
  };

  const confirmedDeleteRole = () => {
    deleteObject(id, 'Role').then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res?.success) {
        refetch();
        setConfirmDialog(false);
      }
    });
  };

  const hideDialog = () => {
    setRoleDialog(false);
  };

  return (
    <>
      {roleDialog && (
        <Dialog
          maximizable
          appendTo="self"
          className="w-4"
          visible={roleDialog}
          header={t('objects.role.dialogHeader')}
          modal
          onHide={() => hideDialog()}
          contentStyle={{ overflow: 'visible' }}
        >
          {role && (
            <RoleUpdate
              setRoleDialog={setRoleDialog}
              data={role}
              mainRoles={mainRoles}
            />
          )}
        </Dialog>
      )}

      <GenericDataTableWrapper
        headerText={`${t('objects.role.tableHeader')}`}
        columns={columns}
        value={data}
        actionBodyTemplate={actionBody}
        selectedRecords={selectedData}
        handleCheckBoxSelectionEvent={(e) =>
          setSelectedData && setSelectedData(e.value)
        }
        openNew={
          ability.can(PERMISSION.ACTION.CREATE, PERMISSION.PAGE.ROLES)
            ? openNew
            : undefined
        }
        entityName={`${t('objects.role.entityName')}`}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        onConfirm={confirmedDeleteRole}
        type={'Delete'}
        confirmDialogText={t('objects.role.confirmations.deleteRole.text')}
      />
    </>
  );
};
export default RoleList;
