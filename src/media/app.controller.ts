import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multer } from 'src/processors/multer';
import { AppService } from './app.service';
import { VideoPreviewRequestDto } from './video-preview-request.dto';

@Controller("api")
export class AppController {
    constructor(private mediaService: AppService) { }

    @Post("video")
    @UseInterceptors(FileInterceptor("file", multer))
    async handler(@UploadedFile() file: Express.Multer.File, @Body() dto: VideoPreviewRequestDto) {
        if (!file) throw new BadRequestException("File is missing");
        const output = await this.mediaService.execute(file.path, dto);
    }
}