import { useState, useContext } from 'react';
import { deleteObject } from '../../service/mutation.service';
import { Dialog } from 'primereact/dialog';
import {
  ICompanyHasUser,
  ICompanyHasUserListProps,
} from './CompanyHasUser.model';
import CompanyHasUserUpdate from './CompanyHasUserUpdate';
import { MessageContext } from '../../contexts/message';
import { useTranslation } from 'react-i18next';
import AppButton from '../../components/button/AppButton';
import { Can } from '../../library/ability/Can';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { ability } from '../../library/ability/ability';
import { ConfirmDialog } from '../../components/confrimDialog/ConfirmDialog';
import { BUTTON_TYPE } from '../../library/utilities/constant';
import GenericDataTableWrapper from '../../components/table/GenericDataTableWrapper';

const CompanyHasUserList = (props: ICompanyHasUserListProps) => {
  const { t } = useTranslation();
  const { selectedData, setSelectedData, openNew, companyHasUserData } = props;
  const [companyHasUserDialog, setCompanyHasUserDialog] = useState(false);
  const [companyHasUser, setCompanyHasUser] = useState<ICompanyHasUser>();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [id, setId] = useState<number>(0);

  const columns = [
    { field: 'company.name', header: t('objects.user.attributes.company_id') },
    { field: 'roleName', header: t('objects.role.attributes.name') },
    {
      field: 'companyActiveStatus',
      header: t('objects.user.attributes.active'),
    },
  ];
  const actionBody = (rowData: ICompanyHasUser) => {
    return (
      <div className="actions">
        <Can
          I={PERMISSION.ACTION.UPDATE}
          a={PERMISSION.PAGE.COMPANY_WISE_USERS}
        >
          <AppButton
            type={BUTTON_TYPE.EDIT}
            onClick={() => {
              setCompanyHasUserDialog(true);
              setCompanyHasUser(rowData);
            }}
          />
        </Can>
        <Can
          I={PERMISSION.ACTION.DELETE}
          a={PERMISSION.PAGE.COMPANY_WISE_USERS}
        >
          <AppButton
            type={BUTTON_TYPE.DELETE}
            onClick={() => deleteCompanyHasUser(rowData.id)}
          />
        </Can>
      </div>
    );
  };

  const deleteCompanyHasUser = (id: number) => {
    setId(id);
    setConfirmDialog(true);
  };

  const confirmedDeleteCompanyHasUser = () => {
    deleteObject(id, 'CompanyHasUser').then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res?.success) {
        setConfirmDialog(false);
      }
    });
  };

  const hideDialog = () => setCompanyHasUserDialog(false);

  return (
    <>
      {companyHasUserDialog && (
        <Dialog
          visible={companyHasUserDialog}
          header={t('objects.company_has_user.dialogHeader')}
          modal
          onHide={() => hideDialog()}
          className="w-4"
          contentStyle={{ overflow: 'visible' }}
        >
          <CompanyHasUserUpdate
            setCompanyHasUserDialog={setCompanyHasUserDialog}
            data={companyHasUser}
          />
        </Dialog>
      )}
      <GenericDataTableWrapper
        headerText={`${t('objects.company_has_user.tableHeader')}`}
        dataLoading={false}
        value={companyHasUserData}
        columns={columns}
        actionBodyTemplate={actionBody}
        selectedRecords={selectedData}
        handleCheckBoxSelectionEvent={(e) =>
          setSelectedData && setSelectedData(e.value)
        }
        openNew={
          ability.can(
            PERMISSION.ACTION.CREATE,
            PERMISSION.PAGE.COMPANY_WISE_USERS,
          )
            ? openNew
            : undefined
        }
        entityName={`${t('objects.company_has_user.entityName')}`}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        onConfirm={confirmedDeleteCompanyHasUser}
        type={'Delete'}
      />
    </>
  );
};
export default CompanyHasUserList;
