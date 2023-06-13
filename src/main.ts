import { createApp } from 'vue'
import store from './store';
import router from './router';
import {
    ElMain,
    ElContainer,
    ElHeader,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElInput,
    ElFormItem,
    ElButton,
    ElForm
} from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css';

const app = createApp(App);

app
    .use(store)
    .use(router)
    .use(ElContainer)
    .use(ElHeader)
    .use(ElMain)
    .use(ElBreadcrumb)
    .use(ElBreadcrumbItem)
    .use(ElInput)
    .use(ElButton)
    .use(ElForm)
    .use(ElFormItem)
    .mount('#app')