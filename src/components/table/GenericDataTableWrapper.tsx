import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IGenericDataTableWrapper } from './genericDataTableWrapper.model';
import { UserContext } from '../../contexts/user';
import { dateTemplate } from '../../library/utilities/helperFunction';
import GenericDataTable from './GenericDataTable';
import { ICompanyHasUser } from '../../pages/CompanyHasUser/CompanyHasUser.model';
import { useTranslation } from 'react-i18next';
import { fileService } from '../../service/file/file.service';

const GenericDataTableWrapper = (props: IGenericDataTableWrapper) => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  const fetchCompanyLogo = useCallback(async () => {
    if (user?.companyHasUserId) {
      const currentCompany: ICompanyHasUser | undefined =
        user?.company_has_users.find(
          (companyHasUser: ICompanyHasUser) =>
            companyHasUser.id === user?.companyHasUserId,
        );
      const currentCompanyLogoId =
        currentCompany && currentCompany['company']['logo_file_id'];

      if (currentCompanyLogoId) {
        try {
          const companyLogoURL =
            await fileService.getFileWithBlob(currentCompanyLogoId);
          if (!companyLogoURL) return;
          const url = window.URL.createObjectURL(new Blob([companyLogoURL]));
          setCompanyLogo(url);
        } catch (error) {
          console.error('Error fetching Image:', error);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    fetchCompanyLogo();
  }, [fetchCompanyLogo]);

  const companyLogoBase64 = useMemo(() => companyLogo, [companyLogo]);

  props = {
    ...props,
    setCustomFilter: props.setCustomFilter,
    printPdf: {
      currentUser: user,
      tableName: props.headerText ?? '',
      printedDate: dateTemplate(new Date().getTime().toString()),
      leftCornerDataPrint: {
        [t('components.genericDataTable.printedBy')]:
          user?.first_name + ' ' + user?.last_name,
        [t('components.genericDataTable.printed')]: dateTemplate(
          new Date().getTime().toString(),
        ),
      },

      companyLogoBase64: companyLogoBase64 ?? null,
    },
  };

  return <GenericDataTable {...props} />;
};

export default GenericDataTableWrapper;
