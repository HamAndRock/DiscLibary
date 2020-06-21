import "reflect-metadata"
import {injectable} from "inversify";
import {Disc, DiskType, DTObject, Kind} from "@/types/object";

@injectable()
export class DiskManager {

    public * getKinds() {
        for (let kind in Kind) yield {text: Kind[kind as keyof typeof Kind], value: kind}
    }

    public * getTypes() {
        for (let diskType in DiskType) yield {text: DiskType[diskType as keyof typeof DiskType], value: diskType}
    }

    public createEmptyDisc() : DTObject<Disc> {
        return {
            data: {
                title: "",
                amount: 1,
                kind: undefined,
                release: 2000,
                type: undefined,
            },
            id: ""
        }
    }

}
