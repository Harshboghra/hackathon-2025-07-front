import { createContext, createRef, useCallback, useMemo } from 'react';
import { Toast } from 'primereact/toast';
import {
  capitalizeFirstLetter,
  keyExists,
} from '../library/utilities/helperFunction';
import { useTranslation } from 'react-i18next';
import AppButton from '../components/button/AppButton';
import { LocalStorageService } from '../pages/Setting/SettingIndex';
import { BUTTON_TYPE } from '../library/utilities/constant';

const TOAST_LIFE: { [key: string]: number } = {
  error: 10000,
  success: 3000,
  warn: 60000,
  info: 3000,
};

const toastRef = createRef<any>();
export const MessageContext = createContext({
  pushMessageFromMutationResponse: async (_mutationResponse: any) => {},
  pushMessageFromRequest: async (_response: any) => {},
});
const MessageProvider = ({ children }: any) => {
  const pushMessageFromMutationResponse = useCallback(
    (mutationResponse: any) => {
      pushMessage(mutationResponse);
    },
    [],
  );

  const pushMessageFromRequest = useCallback((response: any) => {
    pushMessage(response);
  }, []);

  // Memoizing the value object to prevent unnecessary re-renders
  const value: any = useMemo(
    () => ({
      toastRef,
      pushMessageFromMutationResponse,
      pushMessageFromRequest,
    }),
    [pushMessageFromMutationResponse, pushMessageFromRequest],
  );
  return (
    <MessageContext.Provider value={value}>
      <Toast ref={toastRef} appendTo="self" baseZIndex={9999}></Toast>
      {children}
    </MessageContext.Provider>
  );
};
export default MessageProvider;

export const GraphQLQueryFailPopUp = (error: any) => {
  const { t } = useTranslation();
  const messageText =
    LocalStorageService.getLanguage() === 'en'
      ? `This ${error[0]?.path[0]} query failed, Please reload the page and try again`
      : `Denna ${error[0]?.path[0]}-fråga misslyckades. Ladda om sidan och försök igen`;
  toastRef.current.show({
    severity: 'error',
    life: 10000,
    content: (
      <div className="text-center">
        <div>
          <span>{messageText}</span>
        </div>
        <div className="mt-3">
          <AppButton
            type={BUTTON_TYPE.CHECK}
            label={t('components.button.name.reload')}
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    ),
  });
};

