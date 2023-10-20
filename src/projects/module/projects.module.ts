import { Module } from "@nestjs/common";
import { ProjectController } from "../adapters/primary/projects.controller";
import { ProjectsService } from "../core/application/projects.service";
import { IProjectsRepository } from "../core/repository/projects.repository";
import { InMemoryProjects } from "../adapters/secondary/inMemory/projects.inMemory";
import { AdminModule } from "src/admin/module/admin.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectSchema } from "../adapters/secondary/mongo/project.schema";
import { MongooseProjectRepository } from "../adapters/secondary/mongo/project.mongoRepo";

@Module({
    imports: [
        AdminModule,
        MongooseModule.forFeature([{ name: 'projects', schema: ProjectSchema }]),
    ],
    controllers: [ProjectController],
    providers: [
        { provide: ProjectsService, useFactory: (repository: IProjectsRepository) => new ProjectsService(repository), inject: ['PROJECTS_REPOSITORY'] },
        { provide: 'PROJECTS_REPOSITORY', useClass: MongooseProjectRepository }
    ]
})

export class ProjectsModule {}