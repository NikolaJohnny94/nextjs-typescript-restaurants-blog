import { StaticPaths } from './staticpaths.interface'

export interface StaticPathsResponse {
    paths: StaticPaths[],
    fallback: boolean
}