export const pushMessage = (data: any) => {
  // Handle global messages
  let toastArray: any[] = [];
  if (data?.response?.messages) {
    data.response?.messages
      ?.filter((item: any) => item.show)
      .forEach((item: any) => {
        if (item.message) {
          toastArray.push({
            severity: item.type,
            detail: item.message,
            life: `${
              item.type === 'error' ? TOAST_LIFE.error : TOAST_LIFE.success
            }`,
          });
        }
      });
  }

  // Handle exception related massages
  if (data.errors && Array.isArray(data.errors)) {
    const errorResponse: any = Object.values(data.errors)[0];
    if (typeof errorResponse.extensions.originalError?.message === 'string') {
      toastArray.push({
        severity: 'error',
        detail: errorResponse.extensions.originalError?.message,
        life: TOAST_LIFE.error,
      });
    } else if (Array.isArray(errorResponse.extensions.originalError?.message)) {
      errorResponse.extensions.originalError?.message.forEach((item: any) => {
        if (item.message) {
          toastArray.push({
            severity: item.type,
            detail: item.message,
            life: TOAST_LIFE.error,
          });
        }
      });
    }
  }
  // Handle rest api massages
  if (data?.message && Array.isArray(data.message)) {
    data?.message
      ?.filter((item: any) => item.show)
      .forEach((item: any) => {
        if (item.message) {
          toastArray.push({
            severity: item.type,
            detail: item.message,
            life: `${
              item.type === 'error' ? TOAST_LIFE.error : TOAST_LIFE.success
            }`,
          });
        }
      });
  }
  if (toastArray.length > 0) {
    toastRef.current.show(groupMessagesBySeverity(toastArray));
  }
};
function groupMessagesBySeverity(messageArray: any[]) {
  const messages: { [key: string]: string[] } = {
    error: [],
    success: [],
    warn: [],
    info: [],
  };
  if (messageArray.length > 0) {
    messageArray.forEach((message) => {
      const messageText = message.detail || message.content;
      switch (message.severity) {
        case 'error':
          if (!messages.error.includes(messageText)) {
            messages.error.push(messageText);
          }
          break;
        case 'success':
          if (!messages.success.includes(messageText)) {
            messages.success.push(messageText);
          }
          break;
        case 'warn':
          if (!messages.warn.includes(messageText)) {
            messages.warn.push(messageText);
          }
          break;
        case 'info':
          if (!messages.info.includes(messageText)) {
            messages.info.push(messageText);
          }
          break;
      }
    });
  }
  const result: any[] = [];
  for (const type in messages) {
    if (messages[type].length > 0) {
      result.push({
        severity: type,
        content: (
          <div>
            {messages[type].map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        ),
        life: TOAST_LIFE[type],
      });
    }
  }
  return result;
}

// the function is used to set the error message to the form fields which request through graphql

/**
 * @param data : response data
 * @param methods : form methods
 * @param moreFieldName : attribute name of object array
 * @param index: index of object array
 * @param extraName : attribute name of object
 */
export function setErrorsToForm(
  data: any,
  methods: any,
  moreFieldName: string | null = null,
  index: number | null = null,
  extraName: string = '',
) {
  const response: any = Object.values(data)[0];
  let responseData: any = {};
  // Handle dto and form level validation massages
  if (Array.isArray(response)) {
    response.forEach((res: any) => {
      if (Array.isArray(res?.extensions?.originalError?.message)) {
        res.extensions.originalError?.message?.map((message: any) =>
          Object.assign(responseData, message.error),
        );
        const getAllFields = methods.getValues();
        let toastArray = [];
        if (extraName) {
          for (const [key, value] of Object.entries(responseData)) {
            if (
              moreFieldName &&
              extraName &&
              index !== null &&
              formFieldExists(getAllFields, index, extraName, key)
            ) {
              methods.setError(
                `${moreFieldName}.${index}.${extraName}.${key}`,
                { message: `${capitalizeFirstLetter(value)}` },
              );
            }
            !keyExists(getAllFields, key) &&
              toastArray.push({
                severity: 'error',
                detail: value,
                life: TOAST_LIFE.error,
              });
          }
        } else {
          for (const [key, value] of Object.entries(responseData)) {
            methods.setError(
              moreFieldName ? `${moreFieldName}.${index}.${key}` : key,
              { message: `${capitalizeFirstLetter(value)}` },
            );
            !keyExists(getAllFields, key) &&
              toastArray.push({
                severity: 'error',
                detail: value,
                life: TOAST_LIFE.error,
              });
          }
        }
        if (toastArray.length > 0) {
          toastRef.current.show(groupMessagesBySeverity(toastArray));
        }
      }
      return res;
    });
  }
}

/**
 * if array of object add (nested) more field  then use this function with moreFieldName and extraName
 * check the key exists in form fields key means form field name
 * @param getAllFields : form methods getValues()
 * @param index : index of object array
 * @param extraName : attribute name of object
 * @param key  : form field name
 * @returns  boolean
 */

export function formFieldExists(
  getAllFields: any,
  index: number,
  extraName: string,
  key: string,
) {
  const dataArray: any = Object.values(getAllFields)[0];
  const dataObject = dataArray[index][`${extraName}`];
  return Object.keys(dataObject).includes(key);
}

export function setApiErrorsToForm(
  data: any,
  methods?: any,
  moreFieldName?: string,
  index?: number,
) {
  const messages: any = data?.data?.message;
  let errors: any = {};
  messages.map((message: any) => Object.assign(errors, message.error));
  const getAllFields = methods.getValues();
  let toastArray = [];
  // Set error message for each field
  for (const [key, value] of Object.entries(errors)) {
    methods.setError(moreFieldName ? `${moreFieldName}.${index}.${key}` : key, {
      message: `${capitalizeFirstLetter(value)}`,
    });
    // Check if field is already present in the form
    !keyExists(getAllFields, key) &&
      toastArray.push({
        severity: 'error',
        detail: value,
        life: TOAST_LIFE.error,
      });
  }
  // Show toast only if there is any error
  if (toastArray.length > 0) {
    toastRef.current.show(groupMessagesBySeverity(toastArray));
  }
}
