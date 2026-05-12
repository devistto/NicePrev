import { Injectable } from "@nestjs/common";
import { VideoPreviewRequestDto } from "./video-preview-request.dto";
import { PreviewService } from "./preview.service";

@Injectable()
export class AppService {
    constructor(private previewService: PreviewService) { }

    async execute(filePath: string, dto: VideoPreviewRequestDto) {
        this.previewService.transcode(filePath, dto)
    }
}