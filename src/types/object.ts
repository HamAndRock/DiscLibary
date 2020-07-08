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
    DISC_TABLE = "e1700939-be78-4f4c-acd2-9ceb0384041c"
}

export enum Kind {
    // @ts-ignore
    MOVIE= "Movie", GAME = "Game", SOFTWARE = "Software", MUSIC = "Music"
}
