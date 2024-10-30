import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import List from "@/components/List/List.vue";
import EntityPage from "@/components/Entity/Entity.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: List,
        },
        {
            path: "/entity/:id",
            name: "Entity",
            component: EntityPage
        },
    ]});

createApp(App).use(router).mount('#app')
