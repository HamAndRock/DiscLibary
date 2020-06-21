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
                'Application-Key-Id': 'cLgVqyM8mXCx3SuVEcQo2bgqcQQc3oXtF7fIFkEYCOqxaUCBUH',
                'Application-Key': 'YQvV6FaPvlSyS0nxZP0qKQFDTTtoBTqlFSbQBmxKP2OdFr9U3qbBpmEUvXOXWnizbOJAk4'
            }
        }


    }

    private getInnerUrl(rootUrl = false): string {

        if (rootUrl) {
            return `https://api.hss.clouddock.cz/`
        } else {
            let organizationID = '6015787e-c0eb-4e43-8dd7-516e62a2c25b';
            return `https://api.hss.clouddock.cz/organizations/${organizationID}/` + this.getRootApi() + "/"
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
