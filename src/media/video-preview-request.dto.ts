import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString } from "class-validator";

export class VideoPreviewRequestDto {
    @IsOptional()
    @IsNumber()
    @Transform((data) => Number(data.value))
    @IsIn(["4", "8", "12", "16", "20", "24"])
    frameCount?: number;

    @IsOptional()
    @IsString()
    @IsIn(["uniform", "keyframes", "scene_detect"])
    samplingMode?: string;

    @IsOptional()
    @IsNumber()
    @Transform((data) => Number(data.value))
    initialTime?: number;

    @IsOptional()
    @IsNumber()
    @Transform((data) => Number(data.value))
    endTime?: number;

    @IsOptional()
    @IsString()
    backgroundColor?: string;

    @IsOptional()
    @IsBoolean()
    @Transform((data) => Boolean(data.value))
    overlayTimestamp?: boolean;

    @IsOptional()
    @IsBoolean()
    @Transform((data) => Boolean(data.value))
    includeMetadata?: boolean;

    @IsOptional()
    @IsString()
    @IsIn(["jpg", "pgn", "webp"])
    outputFormat?: number;
}