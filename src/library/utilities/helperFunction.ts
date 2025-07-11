import { ORDER_TYPE, EMAIL_REGEXP, PASSWORD_REGEX } from './constant';
import { fileService } from '../../service/file/file.service';
import {
  IOptions,
  IRules,
} from '../../components/form/formInterface/forms.model';
import { IIntegrationFlow } from '../../pages/Integration/Integration.model';

// create function for show input error on form submit
export const inputValidator = (validationRules: IRules, field: string) => {
  const { required, minLength, maxLength, max, min, disabled, patterns } =
    validationRules;
  const rules: IRules = {};
  if (required) {
    Object.assign(rules, { required: `${field} is required` });
  }
  if (maxLength) {
    Object.assign(rules, {
      maxLength: { value: maxLength, message: 'This input exceed maxLength.' },
    });
  }
  if (minLength) {
    Object.assign(rules, {
      minLength: { value: minLength, message: 'This input exceed minLength.' },
    });
  }
  if (max) {
    Object.assign(rules, { max: max });
  }
  if (min) {
    Object.assign(rules, { min: min });
  }
  if (disabled) {
    Object.assign(rules, { disabled: true });
  }
  if (patterns) {
    switch (patterns) {
      case 'email':
        Object.assign(rules, {
          pattern: {
            value: EMAIL_REGEXP,
            message: 'Invalid email address. E.g. example@email.com',
          },
        });
        break;
      case 'password':
        Object.assign(rules, {
          pattern: {
            value: PASSWORD_REGEX,
            message:
              'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
          },
        });
        break;
      default:
        break;
    }
  }
  return rules;
};

export const statusTemplate = (option: boolean) => {
  if (option) {
    return 'Active';
  } else {
    return 'InActive';
  }
};
export const compactAndLowerText = (text: string) => {
  return text?.replace(/\s/g, '')?.toLocaleLowerCase();
};

export const dateTemplate = (options: any) => {
  const date = new Date(Number(options)).toLocaleString();
  return date;
};

export const snakeToPascal = (str: string) => {
  return str
    .replace(/_([a-z])/g, function (_, letter) {
      return ' ' + letter.toUpperCase();
    })
    .replace(/^[a-z]/, function (letter) {
      return letter.toUpperCase();
    });
};

// verify all value of an array is exist in target array
export const verifyArray = (value: any[], target: any[]) => {
  let result = true;
  if (value && target) {
    value.forEach((element: any) => {
      if (!target.includes(element)) {
        result = false;
      }
    });
  }
  return result;
};

// create this function for option set in dropdown
export const createOptionsForDropDown = (
  data: any,
  label: string,
  value: string,
) => {
  const options: IOptions[] = [];
  data?.filter((f: any) => options.push({ label: f[label], value: f[value] }));
  return options;
};

//create function for merging two object
//check key exists in object or not
export const keyExists = (obj: any, key: any) => {
  if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
    return false;
  } else if (obj.hasOwnProperty(key)) {
    return true;
  } else if (Array.isArray(obj)) {
    for (const element of obj) {
      const result: any = keyExists(element, key);
      if (result) {
        return result;
      }
    }
  } else {
    for (const k in obj) {
      const result: any = keyExists(obj[k], key);
      if (result) {
        return result;
      }
    }
  }

  return false;
};

export const getBase64 = (file: any): Promise<string | null> | null => {
  if (file && file.length > 0) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        console.error('Error reading the file:', error);
        reject(error);
      };

      reader.readAsDataURL(file[0]);
    });
  } else {
    return null;
  }
};

export const newAttributeObject = (
  obj: any,
  name: string,
  index: number | string,
  initialValue?: string | string[] | boolean | number,
  rules?: IRules,
  label?: string,
  options?: IOptions[],
) => {
  const altObj = Object.fromEntries(
    Object.entries(obj).map(([key, value]: any) => {
      const newValue = { ...value };
      if (initialValue) {
        newValue.initialValue = initialValue;
      }

      if (rules) {
        newValue.rules = rules;
      }

      if (label) {
        newValue.label = label;
      }

      if (options) {
        newValue.options = options;
      }

      return [[`${name}.${index}.${key}`], newValue];
    }),
  );
  return altObj;
};

//get data sorted order
export function GetSortedOrder(props: any, order?: string) {
  if (order === ORDER_TYPE.DESC) {
    return function (a: any, b: any) {
      if (a[props] > b[props]) {
        return -1;
      } else if (a[props] < b[props]) {
        return 1;
      }
      return 0;
    };
  } else {
    return function (a: any, b: any) {
      if (a[props] > b[props]) {
        return 1;
      } else if (a[props] < b[props]) {
        return -1;
      }
      return 0;
    };
  }
}

export const getImageFromFileId = async (fileId: number, type?: string) => {
  try {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async (e: any) => {
        try {
          const imageResponse = await fetch(e.target.result);
          const xmlResponse = await fetch(e.srcElement.result);
          const xml = await xmlResponse.text();
          const finalURL = type === 'xml' ? xml : imageResponse.url;

          return resolve(finalURL);
        } catch (fetchError) {
          reject(fetchError);
        }
      };

      fileService.getFile(fileId).then((res) => {
        reader.readAsDataURL(res);
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const capitalizeFirstLetter = (string: any) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const logStatusTemplate = (option: boolean) => {
  if (option) {
    return 'Success';
  } else {
    return 'Failed';
  }
};

export const convertEnabledFlowsIntoAnArray = (flows: {
  [key: string]: IIntegrationFlow;
}): IIntegrationFlow[] => {
  const flowArray: IIntegrationFlow[] = [];
  Object.entries(flows).forEach(([key, value]) => {
    if (value.active) {
      flowArray.push({
        id: value.id || null,
        flow_key: key,
        flow_extra_field: JSON.stringify({}),
        cron_frequancy_in_minutes: value.cron_frequancy_in_minutes ?? null,
        active: value.active,
      });
    }
  });
  return flowArray;
};
