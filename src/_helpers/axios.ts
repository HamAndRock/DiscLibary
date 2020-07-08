import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export abstract class Api {
    private api: AxiosInstance;

    public constructor() {
        this.api = axios.create({});

        this.api.interceptors.response.use(undefined, (error) => {
            return Promise.reject();
        });
        this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
            ...param
        }));
    }

    public abstract getRootApi(): string;

    private static getAuthHeader(): any {

        return {
            headers: {
                'Application-Key-Id': 'nBisYl1H8ibn71E4gONFkkB4sPTVN8BrZDFWhn50lIiUCn5v8t',
                'Application-Key': '7QXUepWeleBr2fPrWbmz1mK23Buzpz2c6cPGqsxRroFnjZdQ7nsLV6tqlKqY3HcOnJv8ef'
            }
        }


    }

    private getInnerUrl(rootUrl = false): string {

        if (rootUrl) {
            return `https://clouddock.havelka.net`
        } else {
            let organizationID = '230073c0-6e00-6600-6900-72006d000000';
            return `https://clouddock.havelka.net/organizations/${organizationID}/` + this.getRootApi() + "/"
        }
    }



    public get<T, R = AxiosResponse<T>>(endpoint: string, authentication = false, rootUrl = false): Promise<R> {
        if (authentication) {
            return this.api.get(this.getInnerUrl(rootUrl) + endpoint, Api.getAuthHeader());
        } else {
            return this.api.get(this.getInnerUrl(rootUrl) + endpoint);
        }

    }

    public delete<T, R = AxiosResponse<T>>(endpoint: string, authentication = false, rootUrl = false): Promise<R> {
        if (authentication) {
            return this.api.delete(this.getInnerUrl(rootUrl) + endpoint, Api.getAuthHeader());
        } else {
            return this.api.delete(this.getInnerUrl(rootUrl) + endpoint);
        }
    }


    public post<T, R = AxiosResponse<T>>(endpoint: string, data: object, authentication = false, rootUrl = false): Promise<R> {
        if (authentication) {
            return this.api.post(this.getInnerUrl(rootUrl) + endpoint, data, Api.getAuthHeader());
        } else {
            return this.api.post(this.getInnerUrl(rootUrl) + endpoint, data);
        }
    }

    public put<T, R = AxiosResponse<T>>(endpoint: string, data: object, authentication = false, rootUrl = false): Promise<R> {
        if (authentication) {
            return this.api.put(this.getInnerUrl(rootUrl) + endpoint, data, Api.getAuthHeader());
        } else {
            return this.api.put(this.getInnerUrl(rootUrl) + endpoint, data);
        }
    }


}
