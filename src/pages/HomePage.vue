<template>
  <div class="homePage">
    <section class="headerPage">
      <div class="container">
        <h1 class="text-center">
          <span class="headerPage-title">Nhiry Lanto</span>
          <span class="headerPage-content"
            >Développeur Front-End - créateur d’expériences web élégantes et
            intuitives.</span
          >
        </h1>
        <div class="headerPage-link">
          <RouterLink :to="{ name: 'contact' }" class="btn"
            >Entrons en contact</RouterLink
          >
          <div class="copy-mail" @click.prevent="copyText">
            <span :class="iconClass"></span>{{ message }}
          </div>
        </div>
      </div>
    </section>

    <AboutPage titleTag="h2" :showSkills="false" tag="h3" />

    <ProjectPage titleTag="h2" />

    <Skills />

    <ContactPage titleTag="h2" tag="h3" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ContactPage from "./ContactPage.vue";
import ProjectPage from "./ProjectPage.vue";
import AboutPage from "./AboutPage.vue";
import Skills from "@/components/Skills.vue";

const originalText = "nhirlanto@gmail.com";
const message = ref(originalText);
const iconClass = ref("icon-copy");

const copyText = () => {
  navigator.clipboard
    .writeText(originalText)
    .then(() => {
      message.value = "Copié !";
      iconClass.value = "icon-check";

      setTimeout(() => {
        message.value = originalText;
        iconClass.value = "icon-copy";
      }, 2000);
    })
    .catch((error) => {
      console.error("Échec de la copie :", error);
    });
};
</script>

<style scoped>
.headerPage {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  padding: 50px 0;
}
@media (min-width: 768px) {
  .headerPage {
    padding: 150px 0 100px;
  }
}
@media (min-width: 992px) {
  .headerPage {
    min-height: 100vh;
  }
}
.headerPage-title {
  text-align: center;
  font-size: 5rem;
  font-family: var(--font-tertiary);
  color: var(--accent-color);
  font-weight: 700;
  font-style: italic;
  display: block;
}
@media (min-width: 768px) {
  .headerPage-title {
    font-size: 10rem;
  }
}
.headerPage-content {
  font-size: 1.6rem;
  font-family: var(--font-primary);
  color: rgb(var(--text-color));
  font-weight: 400;
  line-height: 125%;
  display: block;
  margin-top: 10px;
}
@media (min-width: 768px) {
  .headerPage-content {
    font-size: 2.4rem;
  }
}
.headerPage-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

@media (min-width: 768px) {
  .headerPage-link {
    flex-direction: row;
  }
}
.copy-mail {
  cursor: pointer;
}
.copy-mail span {
  margin-right: 10px;
}
</style>
