import AboutPage from "./pages/AboutPage.vue";
import ContactPage from "./pages/ContactPage.vue";
import HomePage from "./pages/HomePage.vue";
import ProjectPage from "./pages/ProjectPage.vue";

export const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/projets', component: ProjectPage, name: 'projet'},
    {path: '/about', component: AboutPage, name: 'about'},
    {path: '/contact', component: ContactPage, name: 'contact'},
]