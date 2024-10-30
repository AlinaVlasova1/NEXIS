import {CreateEntityRequest, UpdateEntityRequest} from "@/model/model";
import axios from "axios";

const baseUrl = `baseURL`

export class EntityService {

    getAllEntities() {
        const requestUrl = new URL(baseUrl);
        // requestUrl.pathname += `pathname` добавляем путь при наличии
        // this.appendDefaultQueryParams(requestUrl, 'paramName', 'param');
        return axios.get(requestUrl.toString()); //Запрос на получение всех сущностей для отображения в лист
    }

    getEntitiesById(id: number) {
        const requestUrl = new URL(baseUrl);
        // requestUrl.pathname += `pathname`
        // this.appendDefaultQueryParams(requestUrl, 'paramName', 'param');
        return axios.get(`${requestUrl.toString()}${id}`); //Запрос на сущность по id;
    }

    updateEntities(body: UpdateEntityRequest) {
        const requestUrl = new URL(baseUrl);
        // requestUrl.pathname += `pathname`
        // this.appendDefaultQueryParams(requestUrl, 'paramName', 'param');
        return axios.put(requestUrl.toString(), body); //Запрос на обновление сущности;
    }

    createEntities(body: CreateEntityRequest) {
        const requestUrl = new URL(baseUrl);
        // requestUrl.pathname += `pathname`
        // this.appendDefaultQueryParams(requestUrl, 'paramName', 'param');
        return axios.post(requestUrl.toString(), body); //Запрос на создание сущности;
    }

    deleteEntities(id: number) {
        const requestUrl = new URL(baseUrl);
        // requestUrl.pathname += `pathname`
        // this.appendDefaultQueryParams(requestUrl, 'paramName', 'param');
        return axios.delete(requestUrl.toString(), {data: id} ); //Запрос на удаление сущности по id;
    }

    appendDefaultQueryParams(requestUrl: URL, paramName: string, param: string) {
        requestUrl.searchParams.append(paramName, param) //Добавляем параметры запроса при наличии
    }
}

