import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import RoleList from './RoleList';
import RoleCreate from './RoleCreate';
import { IRole } from './Role.model';
import { Dialog } from 'primereact/dialog';
import { useTranslation } from 'react-i18next';
import { GET_All_ROLES } from '../../service/graphql/queries/Role/role.query';

const RoleIndex = () => {
  const { t } = useTranslation();
  const [selectedRoles, setSelectedRoles] = useState<IRole[]>([]);
  const [roleDialog, setRoleDialog] = useState(false);
  const { data: roleData } = useQuery(GET_All_ROLES);

  const [mainRoles, customRoles] = useMemo(() => {
    const roles = roleData?.getAllRole || [];
    const mainRoles = roles.filter(
      (role: IRole) => role.parent_role_id === null,
    );
    const customRoles = roles.filter(
      (role: IRole) => role.parent_role_id !== null,
    );
    return [mainRoles, customRoles];
  }, [roleData]);

  const openNew = () => setRoleDialog(true);

  const hideDialog = () => setRoleDialog(false);
  return (
    <div className="card">
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
        <RoleCreate setRoleDialog={setRoleDialog} mainRoles={mainRoles} />
      </Dialog>
      <RoleList
        data={customRoles}
        selectedData={selectedRoles}
        setSelectedData={setSelectedRoles}
        openNew={openNew}
        mainRoles={mainRoles}
      />
    </div>
  );
};

export default RoleIndex;
