import { useState, useContext, useMemo } from 'react';
import { deleteObject } from '../../service/mutation.service';
import { Dialog } from 'primereact/dialog';
import { ICompany, ICompanyList } from './Company.model';
import { CompanyUpdate } from './CompanyUpdate';
import { MessageContext } from '../../contexts/message';
import { useTranslation } from 'react-i18next';
import { statusTemplate } from '../../library/utilities/helperFunction';
import { useLazyQuery } from '@apollo/client';
import { GET_All_ADMIN_COMPANIES_LIGHT } from '../../service/graphql/queries';
import AppButton from '../../components/button/AppButton';
import { ConfirmDialog } from '../../components/confrimDialog/ConfirmDialog';
import { Can } from '../../library/ability/Can';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { BUTTON_TYPE } from '../../library/utilities/constant';
import GenericDataTableWrapper from '../../components/table/GenericDataTableWrapper';

const CompanyList = (props: ICompanyList) => {
  const { t } = useTranslation();
  const { data, selectedData, setSelectedData, openNew, dataLoading } = props;
  const [companyDialog, setCompanyDialog] = useState(false);
  const [company, setCompany] = useState<ICompany>();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [id, setId] = useState<number>(0);
  const [refreshCompanies] = useLazyQuery(GET_All_ADMIN_COMPANIES_LIGHT);

  const modifyCompanyData = useMemo(() => {
    if (data) {
      return data.map((company: ICompany) => {
        return {
          ...company,
          status: statusTemplate(company.active),
          created_by_company_has_user_name:
            company.created_by_company_has_user?.user?.first_name +
            ' ' +
            company.created_by_company_has_user?.user?.last_name,
        };
      });
    }
  }, [data]);

  const columns = [
    { field: 'name', header: t('objects.company.attributes.name') },
    {
      field: 'organization_number',
      header: t('objects.company.attributes.organization_number'),
    },
    { field: 'reference', header: t('objects.company.attributes.reference') },
    { field: 'status', header: t('objects.company.attributes.active') },
    {
      field: 'created_by_company_has_user_name',
      header: 'Created By ',
    },
  ];
  const actionBody = (rowData: ICompany) => {
    return (
      <div>
        <Can I={PERMISSION.ACTION.UPDATE} a={PERMISSION.PAGE.COMPANIES}>
          <AppButton
            type={BUTTON_TYPE.EDIT}
            onClick={() => {
              setCompanyDialog(true);
              setCompany(rowData);
            }}
          />
        </Can>
        <Can I={PERMISSION.ACTION.DELETE} a={PERMISSION.PAGE.COMPANIES}>
          <AppButton
            type={BUTTON_TYPE.DELETE}
            onClick={() => deleteCompany(rowData.id)}
          />
        </Can>
      </div>
    );
  };

  const deleteCompany = (id: number) => {
    setId(id);
    setConfirmDialog(true);
  };

  const confirmedDeleteCompany = () => {
    deleteObject(id, 'Company').then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res?.success) {
        refreshCompanies();
        setConfirmDialog(false);
      }
    });
  };

  const hideDialog = () => {
    setCompanyDialog(false);
  };

  return (
    <>
      {companyDialog && (
        <Dialog
          maximizable
          appendTo="self"
          visible={companyDialog}
          header={t('objects.company.dialogHeader')}
          modal
          className="w-6"
          onHide={() => hideDialog()}
        >
          <CompanyUpdate setCompanyDialog={setCompanyDialog} data={company} />
        </Dialog>
      )}
      <GenericDataTableWrapper
        headerText={`${t('objects.company.tableHeader')}`}
        dataLoading={dataLoading}
        columns={columns}
        value={modifyCompanyData}
        actionBodyTemplate={actionBody}
        selectedRecords={selectedData}
        handleCheckBoxSelectionEvent={(e) => setSelectedData(e.value)}
        openNew={openNew}
        entityName={`${t('objects.company.entityName')}`}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        onConfirm={confirmedDeleteCompany}
        type={'Delete'}
        confirmDialogText={t(
          'objects.company.confirmations.deleteCompany.text',
        )}
      />
    </>
  );
};
export default CompanyList;
