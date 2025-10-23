<script setup>
import { useInView } from "@/assets/js/useInView";
import BigTitle from "./BigTitle.vue";
import { ref } from "vue";

const { el, inView } = useInView();

const skills = ref([
  {
    icon: "icon-html5",
    title: "HTML5",
  },
  {
    icon: "icon-css",
    title: "CSS",
  },
  {
    icon: "icon-javascript",
    title: "Javascript",
  },
  {
    icon: "icon-tailwindcss",
    title: "Tailwind CSS",
  },
  {
    icon: "icon-vuedotjs",
    title: "Vue.js",
  },
  {
    icon: "icon-photoshop",
    title: "Photoshop",
  },
  {
    icon: "icon-xd",
    title: "Adobe XD",
  },
  {
    icon: "icon-illustrator",
    title: "Illustrator",
  },
  {
    icon: "icon-figma",
    title: "Figma",
  },
  {
    icon: "icon-php",
    title: "PHP",
  },
  {
    icon: "icon-wordpress",
    title: "Wordpress",
  },
  {
    icon: "icon-git",
    title: "Git",
  },
  {
    icon: "icon-github",
    title: "Github",
  },
]);
</script>

<template>
  <section class="skills d-flex align-items-center">
    <div class="container" ref="el">
      <BigTitle text="Compétences" />
      <TransitionGroup
        class="skillList"
        tag="ul"
        v-if="inView"
        name="slide-fade"
        appear
      >
        <li
          v-for="(skill, index) in skills"
          :key="index"
          :style="{ '--d': `${index * 120}ms` }"
        >
          <span :class="skill.icon"></span>
          {{ skill.title }}
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.skillList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}
.skillList li {
  flex: 0 0 calc(50% - 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 20px;
  border: 1px solid rgb(var(--bg-color-secondary) / 80%);
  background-color: rgb(var(--bg-color-secondary) / 30%);
  backdrop-filter: blur(16px);
  font-family: var(--font-primary);
  border-radius: 8px;
}
@media (min-width: 768px) {
  .skillList li {
    flex: 0 0 calc(25% - 20px);
  }
}
.skillList li:hover {
  transform: scale(1.05);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
  transition: all 0.3s;
}
.skillList li span {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.skills {
  padding: 50px 0;
}
@media (min-width: 768px) {
  .skills {
    padding: 75px 0;
  }
}
@media (min-width: 992px) {
  .skills {
    padding: 150px 0 100px;
    min-height: 100vh;
  }
}
</style>
