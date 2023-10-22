import { Body, Controller, Post, Query } from '@nestjs/common';
import { MailService } from 'src/contact/core/application/mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly sendgridService: MailService) {}

    @Post('send')
    async sendEmail(@Query('email') email, @Body() mailData: { email: string, name: string, phone: string, message: string }){
        const mail = {
            to: email,
            subject: 'Contact depuis portfolio',
            from: 'agentheo0@gmail.com',
            text: `Email:${mailData.email}\nName: ${mailData.name}\nPhone: ${mailData.phone}\nMessage: ${mailData.message}`,
            html: `
                <p><strong>Email:</strong> ${mailData.email}</p>
                <p><strong>Nom:</strong> ${mailData.name}</p>
                <p><strong>Phone:</strong> ${mailData.phone}</p>
                <p><strong>Message:</strong> ${mailData.message}</p>`,
        };
          return await this.sendgridService.send(mail);
    }
}