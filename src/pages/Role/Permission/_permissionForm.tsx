import { useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { verifyArray } from '../../../library/utilities/helperFunction';
import {
  IPermissionForm,
  IPermissionView,
  IRoleHasPermission,
} from './Permission.model';
import { Checkbox } from 'primereact/checkbox';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import AppButton from '../../../components/button/AppButton';
import { BUTTON_TYPE } from '../../../library/utilities/constant';

const PermissionForm = (props: IPermissionForm) => {
  const navigate = useNavigate();
  const { methods, onSubmit, permissionData } = props;
  const [permissions, setPermissions] = useState<number[]>([]);
  const { t } = useTranslation();

  const permissionView = useMemo(() => {
    const permissionViewData: IPermissionView = {};

    permissionData?.getRole?.parent_role?.role_has_permissions.map(
      (roleHasPermissions: IRoleHasPermission) => {
        const pageName = roleHasPermissions.permission.page.name;
        if (!permissionViewData[pageName]) {
          permissionViewData[pageName] = [];
        }
        permissionViewData[pageName].push({
          label: roleHasPermissions.permission.page_action.name,
          value: roleHasPermissions.permission.id,
        });

        return permissionViewData;
      },
    );

    const selectedPermissions =
      permissionData?.getRole?.role_has_permissions.map(
        (roleHasPermissions: IRoleHasPermission) => {
          return roleHasPermissions.permission_id;
        },
      );
    setPermissions(selectedPermissions);

    return permissionViewData;
  }, [permissionData]);

  const onSave = () => {
    if (onSubmit) {
      onSubmit(permissions);
    }
  };

  return (
    <FormProvider {...methods}>
      <h4 className="vertical-align-middle">
        <AppButton type={BUTTON_TYPE.BACK} onClick={() => navigate('/role')} />
        {permissionData?.getRole?.name}
      </h4>
      <hr className="mb-5" />
      <form onSubmit={methods.handleSubmit(onSave)}>
        {Object.keys(permissionView).map((page: string) => {
          return (
            <div className="card" key={page}>
              <h5>
                <label className="p-2 mr-2">
                  <Checkbox
                    className="mt-2"
                    value={permissionView[page]?.map(
                      (permission: { label: string; value: number }) =>
                        permission.value,
                    )}
                    checked={verifyArray(
                      permissionView[page]?.map(
                        (permission: { label: string; value: number }) =>
                          permission.value,
                      ),
                      permissions,
                    )}
                    onChange={(e) => {
                      if (e.checked) {
                        setPermissions([...permissions, ...e.value]);
                      } else {
                        setPermissions(
                          permissions.filter(
                            (val: number) => !e.value?.includes(val),
                          ),
                        );
                      }
                    }}
                  />{' '}
                  {page}
                </label>
              </h5>
              {permissionView[page].map(
                (permission: { label: string; value: number }) => {
                  return (
                    <label className="p-2 mr-2" key={permission.value}>
                      <Checkbox
                        className="mt-2"
                        value={permission.value}
                        checked={permissions?.includes(permission.value)}
                        onChange={(e) => {
                          if (e.checked) {
                            setPermissions([...permissions, e.value]);
                          } else {
                            setPermissions(
                              permissions.filter(
                                (val: number) => val !== e.value,
                              ),
                            );
                          }
                        }}
                      />{' '}
                      {permission.label}
                    </label>
                  );
                },
              )}
            </div>
          );
        })}
        <br />
        <AppButton
          type={BUTTON_TYPE.CHECK}
          label={t('components.button.name.save')}
        />
      </form>
    </FormProvider>
  );
};
export default PermissionForm;
