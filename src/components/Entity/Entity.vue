<script lang="ts">
import {defineComponent} from "vue";
import {useRoute} from "vue-router";
import {EntityResponse} from "@/model/model";
import {EntityService} from "@/services/entity-service";
import { marked } from 'marked';
import PopUp from "@/components/PopUp/PopUp.vue";
import {router} from "@/main";

export default defineComponent({

  name: "EntityPage",
  components: {PopUp},
  data() {
    return {
      entityData: {} as EntityResponse ,
      triggeredPopUpIs: false as boolean,
      entityService: new EntityService(),
    }
  },
  methods: {
    async setEntityById(id: number) {
      this.entityService.getEntitiesById(id).then((result) => result.data).then((res) => {
        this.entityData = {
          id: res.id,
          title: res.title,
          description: marked.parse(res.description, { async: false }),
          published: res.published, // обязательное поле
          published_from: res.published_from};
      })
    },
    async save() {
      if (this.entityData.description) {
        this.entityData.description = JSON.stringify(this.entityData.description);
      }

      if (this.entityData.id) {
        await this.entityService.updateEntities(this.entityData);
        await router.push({ path: `/`});
      } else {
        await this.entityService.createEntities(this.entityData);
        await router.push({ path: `/`});
      }
    },
    async deleteEssence() {
      if (this.entityData.id || this.entityData.id === 0) {
        await this.entityService.deleteEntities(this.entityData.id);
      }
      this.triggeredPopUpIs = false;
      await router.push({ path: `/`});
    },
    triggeredPopUp() {
      this.triggeredPopUpIs = true;
    }
  },
  async mounted() {
    if (Number(useRoute().params.id) || Number(useRoute().params.id) === 0) {
      await this.setEntityById(this.entityData.id);
    }
  },
})

</script>

<template>
  <div>
    <h1>Сущность</h1>
    <form @submit.prevent="save()">
      <div class="essence">
        <div class="field">
          <p v-if="entityData.title?.length > 50">
            <b>Длина title е может превышать 50 символов</b>
          </p>
          <label for="title">title</label>
          <input type="text" v-model="entityData.title"  placeholder="title">
        </div>
        <div class="field">
          <label for="title">description</label>
          <input v-model="entityData.description" placeholder="description">
        </div>
        <div class="field">
          <label for="title">published</label>
          <input v-model="entityData.published" placeholder="published" required>
        </div>
        <div class="field">
          <label for="title">published_from</label>
          <input v-model="entityData.published_from" placeholder="published_from">
        </div>
      </div>
      <button class="save" type="submit" @click="save()" :disabled="entityData.title?.length > 50">Сохранить</button>
      <button v-if="entityData.id || entityData.id === 0" @click="() => triggeredPopUp()">Удалить</button>
    </form>
  </div>
  <PopUp v-if="triggeredPopUpIs"
         :triggeredPopUpIs="triggeredPopUpIs"
         @delete="deleteEssence()"
         @triggered-pop-up-is="triggeredPopUpIs = false" ></PopUp>
</template>

<style>
.field {
  margin-bottom: 10px;
}

.field label {
  display: inline-block;
  margin-right: 10px;
  width: 110px;
  text-align: left;
}

.field input {
  padding: 5px;
}

.save {
  margin-right: 10px;
}
</style>