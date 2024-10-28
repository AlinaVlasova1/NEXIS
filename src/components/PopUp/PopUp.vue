<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "PopUp",
  props: ['triggeredPopUpIs']
})
</script>

<template>
  <div class="pop-up">
    <div class="pop-up-inner">
      <h1>Подтвердите удаление</h1>
      <button style="margin-right: 10px" @click="$emit('delete')" >Удалить</button>
      <button @click="$emit('triggeredPopUpIs')">Зкрыть</button>
    </div>
  </div>

</template>

<style>
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-up-inner {
  background: #FFF;
  padding: 50px;
}


</style>