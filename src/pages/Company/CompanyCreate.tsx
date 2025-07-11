import { useLazyQuery } from '@apollo/client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import {
  mutateFromFormData,
  MUTATION_TYPE_CREATE,
} from '../../service/mutation.service';
import { ICompany, ICreateCompany } from './Company.model';
import CompanyForm from './_companyForm';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { GET_All_ADMIN_COMPANIES_LIGHT } from '../../service/graphql/queries';
import { UserContext } from '../../contexts/user';

const CompanyCreate = (props: ICreateCompany) => {
  const { setCompanyDialog } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [fetchAllCompanies] = useLazyQuery(GET_All_ADMIN_COMPANIES_LIGHT);
  const { user } = useContext(UserContext);
  const methods = useForm({
    defaultValues: {
      name: '',
      organization_number: '',
      reference: '',
      active: false,
      our_reference_company_has_user_id: user?.companyHasUserId,
    },
  });
  const onSubmit = (values: ICompany) => {
    mutateFromFormData(values, 'AdminCompany', MUTATION_TYPE_CREATE).then(
      (res) => {
        pushMessageFromMutationResponse(res?.response);
        if (res?.success) {
          setCompanyDialog(false);
          fetchAllCompanies();
          methods.reset();
        } else {
          setErrorsToForm(res?.response, methods);
        }
      },
    );
  };
  return <CompanyForm methods={methods} onSubmit={onSubmit} />;
};
export default CompanyCreate;
