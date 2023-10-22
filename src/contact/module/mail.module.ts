import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from '../core/application/mail.service';
import { MailController } from '../adapters/primary/mail.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [MailController],
    providers: [MailService],
    imports:[ConfigModule.forRoot()]
})

export class MailModule {}
