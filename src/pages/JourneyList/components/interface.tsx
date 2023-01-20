export interface Journey {
    pathID: string;
    title: string;
    description: string;
    medias: {
        thumb: string;
        banner: string;
        poster: string;
    }
    group: string;
    slug: JourneySlug;
    coursesID: string[];
}

export enum JourneySlug {
    "jornada-desenvolvimento-back-end",
    "jornada-desenvolvimento-front-end",
    "habilidades-digitais",
    "jornada-de-dados"
}