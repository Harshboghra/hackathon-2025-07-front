import { useQuery } from '@apollo/client';
import { GET_All_INTEGRATION_HAS_FLOW_HAS_LOG_HAS_REQUESTS } from '../../service/graphql/queries/IntegrationHasFlowHasLogHasRequest/integrationHasFlowHasLogHasRequest.query';
import GenericDataTableWrapper from '../table/GenericDataTableWrapper';
import { dateTemplate } from '../../library/utilities/helperFunction';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import AppButton from '../button/AppButton';
import {
  IDetailState,
  IExpandingLogRequestTableProps,
  IIntegrationHasFlowHasLogHasRequest,
} from './ExpandingLogRequestTable.model';
import { useTranslation } from 'react-i18next';

export default function ExpandingLogRequestTable(
  props: IExpandingLogRequestTableProps,
) {
  const { logId } = props;
  const { data, loading } = useQuery(
    GET_All_INTEGRATION_HAS_FLOW_HAS_LOG_HAS_REQUESTS,
    {
      variables: {
        integration_has_flow_has_log_id: logId,
      },
      skip: !logId,
    },
  );
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] = useState<IDetailState>();

  const detailBodyTemplate = (
    text: string,
    title: string,
    json: boolean = true,
  ) => {
    const truncated = text?.length > 30 ? text?.slice(0, 30) + '...' : text;

    return (
      <div>
        {truncated}{' '}
        {text?.length > 30 && (
          <AppButton
            type="Secondary"
            className="p-button-sm"
            icon="pi pi-info-circle"
            tooltip={t(
              'objects.integrationLogRequest.tooltips.showMoreDetails',
            )}
            onClick={() => {
              setSelectedDetail({
                text: json ? (
                  <pre>
                    {(() => {
                      try {
                        let parsed = JSON.parse(text);

                        if (
                          typeof parsed === 'string' &&
                          parsed.trim().startsWith('{')
                        ) {
                          parsed = JSON.parse(parsed);
                        }

                        return JSON.stringify(parsed, null, 2);
                      } catch (e) {
                        return text;
                      }
                    })()}
                  </pre>
                ) : (
                  <p>{text}</p>
                ),
                title: title,
              });
              setVisible(true);
            }}
          />
        )}
      </div>
    );
  };

  const column = [
    {
      field: 'request_url',
      header: t('objects.integrationLogRequest.tableAttributes.requestUrl'),
      template: (rowData: IIntegrationHasFlowHasLogHasRequest) =>
        detailBodyTemplate(
          rowData.request_url,
          t('objects.integrationLogRequest.tableAttributes.requestUrl'),
          false,
        ),
    },
    {
      field: 'request_type',
      header: t('objects.integrationLogRequest.tableAttributes.requestType'),
    },
    {
      field: 'request_parameters',
      filter: false,
      sortable: false,
      header: t(
        'objects.integrationLogRequest.tableAttributes.requestParameters',
      ),
      template: (rowData: IIntegrationHasFlowHasLogHasRequest) =>
        detailBodyTemplate(
          rowData.request_parameters,
          t('objects.integrationLogRequest.tableAttributes.requestParameters'),
        ),
    },
    {
      field: 'request_header',
      filter: false,
      sortable: false,
      header: t('objects.integrationLogRequest.tableAttributes.requestHeader'),
      template: (rowData: IIntegrationHasFlowHasLogHasRequest) =>
        detailBodyTemplate(
          rowData.request_header,
          t('objects.integrationLogRequest.tableAttributes.requestHeader'),
        ),
    },
    {
      field: 'response_body',
      filter: false,
      sortable: false,
      header: t('objects.integrationLogRequest.tableAttributes.responseBody'),
      template: (rowData: IIntegrationHasFlowHasLogHasRequest) =>
        detailBodyTemplate(
          rowData.response_body,
          t('objects.integrationLogRequest.tableAttributes.responseBody'),
        ),
    },
    {
      field: 'response_code',
      header: t('objects.integrationLogRequest.tableAttributes.responseCode'),
    },
    {
      field: 'created',
      filter: false,
      template: (rowData: IIntegrationHasFlowHasLogHasRequest) =>
        dateTemplate(rowData.created),
      header: t('objects.integrationLogRequest.tableAttributes.created'),
    },
  ];

  return (
    <>
      <Dialog
        header={selectedDetail?.title}
        visible={visible}
        modal
        onHide={() => setVisible(false)}
        className="w-6"
        contentStyle={{ overflowWrap: 'break-word', borderRadius: 'unset' }}
      >
        {selectedDetail?.text}
      </Dialog>
      <GenericDataTableWrapper
        headerText={t('objects.integrationLogRequest.tableHeader')}
        columns={column}
        dataLoading={loading}
        sortField="created"
        value={data?.getAllIntegrationHasFlowHasLogHasRequest ?? []}
        exportButtons={false}
      />
    </>
  );
}
