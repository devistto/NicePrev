import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import ffmpeg from "src/processors/ffmpeg";
import { VideoPreviewRequestDto } from "./video-preview-request.dto";
import path from "path"
import fs from "fs"

export class PreviewService {
    private validateFile(filePath: string) {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) return reject(
                    new BadRequestException("Unable to access file metadata")
                );

                const format = metadata.format;

                if (!format.format_name) return reject(
                    new UnauthorizedException("Unable to identify file format")
                )

                const stream = metadata.streams.find(
                    (format) => format.codec_type === "video"
                );

                if (!stream) {
                    return reject(
                        new BadRequestException("Invalid video file")
                    )
                };

                return resolve({
                    fps: stream.r_frame_rate,
                    bitrate: format.bit_rate,
                    ratio: stream.display_aspect_ratio,
                    duration: format.duration,
                    codec: stream.codec_name,
                    name: path.basename(format.filename!),
                    size: format.size,
                    resolution: `${stream.width}x${stream.height}`,
                })
            })
        })
    }

    async transcode(filePath: string, dto: VideoPreviewRequestDto) {
        const metadata = await this.validateFile(filePath);
        console.log(metadata)
    }
}