<template>
  <div class="position-relative h-120px h-lg-192px" ref="el">
    <Transition name="slide-fade" appear>
      <component v-if="inView" :is="tag" class="big-title--content">
        {{ text }}
      </component>
    </Transition>
    <Transition name="slide-fade" appear>
      <span class="bg-title" v-if="inView">{{ text }}</span>
    </Transition>
  </div>
</template>

<script setup>
import { useInView } from "@/assets/js/useInView";
import { Transition } from "vue";

const { el, inView } = useInView();

const props = defineProps({
  text: String,
  tag: {
    type: String,
    default: "h2",
  },
});
</script>

<style scoped>
.big-title--content {
  text-align: center;
  font-size: 4rem;
  text-transform: capitalize;
  color: rgb(var(--text-color));
  font-family: var(--font-primary);
}
@media (min-width: 992px) {
  .big-title--content {
    font-size: 6rem;
  }
}
.bg-title {
  display: none;
}
@media (min-width: 768px) {
  .bg-title {
    display: block;
    font-size: 10rem;
    text-transform: uppercase;
    color: rgb(var(--text-color) / 20%);
    position: absolute;
    top: -42px;
    left: 50%;
    width: max-content;
    transform: translateX(-50%);
    z-index: -1;
    font-family: var(--font-tertiary);
  }
}
@media (min-width: 992px) {
  .bg-title {
    font-size: 14rem;
    top: -54px;
  }
}
@media (min-width: 768px) {
  .h-120px {
    height: 120px;
  }
}
@media (min-width: 992px) {
  .h-lg-192px {
    height: 192px;
  }
}
</style>
