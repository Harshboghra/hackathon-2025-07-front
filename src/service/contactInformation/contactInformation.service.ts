class ContactInformationService {
  CONTACT_INFORMATION = {
    email: 'support@saasinnova.com',
  };

  async getContactInformation() {
    return this.CONTACT_INFORMATION;
  }
}

export const contactInformationService = new ContactInformationService();
