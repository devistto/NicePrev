import { filesize } from "filesize"

export type MediaDataTypes = {
    filename?: string;
    codec?: string;
    width?: number;
    height?: number;
    fps?: string;
    size?: any;
    duration?: any;
    ratio?: string;
}

export const dataNormalization = (metadata: MediaDataTypes) => {
    metadata.filename = metadata?.filename?.trim().replaceAll(/\s+/g, " ");
    metadata.codec = metadata?.codec?.trim().toLowerCase();

    metadata.height = metadata.height || 0;
    metadata.width = metadata.width || 0;

    metadata.ratio = metadata?.ratio?.replace("/", ":").replace(":", "\\:");
    metadata.fps = metadata.fps?.slice(0, 2) || "0";

    if (metadata.duration)
        metadata.duration = new Date(metadata.duration * 1000)
            .toISOString()
            .slice(11, 19)
            .replaceAll(":", "\\:");

    else metadata.duration = "00\\:00\\:00"

    if (metadata.size)
        metadata.size = filesize(metadata.size);

    return metadata
}