import {Api} from "@/_helpers/axios";
import {DTObject} from "@/types/object";
import {injectable} from "inversify";
import "reflect-metadata";


@injectable()
export class ObjectService extends Api {

    getRootApi(): string {
        return "datastorage";
    }


    public getObject<E, T = DTObject<E>>(tableID: string) : Promise<DTObject<E>[]> {
        return this.get<DTObject<E>[]>(`find-by-dataschema/${tableID}`, true).then(req => {
            return req.data;
        });
    }


    public updateObject<E, T = DTObject<E>>(objectID: string, data: object) : Promise<DTObject<E>> {
        return this.put<DTObject<E>>(objectID, {data: data}, true).then(req => {
            return req.data;
        });
    }

    public deleteObject(objectID: string) : Promise<any> {
        return this.delete<[]>(objectID,  true);
    }

    public createObject<E, T = DTObject<E>>(data: DTObject<E>) : Promise<DTObject<E>> {
        return this.post<DTObject<E>>('', data, true).then(req => {
            return req.data;
        });
    }




}
