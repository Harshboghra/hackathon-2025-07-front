import { useForm } from 'react-hook-form';
import CompanySettingForm from './_companySettingForm';
import {
  MUTATION_TYPE_UPDATE,
  mutateFromFormData,
} from '../../service/mutation.service';
import { useLazyQuery } from '@apollo/client';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../contexts/user';
import {
  ICompanySettingData,
  ICompanySettingInput,
} from './CompanySetting.model';
import { getBase64 } from '../../library/utilities/helperFunction';
import { TabPanel, TabView } from 'primereact/tabview';
import { useTranslation } from 'react-i18next';
import UserIndex from '../User/Index';
import { PERMISSION } from '../../library/utilities/permission.constant';
import { ability } from '../../library/ability/ability';
import { fileService } from '../../service/file/file.service';
import { GET_MY_COMPANY } from '../../service/graphql/queries';

const CompanySettingIndex = () => {
  const { t } = useTranslation();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [getMyCompany, { data }] = useLazyQuery(GET_MY_COMPANY);
  const { user } = useContext(UserContext);
  const [companyLogo, setCompanyLogo] = useState<any>();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  useEffect(() => {
    fetchCompany();
  }, [user]);

  const companyData = useMemo(() => data?.getMyCompany || {}, [data]);

  const values = {
    id: companyData?.id,
    name: companyData?.name,
    logo_base64: companyLogo,
  };
  const methods = useForm({
    defaultValues: {
      id: '',
      name: '',
      logo_base64: '',
    },
    values,
  });

  useEffect(() => {
    if (companyData?.logo_file_id) {
      fetchCompanyLogo(companyData?.logo_file_id);
    }
  }, [companyData]);

  const fetchCompany = async () => {
    getMyCompany();
  };

  const fetchCompanyLogo = async (logoFileId: number) => {
    try {
      const logoBlob = await fileService.getFileWithBlob(logoFileId);
      if (!logoBlob) return;
      const logoURL = window.URL.createObjectURL(new Blob([logoBlob]));
      setCompanyLogo(logoURL);
    } catch (error) {
      console.error('Error fetching Image:', error);
    }
  };

  const onSubmit = async (values: ICompanySettingInput) => {
    const data: ICompanySettingData = {
      id: user.company_id,
      name: values.name,
    };
    if (Array.isArray(values.logo_base64)) {
      data.logo_base64 = (await getBase64(values.logo_base64)) ?? companyLogo;
    }

    mutateFromFormData(data, 'MyCompany', MUTATION_TYPE_UPDATE).then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res.success) {
        fetchCompany();
        methods.reset();
        if (companyData?.logo_file_id) {
          fetchCompanyLogo(companyData?.logo_file_id);
        }
      } else {
        setErrorsToForm(res?.response, methods);
      }
    });
  };

  const companySettingTabs = [
    {
      id: 1,
      header: t('objects.company.tabPanelHeader.company_profile'),
      component: (
        <CompanySettingForm
          methods={methods}
          onSubmit={onSubmit}
          isEdit={true}
          logoData={companyLogo}
        />
      ),
    },
    {
      id: 2,
      permission: PERMISSION.PAGE.USERS,
      header: t('objects.user.tabPanelHeader.user'),
      component: <UserIndex />,
    },
  ];

  const availableTabs = companySettingTabs.filter(
    ({ permission }) =>
      !permission || ability.can(PERMISSION.ACTION.VIEW, permission),
  );

  return (
    <div className="card">
      {availableTabs.length > 0 ? (
        <TabView
          activeIndex={activeTabIndex}
          onTabChange={(e) => setActiveTabIndex(e.index)}
        >
          {availableTabs.map(({ header, component, id }) => (
            <TabPanel key={id} header={header}>
              {component}
            </TabPanel>
          ))}
        </TabView>
      ) : null}
    </div>
  );
};

export default CompanySettingIndex;
