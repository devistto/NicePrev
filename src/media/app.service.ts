import { Injectable } from "@nestjs/common";
import { VideoPreviewRequestDto } from "./video-preview-request.dto";

@Injectable()
export class AppService {
    constructor(
    ) { }

    async execute(dto: VideoPreviewRequestDto) {}
}