<script lang="ts">
import {defineComponent} from "vue";
import {useRoute} from "vue-router";
import {IEssence} from "@/model/model";
import {getEssencesById} from "@/services/essence";
import { marked } from 'marked';
import {createEssences, deleteEssences, upDateEssences} from "@/services/essence";
import PopUp from "@/components/PopUp/PopUp.vue";
import {router} from "@/main";

export default defineComponent({

  name: "EssencePage",
  components: {PopUp},
  data() {
    return {
      essenceData: {} as IEssence ,
      triggeredPopUpIs: false as boolean,
    }
  },
  methods: {
    async setEssenceById(id: number) {
      getEssencesById(id).then((result) => result.data).then((res) => {
        this.essenceData = {
          id: res.id,
          title: res.title,
          description: marked.parse(res.description, { async: false }),
          published: res.published, // обязательное поле
          published_from: res.published_from};
      })
    },
    checkAndSetString(title: string) {
      if (title.length > 50) {
        const arr = title.split("");
        arr.splice(50, arr.length - 50);
        title = arr.join("");
      }
    },
    save() {
      if (this.essenceData.description) {
        this.essenceData.description = JSON.stringify(this.essenceData.description);
      }

      if (this.essenceData.id) {
        upDateEssences(this.essenceData);
      } else {
        createEssences(this.essenceData);
      }
      router.push({ path: `/`});
    },
    deleteEssence() {
      if (this.essenceData.id || this.essenceData.id === 0) {
        deleteEssences(this.essenceData.id);
      }
      this.triggeredPopUpIs = false;
      router.push({ path: `/`});
    },
    triggeredPopUp() {
      this.triggeredPopUpIs = true;
    }
  },
  mounted() {
    this.essenceData.id = (Number(useRoute().params.id) || Number(useRoute().params.id) === 0) ? Number(useRoute().params.id) : undefined;
    if (this.essenceData.id) {
      this.setEssenceById(this.essenceData.id);
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
          <label for="title">title</label>
          <input v-model="essenceData.title" placeholder="title"
                 @input="checkAndSetString(essenceData.title)">
        </div>
        <div class="field">
          <label for="title">description</label>
          <input v-model="essenceData.description" placeholder="description">
        </div>
        <div class="field">
          <label for="title">published</label>
          <input v-model="essenceData.published" placeholder="published" required>
        </div>
        <div class="field">
          <label for="title">published_from</label>
          <input v-model="essenceData.published_from" placeholder="published_from">
        </div>
      </div>
      <button class="save" type="submit" @click="save()">Сохранить</button>
      <button v-if="essenceData.id || essenceData.id === 0" @click="() => triggeredPopUp()">Удалить</button>
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