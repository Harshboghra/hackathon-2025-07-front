import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import CompanyList from './CompanyList';
import CompanyCreate from './CompanyCreate';
import { ICompany } from './Company.model';
import { Dialog } from 'primereact/dialog';
import { GET_All_ADMIN_COMPANIES_LIGHT } from '../../service/graphql/queries';
import { useTranslation } from 'react-i18next';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { ability } from '../../library/ability/ability';

const CompanyIndex = () => {
  const { t } = useTranslation();
  const [selectedCompanies, setSelectedCompanies] = useState<ICompany[]>([]);
  const [companyDialog, setCompanyDialog] = useState(false);
  const { data } = useQuery(GET_All_ADMIN_COMPANIES_LIGHT);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setDataLoading(false);
    }
  }, [data]);

  const openNew = () => setCompanyDialog(true);

  const hideDialog = () => setCompanyDialog(false);

  return (
    <div className="card">
      <Dialog
        visible={companyDialog}
        header={t('objects.company.dialogHeader')}
        modal
        onHide={() => hideDialog()}
        className="w-4"
      >
        <CompanyCreate setCompanyDialog={setCompanyDialog} />
      </Dialog>
      <CompanyList
        data={data?.getAllAdminCompany}
        selectedData={selectedCompanies}
        setSelectedData={setSelectedCompanies}
        openNew={
          ability.can(PERMISSION.ACTION.CREATE, PERMISSION.PAGE.COMPANIES)
            ? openNew
            : undefined
        }
        dataLoading={dataLoading}
      />
    </div>
  );
};

export default CompanyIndex;
