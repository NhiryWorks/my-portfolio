<template>
  <footer class="footer">
    <div class="container">
      <Rs />
      <div class="footer-mention">
        © {{ currentYear }} Nhiry Lanto. Tous droits réservés.
      </div>
    </div>
  </footer>
</template>

<script setup>
import Rs from "./Rs.vue";

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  margin-top: auto;
  background-color: rgb(var(--bg-color-secondary) / 30%);
  border-top: 1px solid rgb(var(--text-color) / 30%);
  transition: all 0.3s;
  padding: 30px 0;
  backdrop-filter: blur(12px);
}
.footer-mention {
  text-align: center;
  font-size: 1.2rem;
}
.rs {
  justify-content: center;
}
</style>
