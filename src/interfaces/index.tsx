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

export interface Course {
    journeyId?: string;
    medias:{
        thumb: string;
    }
    title: string;
    description: string;
    status: "published" | "pending";
    instructor: string;
    tags: string[];
    duration: number;
    level: string;
    id: string;
    extras: string[];
    modules: Module[];
    courseCreatedAt: {
        $date: string;
    }
    courseUpdatedAt: {
        $date: string;
    }
}

export interface Module {
    lessonsID: string[];
    order: Array<{lessonID: string}>;
    title: string;
    description: string;
}