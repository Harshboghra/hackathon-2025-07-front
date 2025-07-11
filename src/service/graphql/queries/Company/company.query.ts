import { gql } from '@apollo/client';
import { COMPANY_FIELDS } from './company.fragment';
import { USER_FIELDS, USER_FIELDS_LIGHT } from '../User/user.fragment';
import { COMPANY_HAS_USER_FIELDS_LIGHT } from '../CompanyHasUser/companyHasUser.fragment';
import { INTEGRATION_FIELDS } from '../Integration/integration.fragment';
import { INTEGRATION_HAS_FLOW_FIELDS_LIGHT } from '../IntegrationHasFlow/integrationHasFlow.fragment';

export const GET_All_COMPANIES = gql`
  ${USER_FIELDS_LIGHT}
  ${COMPANY_FIELDS}
  ${COMPANY_HAS_USER_FIELDS_LIGHT}

  query getAllCompany($companyHasUserId: Float) {
    getCurrentUser {
      ...UserFieldsWithId
      company_has_users(id: $companyHasUserId) {
        ...CompanyHasUserFieldsWithId
        company {
          ...CompanyFields
        }
      }
    }
  }
`;

export const GET_COMPANY = gql`
  ${USER_FIELDS_LIGHT}
  ${COMPANY_FIELDS}
  ${COMPANY_HAS_USER_FIELDS_LIGHT}

  query getCompany($companyHasUserId: Float) {
    getCurrentUser {
      ...UserFieldsWithId
      company_has_users(id: $companyHasUserId) {
        ...CompanyHasUserFieldsWithId
        company {
          ...CompanyFields
        }
      }
    }
  }
`;

export const GET_All_ADMIN_COMPANIES_LIGHT = gql`
  ${COMPANY_FIELDS}
  ${COMPANY_HAS_USER_FIELDS_LIGHT}
  ${USER_FIELDS}
  query getAllAdminCompany {
    getAllAdminCompany {
      ...CompanyFields
      created_by_company_has_user {
        ...CompanyHasUserFieldsWithId
        user {
          ...UserFields
        }
      }
    }
  }
`;

export const GET_COMPANY_LIGHT = gql`
  ${COMPANY_FIELDS}
  query getCompanyWithUsers($id: Float!) {
    getCompany(id: $id) {
      ...CompanyFields
    }
  }
`;

export const GET_COMPANY_WITH_USERS = gql`
  ${COMPANY_FIELDS}
  ${USER_FIELDS}
  ${COMPANY_HAS_USER_FIELDS_LIGHT}
  query getCompanyWithUsers($id: Float!) {
    getCompany(id: $id) {
      ...CompanyFields
      user {
        ...UserFields
        company_has_users {
          ...CompanyHasUserFieldsWithId
        }
      }
    }
  }
`;

export const GET_MY_COMPANY = gql`
  ${COMPANY_FIELDS}
  query getMyCompany {
    getMyCompany {
      ...CompanyFields
    }
  }
`;

export const GET_COMPANY_WITH_INTEGRATIONS = gql`
  ${COMPANY_FIELDS}
  ${INTEGRATION_HAS_FLOW_FIELDS_LIGHT}
  ${INTEGRATION_FIELDS}
  query getCompanyWithIntegrations($id: Float!) {
    getCompany(id: $id) {
      integration {
        ...IntegrationFields
        integration_has_flows {
          ...IntegrationHasFlowFieldsWithId
        }
        company {
          ...CompanyFields
        }
      }
    }
  }
`;
