import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export interface Icon {
    id: number
    iconName: IconDefinition,
    url: string,
    title: string,
    className: string
}