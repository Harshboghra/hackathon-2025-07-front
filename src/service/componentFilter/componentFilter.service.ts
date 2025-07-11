import request from '../../library/axios/request';

class ComponentFilterService {
  ENDPOINT = '/component';
  currentFilter: any = {};

  /**
   * Validates if a given component name and type are acceptable based on predefined valid components.
   *
   * @param {string} componentName - The name of the component to validate.
   * @param {string} componentType - The type of the component to validate.
   * @returns {boolean} - Returns true if the component is valid; otherwise, false.
   */
  private validComponent(componentName: string, componentType: string) {
    let validComponent: any = {};
    const validComponents = [
      {
        component_name: 'company_has_users',
        component_type: ['multiSelected'],
      },
      {
        component_name: 'user_list',
        component_type: ['multiSelected'],
      },
    ];
    validComponent = validComponents.find(
      (validComponent) =>
        validComponent.component_name === componentName &&
        validComponent.component_type.includes(componentType),
    )?.component_name;

    return !!validComponent;
  }

  /**
   * Clears the current filter object, resetting any stored filter values.
   */
  clearCurrentFilter = () => {
    this.currentFilter = {};
  };

  /**
   * Initializes and sets a value on a component filter if the component is valid.
   * It sends a POST request to initiate the filter on the server side.
   *
   * @param {string} component_name - The name of the component.
   * @param {any} component_value - The value to set for the component.
   * @param {string} component_type - The type of the component (default is 'multiSelected').
   * @returns {Promise<any>} - Returns the server response upon successful initiation.
   * @throws {Error} - Throws an error if the component is invalid.
   */
  async setValueOnComponentInitiate(
    component_name: string,
    component_value: any,
    component_type: string = 'multiSelected',
  ) {
    const validComponent = this.validComponent(component_name, component_type);
    if (validComponent) {
      this.storeFilter(component_name, component_value, component_type);
      const url = `${this.ENDPOINT}/initiate-filter`;
      return request({
        url,
        method: 'POST',
        data: {
          component_name,
          component_value,
          component_type: component_type,
        },
      }).then((res: any) => {
        return res.data;
      });
    } else {
      throw new Error(
        'In setValueOnComponentInitiate function, the component name is not valid.',
      );
    }
  }

  /**
   * Retrieves the value of a component filter if valid.
   * Checks currentFilter for a cached value, otherwise sends a GET request to retrieve it from the server.
   *
   * @param {string} component_name - The name of the component.
   * @param {string} component_type - The type of the component (default is 'multiSelected').
   * @returns {Promise<any>} - Returns the value of the component filter.
   * @throws {Error} - Throws an error if the component is invalid.
   */
  async getComponentValue(
    component_name: string,
    component_type: string = 'multiSelected',
  ) {
    const validComponent = this.validComponent(component_name, component_type);

    if (validComponent) {
      const url = `${this.ENDPOINT}/filter`;
      //if value is already set in currentFilter object then return the value from currentFilter object
      if (this.currentFilter[component_name]) {
        return this.currentFilter[component_name].component_value;
      } else {
        return request({
          url,
          method: 'GET',
          params: {
            componentName: component_name,
            componentType: component_type,
          },
        }).then((res: any) => {
          this.storeFilter(component_name, res.data, component_type);
          return res.data;
        });
      }
    } else {
      throw new Error(
        'In getComponentValue function, the component name is not valid.',
      );
    }
  }

  /**
   * Sets a value for a component filter if the component is valid.
   * Sends a POST request to update the component filter value on the server.
   *
   * @param {string} component_name - The name of the component.
   * @param {any} component_value - The value to set for the component.
   * @param {string} component_type - The type of the component (default is 'multiSelected').
   * @returns {Promise<any>} - Returns the server response upon successful setting of the value.
   * @throws {Error} - Throws an error if the component is invalid.
   */
  async setComponentValue(
    component_name: string,
    component_value: any,
    component_type: string = 'multiSelected',
  ) {
    const validComponent = this.validComponent(component_name, component_type);
    if (validComponent) {
      this.storeFilter(component_name, component_value, component_type);
      const url = `${this.ENDPOINT}/filter`;
      return request({
        url,
        method: 'POST',
        data: {
          component_name,
          component_value,
          component_type: component_type,
        },
      }).then((res: any) => {
        return res.data;
      });
    } else {
      throw new Error(
        'In setComponentValue function, the component name is not valid.',
      );
    }
  }

  /**
   * Stores the filter value for a specific component in the currentFilter object.
   * This function is used for caching filter values locally.
   *
   * @param {string} component_name - The name of the component.
   * @param {any} component_value - The value to store for the component.
   * @param {string} component_type - The type of the component.
   */
  private storeFilter(
    component_name: string,
    component_value: any,
    component_type: string,
  ) {
    const newFilter = {
      [component_name]: { component_value: component_value, component_type },
    };
    Object.assign(this.currentFilter, newFilter);
  }
}

export const componentFilterService = new ComponentFilterService();
