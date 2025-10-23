// composables/useInView.js
import { ref, onMounted, onBeforeUnmount } from "vue";

export function useInView(options = {}) {
  const el = ref(null);
  const inView = ref(false);
  let observer = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true;
          // remove si tu veux ré-animer à chaque fois :
          observer && observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
        ...options,
      },
    );

    if (el.value) observer.observe(el.value);
  });

  onBeforeUnmount(() => observer && observer.disconnect());

  return { el, inView };
}
