export const CLR_GRAY_0 = '#b9bfc0';
export const CLR_GRAY_1 = '#d8dedf';
export const CLR_RED_0 = '#df1400';
export const CLR_GREEN_0 = '#aeea00';

const githubColors = require('../../assets/githubColors.json');

export function fetchLangColor(languageName) {
    for (let key in githubColors) {
        if (key.toUpperCase() === languageName.toUpperCase()) {
            return githubColors[key].color;
        }
    }
    return CLR_GRAY_0;
}