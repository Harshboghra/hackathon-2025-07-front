import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppButton from '../../components/button/AppButton';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { useEffect } from 'react';
import { BUTTON_TYPE, LANGUAGE_CODES } from '../../library/utilities/constant';
import { locale } from 'primereact/api';
import {
  MUTATION_TYPE_UPDATE,
  mutateFromFormData,
} from '../../service/mutation.service';
import { setErrorsToForm } from '../../contexts/message';
import { changeLanguageAndFetchTranslations } from '../../i18n';
import { Select } from '../../components/form/select/Select';
const keys = {
  language: 'language',
};
export class LocalStorageService {
  static setLanguage(language: any) {
    localStorage.setItem(keys.language, language);
  }
  static getLanguage() {
    return localStorage.getItem(keys.language) ?? 'sv';
  }
}

const SettingIndex = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    {
      label: 'Svenska',
      value: 'sv',
    },
    {
      label: 'English',
      value: 'en',
    },
  ];
  const setting_attributes: IAttributeObject = {
    setting: {
      label: t('common.setting'),
      options: languages,
      rules: {
        required: true,
      },
    },
  };
  const values = {
    setting: i18n.language,
  };
  const methods = useForm({
    defaultValues: {
      setting: '',
    },
    values,
  });
  const onSubmit = (values: any) => {
    mutateFromFormData(
      { language: values.setting },
      'Language',
      MUTATION_TYPE_UPDATE,
    ).then((res) => {
      if (!res.success) {
        setErrorsToForm(res?.response, methods);
      }
    });
    changeLanguageAndFetchTranslations(values.setting);
    LocalStorageService.setLanguage(values.setting);
    document.documentElement.lang = i18n.language;
  };

  useEffect(() => {
    locale(LANGUAGE_CODES.includes(i18n.language) ? i18n.language : 'sv');
  }, [i18n.language]);
  return (
    <div className="card">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h5>{t('common.setting')}</h5>
          <Select attribute="setting" form={setting_attributes} />
          <AppButton
            type={BUTTON_TYPE.CHECK}
            label={t('components.button.name.update')}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default SettingIndex;
