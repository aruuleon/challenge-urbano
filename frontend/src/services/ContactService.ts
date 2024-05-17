import CreateContactRequest from '../models/contact/CreateContactRequest';
import apiService from './ApiService';

class ContactService {
  async sendEmail(createContactRequest: CreateContactRequest): Promise<void> {
    await apiService.post('/api/contacts', createContactRequest);
  }
}

export default new ContactService();