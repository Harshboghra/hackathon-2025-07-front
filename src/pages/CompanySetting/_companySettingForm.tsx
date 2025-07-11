import { FormProvider } from 'react-hook-form';
import { ICompanySettingForm } from './CompanySetting.model';
import AppButton from '../../components/button/AppButton';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { Input } from '../../components/form/input/Input';
import { useTranslation } from 'react-i18next';
import FileUploads from '../../components/fileUpload/FileUpload';
import { BUTTON_TYPE } from '../../library/utilities/constant';
import { Divider } from 'primereact/divider';
const CompanySettingForm = (props: ICompanySettingForm) => {
  const { methods, onSubmit, logoData } = props;
  const { t } = useTranslation();
  let company_setting_attributes: IAttributeObject = {
    name: {
      label: t('objects.companySetting.attributes.company_name'),
      rules: {
        required: true,
      },
    },
    logo_base64: {
      label: t('objects.companySetting.attributes.company_logo'),
      rules: {
        required: false,
      },
    },
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h5 className="mb-4">{t('objects.companySetting.name')}</h5>
          <div className="col">
            <Input attribute="name" form={company_setting_attributes} />
          </div>
          <Divider className="bg-gray-300" />
          <div className="flex justify-content-between align-items-center">
            <div className="col-3">
              <FileUploads
                attribute="logo_base64"
                form={company_setting_attributes}
                className=" mr-5"
              />
            </div>

            <div className="col">
              {logoData && (
                <img
                  src={logoData}
                  alt="Company Logo"
                  className="w-auto h-10rem border-dashed"
                />
              )}
            </div>
          </div>
          <AppButton
            type={BUTTON_TYPE.CHECK}
            label={`${t('components.button.name.update')}`}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CompanySettingForm;
