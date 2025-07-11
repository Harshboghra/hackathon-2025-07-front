import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState, createContext } from 'react';
import { ICurrentUser } from '../pages/User/User.model';
import store from '../state/store';
import { GET_CURRENT_USER } from '../service/graphql/queries/User/user.query';
import { ICompanyHasUser } from '../pages/CompanyHasUser/CompanyHasUser.model';

export const UserContext = createContext({
  user: {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    mobilephone: '',
    active: false,
    company_id: 0,
    validEmails: [],
    __typename: '',
    company_has_users: [],
    companyHasUserId: 0,
    created_by_company_has_user_id: 0,
  },
});

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<ICurrentUser>();
  const { loading, data } = useQuery(GET_CURRENT_USER, {
    skip: !store.getState().auth.isLogin,
  });
  const companyHasUserId = store.getState().auth.companyHasUserId;
  useEffect(() => {
    if (data && !loading) {
      const response: any = Object.values(data)[0];
      const currentUser = {
        ...response,
        companyHasUserId:
          companyHasUserId !== 0
            ? companyHasUserId
            : response.company_has_users[0].id,
        company_id: response.company_has_users.find(
          (data: ICompanyHasUser) =>
            data.id ===
            (companyHasUserId !== 0
              ? companyHasUserId
              : response.company_has_users[0].id),
        )?.company_id,
      };
      const userData = currentUser as ICurrentUser;
      setUser(userData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, companyHasUserId]);
  const value: any = useMemo(() => ({ user }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
