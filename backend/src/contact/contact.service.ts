import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from './contact.dto';
import { messageResponse, messageRequire } from 'src/hooks/messageEmail';

@Injectable()
export class ContactService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: `${process.env.NODEMAILER_HOST}`,
            port: `${process.env.NODEMAILER_PORT}`,
            secure: `${process.env.NODEMAILER_SECURE}`,
            auth: {
                user: `${process.env.NODEMAILER_USER}`,
                pass: `${process.env.NODEMAILER_PASSWORD}`,
            },
        });
    }

    async sendEmail(createContactDto: CreateContactDto): Promise<void> {
        const emailSettings = {
            email: {req: `${process.env.NODEMAILER_USER}`, res: `${createContactDto.email}`},
            subject: { req: 'Urbano - Recibimos tu consulta', res: "Urbano - Consulta de un usuario" },
        };
        const { email, subject} = emailSettings;
        await this.transporter.sendMail({from: email.req, to: email.res, subject: `${subject.req}`, html: messageResponse(createContactDto)});
        await this.transporter.sendMail({from: email.req, to: email.req, subject: `${subject.res}`, html: messageRequire(createContactDto)});
    }
}