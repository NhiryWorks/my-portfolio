<template>
  <div class="rs">
    <a
      href="https://www.linkedin.com/in/nhiry-lanto-rakotomanana-47337b32b"
      class="icon-linkedin"
      target="_blank"
    ></a>
    <a href="mailto:nhirlanto@gmail.com" class="icon-mail" target="_blank"></a>
    <a
      href="https://www.facebook.com/nrakotomanana"
      class="icon-facebook"
      target="_blank"
    ></a>
  </div>
</template>

<script setup></script>

<style scoped>
.rs {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}
.rs a {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--accent-color);
  color: var(--bg-color-primary);
  font-size: 20px;
  transition: all 0.3s;
}
.rs a:hover {
  transform: scale(1.1);
}
</style>
