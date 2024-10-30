<script lang="ts">
import {defineComponent} from "vue";
import {EntityResponse} from "@/model/model";
import {router} from "@/main";
import _ from 'lodash';
import {EntityService} from "@/services/entity-service";

export default defineComponent({
  name: 'ListPage',
  data() {
    return {
      titleArr: [] as string[],
      objectArrDisplay: [] as Array<EntityResponse>,
      objectArrAll: [] as Array<EntityResponse>,
      object: {
        id: 0,
        title: "заголовок",
        description: "text",
        published: true,
        published_from: "2019-10-01"
      } as EntityResponse,
      searchName: '' as string,
      entityService: new EntityService(),
    }
  },
  methods: {
    router() {
      return router
    },
    setTitleArr() {
      this.titleArr = Object.keys(this.object);
    },
    async setObjArr() {
      const response = await this.entityService.getAllEntities();
      this.objectArrDisplay = await response.data;
      this.objectArrAll = _.cloneDeep(this.objectArrDisplay)
    },
    getEssenceByTitle() {
      if (this.searchName !== "" && this.searchName) {
        this.objectArrDisplay = this.objectArrAll.filter((el) => el.title ? el.title.toLowerCase().includes(this.searchName.toLowerCase()) : false);
      } else {
        this.objectArrDisplay = _.cloneDeep(this.objectArrAll)
      }
    }
  },
  created() {
    this.setTitleArr();
    this.setObjArr();
  }
})
</script>

<template>
  <div>
    <h1>Список сущностей</h1>
    <div class="container">
      <div class="search">
        <input placeholder="Поиск по title" v-on:keyup="getEssenceByTitle()" v-model="searchName">
      </div>
      <table>
        <tbody>
        <tr>
          <th class="column" v-for="(key, index) in titleArr" :key="index" >{{key}}</th>
        </tr>
        <tr v-for="(object, index) in objectArrDisplay" :key="index" class="active"
            @click="router().push({ path: `/entity/${object.id}`})">
          <td class="column" v-for="(keyObj, index) in titleArr" :key="index">{{object[keyObj]}}</td>
        </tr>
        </tbody>
      </table>
      <button class="btn" @click="router().push({ path: `/entity/${undefined}`})">Создать сущность</button>
    </div>
  </div>
</template>

<style>

.container {
  margin-right: auto;
  margin-left: auto;
  display: inline-flex;
  align-items: start;
}

table {
  border-collapse: collapse;

  .column {
    border: 1px solid black;
    padding: 10px;
  }

  .active:hover {
    background-color: cadetblue;
  }
}

.btn {
  padding: 10px;
  margin-left: 10px;
}

.search {
  margin-right: 10px;

  input {
    padding: 5px;
  }
}

</style>