import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import ffmpeg from "src/processors/ffmpeg";
import { VideoPreviewRequestDto } from "./video-preview-request.dto";
import path from "path"
import { dataNormalization, MediaDataTypes } from "./data-normalization";

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

                return resolve(dataNormalization({
                    filename: path.basename(format.filename!),
                    codec: stream.codec_name,
                    width: stream.width,
                    height: stream.height,
                    fps: stream.r_frame_rate,
                    size: format.size,
                    duration: format.duration,
                    ratio: stream.display_aspect_ratio
                }))
            })
        })
    }

    async transcode(filePath: string, dto: VideoPreviewRequestDto) {
        const metadata = await this.validateFile(filePath) as MediaDataTypes;

        const {
            filename, codec, duration, width, height, fps, size, ratio
        } = metadata;

        return new Promise((resolve, reject) => {
            ffmpeg(filePath)
                .outputOptions([
                    "-vf", [
                        "thumbnail=100," +
                        "split[a][b];[b]scale=320:180,boxblur=20[bg];[a]scale=320:180:force_original_aspect_ratio=decrease[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2," +

                        "drawtext=font=Arial:text='%{eif\\:t/3600\\:d\\:2}\\:%{eif\\:(mod(t\\,3600))/60\\:d\\:2}\\:%{eif\\:mod(t\\,60)\\:d\\:2}':x=220:y=h-30:fontsize=22:fontcolor=white:borderw=1:bordercolor=black," +

                        "tile=4x4:padding=2:margin=5:color=white," +
                        "pad=iw:ih+150:0:140:white," +
                        `
                        drawtext=font=Arial:text='${filename}':x=5:y=17:fontsize=28:fontcolor=black,

                        drawtext=font=Arial:text='File Size\\:':x=5:y=55:fontsize=25:fontcolor=black,
                        drawtext=font=Arial:text='${size}':x=140:y=55:fontsize=25:fontcolor=black,

                        drawtext=font=Arial:text='Resolution\\:':x=5:y=85:fontsize=25:fontcolor=black,
                        drawtext=font=Arial:text='${width}x${height}':x=140:y=85:fontsize=25:fontcolor=black,

                        drawtext=font=Arial:text='Duration\\:':x=5:y=115:fontsize=25:fontcolor=black,
                        drawtext=font=Arial:text='${duration}':x=140:y=115:fontsize=25:fontcolor=black,

                        drawtext=font=Arial:text='Ratio\\:':x=300:y=55:fontsize=25:fontcolor=black,
                        drawtext=font=Arial:text='${ratio}':x=390:y=55:fontsize=25:fontcolor=black,

                        drawtext=font=Arial:text='Codec\\:':x=300:y=85:fontsize=25:fontcolor=black,
                        drawtext=font=Arial:text='${codec}':x=390:y=85:fontsize=25:fontcolor=black,

                        drawtext=font=Arial:text='FPS\\:':x=300:y=115:fontsize=25:fontcolor=black,
                        drawtext=font=Arial:text='${fps}':x=390:y=115:fontsize=25:fontcolor=black
                        `
                    ].join(","),
                    "-frames:v", "1"
                ])
                .save(path.join(process.cwd(), "uploads", "output.png"))
                .on("end", resolve)
                .on("error", reject);
        });
    }
}