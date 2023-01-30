import moment from "moment"

export const returnColorByJourneyTitle = (journeyTitle: string) => {
    switch (journeyTitle) {
        case "Desenvolvimento Back End":
            return 'text-red-700'
        case 'Desenvolvimento Front End':
            return 'text-emerald-700'
        case 'Habilidades Digitais':
            return 'text-purple-700'
        case 'Dados':
            return 'text-green-700'
        default:
            return 'text-gray-700'
    }
}

export const verifyTextSize = (text: string, sizeLimit = 100) => {
    if (text.length > sizeLimit)
        return text.substring(0, sizeLimit * 2) + '...'
    return text
}

export const toTimeString = (totalMiliseconds: number) => {
    const time = moment.duration(totalMiliseconds);
    const timeSegments = {
        hours: time.hours() == 0 ? '' : time.hours() + 'h',
        minutes: time.minutes() == 0 ? '' : time.minutes() + 'm',
        seconds: time.seconds() == 0 ? '' : time.seconds() + 's'
    };

    return `${timeSegments.hours} ${timeSegments.minutes} ${timeSegments.seconds}`;
}

