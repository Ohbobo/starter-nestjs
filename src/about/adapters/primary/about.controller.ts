import { Body, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AboutCardsService } from 'src/about/core/application/about.service';
import { CreateAboutCard, UpdateAboutCardDto } from 'src/about/core/dto/about.dto';
import { IAboutCard } from 'src/about/core/interface/about.inteface';
import { AuthGuard } from 'src/admin/adapters/secondary/middleware/authGuard/Auth.guard';

@Controller('about')
export class AboutController {
    constructor(private readonly aboutService: AboutCardsService) {}

    @Get()
    async getAllCards(): Promise<IAboutCard[]> {
        return this.aboutService.getAllCard();
    }

    @Post()
    @UseGuards(AuthGuard)
    async createCard(@Body() createCardDto: CreateAboutCard): Promise<IAboutCard> {
        return this.aboutService.createCard(createCardDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updateCard(@Param('id') id: string, @Body() updateAboutCardDto: UpdateAboutCardDto): Promise<void> {
        await this.aboutService.updateBook(id, updateAboutCardDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteCard(@Param('id') id: string): Promise<void> {
        await this.aboutService.deleteCard(id);
    }
}
