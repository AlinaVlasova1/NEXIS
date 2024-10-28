import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import List from "@/components/List/List.vue";
import Essence from "@/components/ Essence/Essence.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: List,
        },
        {
            path: "/essence/:id",
            name: "Essence",
            component: Essence
        },
    ]});

createApp(App).use(router).mount('#app')
