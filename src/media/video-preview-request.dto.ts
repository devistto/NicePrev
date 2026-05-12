import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsNumber, IsString } from "class-validator";

export class VideoPreviewRequestDto {
    @IsNumber()
    @Transform((data) => Number(data.value))
    @IsIn(["4", "8", "12", "16", "20", "24"])
    frameCount?: number;

    @IsString()
    @IsIn(["uniform", "keyframes", "scene_detect"])
    samplingMode?: string;

    @IsNumber()
    @Transform((data) => Number(data.value))
    initialTime?: number;

    @IsNumber()
    @Transform((data) => Number(data.value))
    endTime?: number;

    @IsString()
    backgroundColor?: string;

    @IsBoolean()
    @Transform((data) => Boolean(data.value))
    overlayTimestamp?: boolean;

    @IsBoolean()
    @Transform((data) => Boolean(data.value))
    includeMetadata?: boolean;

    @IsString()
    @IsIn(["jpg", "pgn", "webp"])
    outputFormat?: number;
}