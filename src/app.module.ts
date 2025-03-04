import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutCardsModule } from './about/module/about.module';
import { ProjectsModule } from './projects/module/projects.module';
import { AdminModule } from './admin/module/admin.module';
import { DatabaseModule } from './db/db.module';
import { MailModule } from './contact/module/mail.module';


@Module({
  imports: [
    AboutCardsModule, 
    ProjectsModule, 
    AdminModule, 
    DatabaseModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
