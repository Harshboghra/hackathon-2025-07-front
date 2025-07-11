import { useLazyQuery } from '@apollo/client';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  mutateFromFormData,
  MUTATION_TYPE_UPDATE,
} from '../../service/mutation.service';
import {
  ICompany,
  ICompanyInitialValues,
  IUpdateCompany,
} from './Company.model';
import CompanyForm from './_companyForm';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { TabPanel, TabView } from 'primereact/tabview';
import { useTranslation } from 'react-i18next';
import { GET_COMPANY_LIGHT } from '../../service/graphql/queries';
import UserIndex from '../User/Index';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { ability } from '../../library/ability/ability';
import IntegrationIndex from '../Integration/Index';
import IntegrationHasFlowHasLogsList from '../IntegrationHasFlowHasLogs/IntegrationHasFlowHasLogsList';

export const CompanyUpdate = (props: IUpdateCompany) => {
  const { t } = useTranslation();
  const { data, setCompanyDialog } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [companyId, setCompanyId] = useState<number>();
  const [integrationIdForLogs, setIntegrationIdForLogs] = useState<number>();
  const [showLogs, setShowLogs] = useState(false);
  const [getCompany] = useLazyQuery(GET_COMPANY_LIGHT);

  const initialValues: ICompanyInitialValues = {
    name: data?.name,
    organization_number: data?.organization_number,
    reference: data?.reference,
    active: data?.active,
    our_reference_company_has_user_id: data?.our_reference_company_has_user_id,
  };
  const methods = useForm({
    values: initialValues,
  });

  useEffect(() => {
    if (data) {
      setCompanyId(data.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (values: ICompany) => {
    const updatedData = { ...values, id: companyId };
    mutateFromFormData(updatedData, 'Company', MUTATION_TYPE_UPDATE).then(
      (res) => {
        pushMessageFromMutationResponse(res.response);
        if (res.success) {
          getCompany({
            variables: {
              id: companyId,
            },
          });
          setCompanyDialog && setCompanyDialog(false);
        } else {
          setErrorsToForm(res?.response, methods);
        }
      },
    );
  };

  return (
    <TabView>
      <TabPanel header={t('objects.company.tabPanelHeader.company')}>
        <CompanyForm methods={methods} onSubmit={onSubmit} isEdit={true} />
      </TabPanel>

      {ability.can(
        PERMISSION.ACTION.VIEW,
        PERMISSION.PAGE.COMPANY_WISE_USERS,
      ) && (
        <TabPanel header={t('objects.company.tabPanelHeader.users')}>
          <UserIndex companyId={data?.id} />
        </TabPanel>
      )}

      <TabPanel header={t('objects.company.tabPanelHeader.integration')}>
        {showLogs ? (
          <IntegrationHasFlowHasLogsList
            intgerationId={integrationIdForLogs}
            backToIntegration={() => setShowLogs(false)}
          />
        ) : (
          <IntegrationIndex
            companyId={data?.id}
            showLogs={(id) => {
              setShowLogs(true);
              setIntegrationIdForLogs(id);
            }}
          />
        )}
      </TabPanel>
    </TabView>
  );
};
