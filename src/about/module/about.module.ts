import { Module } from "@nestjs/common";
import { AboutController } from "../adapters/primary/about.controller";
import { InMemoryAboutCards } from "../adapters/secondary/inMemory/about.inMemory";
import { AboutCardsService } from "../core/application/about.service";
import { IAboutCardsRepository } from "../core/repository/about.repository";
import { AdminModule } from "src/admin/module/admin.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseAboutRepository } from "../adapters/secondary/mongo/about.mongoRepo";
import { AboutEntities, AboutSchema } from "../adapters/secondary/mongo/about.schema";


@Module({
    imports:[
        AdminModule,
        MongooseModule.forFeature([{ name: 'AboutEntities', schema: AboutSchema }]),
    ],
    controllers: [AboutController],
    providers: [
        { provide: AboutCardsService, useFactory: (repository: IAboutCardsRepository) => new AboutCardsService(repository), inject: ['ABOUT_REPOSITORY'] },
        { provide: 'ABOUT_REPOSITORY', useClass: MongooseAboutRepository }
    ]
})

export class AboutCardsModule {}