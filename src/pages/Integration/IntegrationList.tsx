import { useContext, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Dialog } from 'primereact/dialog';
import {
  IIntegrationList,
  IIntegrationListData,
  IProviders,
} from './Integration.model';
import IntegrationUpdate from './IntegrationUpdate';
import { GET_All_INTEGRATIONS } from '../../service/graphql/queries/Integration/integration.query';
import AppButton from '../../components/button/AppButton';
import { useNavigate } from 'react-router-dom';
import {
  ACTIVE_FLOWS,
  BUTTON_TYPE,
  FLOW_NAME,
} from '../../library/utilities/constant';
import {
  dateTemplate,
  statusTemplate,
} from '../../library/utilities/helperFunction';
import { MessageContext } from '../../contexts/message';
import { mutateFromFormData } from '../../service/mutation.service';
import { GET_All_PROVIDERS } from '../../service/graphql/queries/Provider/provider.query';
import { useTranslation } from 'react-i18next';
import GenericDataTableWrapper from '../../components/table/GenericDataTableWrapper';

const IntegrationList = (props: IIntegrationList) => {
  const { data, selectedData, setSelectedData, openNew, showLogs } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [integrationDialog, setIntegrationDialog] = useState(false);
  const [integration, setIntegration] = useState<IIntegrationListData>();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const { loading } = useQuery(GET_All_INTEGRATIONS);
  const { data: getProviders } = useQuery(GET_All_PROVIDERS);

  const flowBtn = (rowData: IIntegrationListData) => {
    return (
      <div className="actions flex">
        {rowData?.integration_has_flows
          ?.filter(
            (flow) =>
              ACTIVE_FLOWS.includes(
                flow.flow_key as (typeof ACTIVE_FLOWS)[number],
              ) && flow.active,
          )
          .map((flow) => {
            return (
              <div className="mr-1">
                <AppButton
                  key={flow.flow_key}
                  type={BUTTON_TYPE.CHECK}
                  label={
                    flow?.flow_key && flow.flow_key in FLOW_NAME
                      ? FLOW_NAME[flow.flow_key as keyof typeof FLOW_NAME]
                      : ''
                  }
                  onClick={() => {
                    mutateFromFormData(
                      {
                        flow_key: flow.flow_key,
                        integration_id: rowData.id,
                      },
                      'Integration',
                      'trigger',
                    ).then((res) => {
                      pushMessageFromMutationResponse(res?.response);
                    });
                  }}
                />
              </div>
            );
          })}
      </div>
    );
  };

  const actionBody = (rowData: IIntegrationListData) => {
    return (
      <div className="actions">
        <AppButton
          type="Edit"
          onClick={() => {
            setIntegrationDialog(true);
            setIntegration(rowData);
          }}
        />
        <AppButton
          type="Secondary"
          icon="pi pi-list"
          tooltip={t('objects.integration.tooltips.log')}
          onClick={() =>
            showLogs
              ? showLogs(rowData.id)
              : navigate(`/integration-log/${rowData.id}`)
          }
        />
      </div>
    );
  };

  const modifyIntegrationData = useMemo(() => {
    if (data) {
      return data.map((integration: IIntegrationListData) => {
        const extraField = JSON.parse(
          integration.shop_manager_extra_field || '{}',
        );
        const stockProvider = getProviders?.getAllProviders.find(
          (provider: IProviders) =>
            provider.key === integration.stock_manager_provider_key,
        );
        const shopProvider = getProviders?.getAllProviders.find(
          (provider: IProviders) =>
            provider.key === integration.shop_manager_provider_key,
        );
        return {
          ...integration,
          stockProviderName: stockProvider?.name || '',
          shopProviderName: shopProvider?.name || '',
          status: statusTemplate(integration.active),
          storeName: extraField?.storeName || '',
          created: Number(integration.created),
        };
      });
    }
  }, [data, getProviders]);

  const columns = [
    {
      field: 'title',
      header: t('objects.integration.tableAttributes.title'),
    },
    {
      field: 'stockProviderName',
      header: t('objects.integration.tableAttributes.stockProvider'),
    },
    {
      field: 'shopProviderName',
      header: t('objects.integration.tableAttributes.shopProvider'),
    },
    {
      field: 'company.name',
      header: t('objects.integration.tableAttributes.companyName'),
    },
    {
      field: 'storeName',
      header: t('objects.integration.tableAttributes.storeName'),
    },
    {
      field: 'status',
      header: t('objects.integration.tableAttributes.active'),
    },
    {
      field: 'created',
      filter: false,
      template: (rowData: IIntegrationListData) =>
        dateTemplate(rowData.created),
      header: t('objects.integration.tableAttributes.created'),
    },
    {
      field: 'integration_has_flow',
      header: t('objects.integration.tableAttributes.flowAction'),
      sortable: false,
      filter: false,
      template: (rowData: IIntegrationListData) => flowBtn(rowData),
    },
    {
      field: '',
      header: 'Action',
      sortable: false,
      filter: false,
      template: actionBody,
    },
  ];

  const hideDialog = () => {
    setIntegrationDialog(false);
  };

  return (
    <>
      {integrationDialog && (
        <Dialog
          visible={integrationDialog}
          header={t('objects.integration.dialogHeader')}
          modal
          className="w-6"
          onHide={() => hideDialog()}
          contentStyle={{ overflow: 'visible' }}
        >
          <IntegrationUpdate
            setIntegrationDialog={setIntegrationDialog}
            data={integration}
          />
        </Dialog>
      )}
      <GenericDataTableWrapper
        headerText={t('objects.integration.tableHeader')}
        dataLoading={loading}
        columns={columns}
        sortField="created"
        sortOrder={-1}
        value={modifyIntegrationData}
        selectedRecords={selectedData}
        handleCheckBoxSelectionEvent={(e: any) => setSelectedData(e.value)}
        openNew={openNew}
      />
    </>
  );
};
export default IntegrationList;
