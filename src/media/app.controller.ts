import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multer } from 'src/processors/multer';
import { AppService } from './app.service';
import { VideoPreviewRequestDto } from './video-preview-request.dto';

@Controller("api")
export class AppController {
    constructor(private mediaService: AppService) { }

    @Post("image/convert")
    @UseInterceptors(FileInterceptor("file", multer))
    async handler(@UploadedFile() file: Express.Multer.File, @Body() dto: VideoPreviewRequestDto) {
        const output = await this.mediaService.execute(dto);
    }
}