import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import IntegrationList from './IntegrationList';
import IntegrationCreate from './IntegrationCreate';
import { IIntegration } from './Integration.model';
import { Dialog } from 'primereact/dialog';
import { GET_All_INTEGRATIONS } from '../../service/graphql/queries/Integration/integration.query';
import { GET_COMPANY_WITH_INTEGRATIONS } from '../../service/graphql/queries/Company/company.query';
import { useTranslation } from 'react-i18next';

const IntegrationIndex = (props: {
  companyId?: number;
  showLogs?: (id: number) => void;
}) => {
  const { t } = useTranslation();
  const { companyId, showLogs } = props;
  const [selectedIntegrations, setSelectedIntegrations] = useState<
    IIntegration[]
  >([]);
  const [integrationDialog, setIntegrationDialog] = useState(false);
  const { data } = useQuery(GET_All_INTEGRATIONS);
  const { data: getCompanyIntegrationsData } = useQuery(
    GET_COMPANY_WITH_INTEGRATIONS,
    {
      variables: {
        id: companyId,
      },
      skip: !companyId,
    },
  );

  const openNew = () => {
    setIntegrationDialog(true);
  };

  const hideDialog = () => {
    setIntegrationDialog(false);
  };

  const integrationData = useMemo(() => {
    if (data?.getAllIntegration && !companyId) {
      return data.getAllIntegration;
    }
    if (getCompanyIntegrationsData) {
      return getCompanyIntegrationsData.getCompany.integration;
    }
    return [];
  }, [data, getCompanyIntegrationsData]);

  return (
    <div className="card">
      <Dialog
        visible={integrationDialog}
        className="w-6"
        header={t('objects.integration.dialogHeader')}
        modal
        onHide={() => hideDialog()}
        contentStyle={{ overflow: 'visible' }}
      >
        <IntegrationCreate setIntegrationDialog={setIntegrationDialog} />
      </Dialog>
      <IntegrationList
        data={integrationData}
        selectedData={selectedIntegrations}
        setSelectedData={setSelectedIntegrations}
        openNew={openNew}
        showLogs={showLogs}
      />
    </div>
  );
};

export default IntegrationIndex;
