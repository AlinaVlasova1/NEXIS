import {IEssence} from "@/model/model";
import axios from "axios";

export function getAllEssences() {
    return axios.get("url"); //Запрос на получение всех сущностей для отображения в лист
}

export function getEssencesById(id: number) {
    return axios.get(`url/${id}`); //Запрос на сущность по id;
}

export function upDateEssences(body: IEssence) {
    axios.put('url', body); //Запрос на обновление сущности;
}

export function createEssences(body: IEssence) {
    axios.post('url', body); //Запрос на создание сущности;
}

export function deleteEssences(id: number) {
    return axios.delete('url', {data: id} ); //Запрос на удаление сущности по id;
}