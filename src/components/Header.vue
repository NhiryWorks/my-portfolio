<template>
  <header class="header">
    <nav :class="{ open: isOpen }">
      <RouterLink :to="{ name: 'home' }" @click="closeMenu" class="nav-link"
        >Accueil</RouterLink
      >
      <RouterLink :to="{ name: 'projet' }" @click="closeMenu" class="nav-link"
        >Projets</RouterLink
      >
      <RouterLink :to="{ name: 'about' }" @click="closeMenu" class="nav-link"
        >À propos</RouterLink
      >
      <RouterLink :to="{ name: 'contact' }" @click="closeMenu" class="nav-link"
        >Contact</RouterLink
      >
    </nav>
    <button
      :class="{ active: isOpen }"
      class="menuBurger"
      @click.prevent="toggleMenu"
    >
      <span></span>
    </button>
    <button @click.prevent="toggleTheme" class="darkMode">
      <span :class="{ 'icon-sun': isDark, 'icon-moon': !isDark }"></span>
    </button>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";

const isDark = ref(false);
const isOpen = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "");
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDark.value = true;
    document.documentElement.classList.toggle("dark", isDark.value);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    isDark.value = true;
    document.documentElement.classList.toggle("dark", isDark.value);
  }
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.header {
  position: fixed; /* fixed */
  top: 1.6rem; /* top-4 -> 16px */
  display: flex; /* flex */
  width: 100%; /* w-full */
  align-items: center; /* items-center */
  justify-content: flex-start; /* justify-end */
  padding: 0 30px;
  gap: 10px;
  z-index: 10;
}

/* Équivalent de "md:justify-[initial]" et "md:justify-center" */
@media (min-width: 768px) {
  .header {
    justify-content: space-between; /* md:justify-[initial] */
  }
}

nav {
  background-color: rgb(var(--bg-color-secondary) / 30%);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9; /* z-[9] */
  display: flex; /* flex */
  flex-direction: column; /* flex-col */
  height: 100vh; /* h-screen */
  width: 100%; /* w-full */
  padding: 50px 30px; /* px-[30px] py-[50px] */
  backdrop-filter: blur(12px); /* backdrop-blur-[12px] */
  transition: transform 0.3s ease-in-out; /* transition duration-300 ease-in-out */
  transform: translateX(100%); /* par défaut fermé */
}

/* État ouvert */
nav.open {
  transform: translateX(0);
}

/* Responsive (md = min-width: 768px) */
@media (min-width: 768px) {
  nav {
    position: initial;
    top: initial;
    right: initial;
    height: auto;
    width: max-content;
    flex-direction: row;
    align-items: center;
    border: 1px solid rgb(var(--bg-color-secondary) / 30%); /* md:border-surface/30 */
    border-radius: 50px; /* md:rounded-[50px] */
    padding: 0 20px;
    margin: 0 auto;
    gap: 30px;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.16); /* md:shadow-[...] */
    backdrop-filter: blur(12px); /* md:backdrop-blur-[12px] */
    transform: initial;
  }
}

.nav-link {
  /* base */
  padding: 14px 0; /* py-3.5 → 14px */
  text-decoration: none; /* no-underline */
  color: rgb(var(--text-color)); /* text-fg (variable à définir) */
  font-weight: 700; /* font-bold */
  position: relative; /* relative */
  transition: color 0.3s; /* transition-colors duration-300 */
}

/* pseudo-élément ::before (seulement ≥ md = 768px) */
@media (min-width: 768px) {
  .nav-link::before {
    content: "";
    position: absolute;
    bottom: 100%; /* bottom-full */
    left: 0; /* left-0 */
    width: 100%; /* w-full */
    height: 4px; /* h-[4px] */
    border-radius: 5px; /* rounded-[5px] */
    background-color: var(--accent-color); /* bg-accent */
    opacity: 0; /* opacity-0 */
    transition: opacity 0.3s; /* transition-opacity duration-300 */
  }
}

/* hover states */
.nav-link:hover {
  color: var(--accent-color); /* hover:text-accent */
}

@media (min-width: 768px) {
  .nav-link:hover::before {
    opacity: 1; /* md:hover:before:opacity-100 */
  }
}

/* état actif (Vue Router ajoute .router-link-active) */
.nav-link.router-link-active {
  color: var(--accent-color); /* [&.router-link-active]:text-accent */
}

@media (min-width: 768px) {
  .nav-link.router-link-active::before {
    opacity: 1; /* md:[&.router-link-active]:before:opacity-100 */
  }
}

.menuBurger {
  position: relative; /* relative */
  z-index: 10; /* z-[10] */
  display: flex; /* flex */
  flex-direction: column; /* flex-col */
  justify-content: space-between; /* justify-between */
  gap: 3px; /* gap-[3px] */
  width: 35px; /* w-[35px] */
  height: 20px; /* h-5 → 20px */
  border: 0; /* border-0 */
  background: transparent; /* bg-transparent */
  padding: 0; /* bouton “nu” */
  cursor: pointer;
  margin-left: auto;
}
@media (min-width: 768px) {
  .menuBurger {
    display: none;
  }
}

.menuBurger span,
.menuBurger::after,
.menuBurger::before {
  height: 2px;
  border-radius: 3px;
  display: block;
  background-color: rgb(var(--text-color));
  width: 100%;
  transition: 0.4s;
}
.menuBurger::after,
.menuBurger::before {
  content: "";
}
.menuBurger.active::before {
  transform: rotate(45deg) translate(6px, 5px);
  transition: 0.4s;
}
.menuBurger.active span {
  opacity: 0;
  transition: 0.4s;
}
.menuBurger.active::after {
  transform: rotate(-45deg) translate(6px, -5px);
  transition: 0.4s;
}

.darkMode {
  background-color: rgb(
    var(--bg-color-secondary)
  ); /* bg-surface → variable à définir */
  height: 40px; /* h-10 → 2.5rem = 40px */
  width: 40px; /* w-10 */
  cursor: pointer; /* cursor-pointer */
  border-radius: 50%; /* rounded-full */
  border: 0; /* border-0 */
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.16); /* shadow-[0_0_16px_rgba(0,0,0,0.16)] */
  transition: all 0.3s; /* transition-all duration-300 */
}
.darkMode span {
  font-size: 2.4rem;
  color: rgb(var(--text-color));
}
</style>
