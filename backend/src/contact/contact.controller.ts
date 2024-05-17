import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './contact.dto';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  
  @Post()
  async sendEmail(@Body() createContactDto: CreateContactDto) {
    await this.contactService.sendEmail(createContactDto);
  }
}