export type Disc = {
    amount: number,
    release: number,
    title: string,
    type?: DiskType,
    kind?: Kind,
}

export type DTObject<E> = {
    id?: string,
    data: E,
    dataschema?: string
}

export enum DiskType {
    // @ts-ignore
    BLUERAY = "BlueRay", DVD = "DVD", CD = "CD"
}

export enum Tables {
    DISC_TABLE = "7ac5c765-e5f1-4fa6-b03f-618e33ff1430"
}

export enum Kind {
    // @ts-ignore
    MOVIE= "Movie", GAME = "Game", SOFTWARE = "Software", MUSIC = "Music"
}
