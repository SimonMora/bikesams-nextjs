import { ENV } from "../constants";

export function getImageUrl(imageName) {
    return `${ENV.MEDIA_URL}/${imageName}.jpg`;
}