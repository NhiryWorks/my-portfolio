<template>
  <section class="project d-flex align-items-center">
    <div class="container">
      <BigTitle text="Projets" :tag="titleTag" />
      <div class="row flex-column flex-md-row gx-5">
        <div class="project-image col-md-8">
          <div
            v-for="(projet, index) in projets"
            :key="index"
            class="project-image--container"
          >
            <div class="project-image--item cover">
              <img :src="projet.image" :alt="projet.titre" />
            </div>

            <!-- Description mobile -->
            <div class="project-description-mobile d-md-none">
              <h3>{{ projet.titre }}</h3>
              <p>{{ projet.description }}</p>
              <ul v-if="projet.features?.length">
                <li v-for="(feature, fIndex) in projet.features" :key="fIndex">
                  {{ feature }}
                </li>
              </ul>
              <ul v-if="projet.techs?.length" class="project-tech">
                <li v-for="(tech, tIndex) in projet.techs" :key="tIndex">
                  <span :class="tech"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-4" ref="el">
          <div class="project-sticky d-none d-md-block" v-if="inView">
            <Transition name="slide-fade" appear>
              <h3 :key="`title-${selectedIndex}`" class="stagger-0">
                {{ projets[selectedIndex].titre }}
              </h3>
            </Transition>
            <Transition name="slide-fade" appear>
              <p :key="`desc-${selectedIndex}`" class="stagger-1">
                {{ projets[selectedIndex].description }}
              </p>
            </Transition>
            <TransitionGroup name="slide-fade" tag="ul" v-if="inView" appear>
              <li
                v-for="(feature, index) in projets[selectedIndex].features ||
                []"
                :key="`f-${selectedIndex}-${feature}`"
                :style="{ '--d': `${index * 120}ms` }"
              >
                {{ feature }}
              </li>
            </TransitionGroup>

            <TransitionGroup
              name="slide-fade"
              tag="ul"
              v-if="inView && projets[selectedIndex].techs?.length"
              class="project-tech"
            >
              <li
                v-for="(tech, index) in projets[selectedIndex].techs"
                :key="`t-${selectedIndex}-${tech}`"
                :style="{ '--d': `${index * 120}ms` }"
              >
                <span :class="tech"></span>
              </li>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import BigTitle from "@/components/BigTitle.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import imgVolley from "@/assets/images/calendrier-interactive.jpg";
import imgVaillance from "@/assets/images/vaillance.jpg";
import imgPortfolio from "@/assets/images/portfolio.jpg";
import { useInView } from "@/assets/js/useInView";

const { el, inView } = useInView();

const props = defineProps({
  titleTag: {
    type: String,
    default: "h1",
  },
});

const projets = ref([
  {
    titre: "Application web - Gestion de tournoi de volley",
    description:
      "Développement d'une application web interactive permettant de suivre en temps réel un tournoi de volley. L'application intègre :",
    features: [
      "Un calendrier des matchs (par date, phase, équipes)",
      "Un système de classement par poule",
      "L'affichage des résultats et statistiques des matchs terminés",
      "Des intégrations de liens externes (réseaux sociaux, diffusion live)",
      "Une interface simple et responsive pour une expérience utilisateur optimale",
    ],
    techs: ["icon-html5", "icon-css", "icon-javascript"],
    image: imgVolley,
  },
  {
    titre: "Vaillance",
    description:
      "Vaillance est une entreprise spécialisée dans le développement du leadership. Le site présente ses services de coaching, formations et évaluations pour aider individus et équipes à atteindre leur plein potentiel.",
    techs: ["icon-wordpress"],
    image: imgVaillance,
  },
  {
    titre: "Mon portfolio",
    description:
      "Conception et développement complet de mon portfolio personnel. Le projet met en avant mes compétences en intégration et développement web, avec un accent sur l’expérience utilisateur, la performance et l’adaptabilité (responsive design).",
    techs: ["icon-html5", "icon-css", "icon-vuedotjs"],
    image: imgPortfolio,
  },
]);

const selectedIndex = ref(0);
let observer;

onMounted(() => {
  const elements = Array.from(
    document.querySelectorAll(".project-image--item"),
  );
  if (!elements.length) return;

  observer = new IntersectionObserver(
    (entries) => {
      let best = { ratio: 0, index: selectedIndex.value };

      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const index = elements.indexOf(entry.target);
        if (index !== -1 && entry.intersectionRatio > best.ratio) {
          best = { ratio: entry.intersectionRatio, index };
        }
      }

      if (best.index !== selectedIndex.value) {
        selectedIndex.value = best.index;
      }
    },
    {
      root: null,
      // centre visuel: on ignore 30% en haut et en bas. Alternative: threshold: 0.6
      //rootMargin: "-30% 0px -30% 0px",
      threshold: 0.6,
    },
  );
  elements.forEach((element) => observer.observe(element));
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.project-image--item {
  border: 10px solid var(--black);
  border-radius: 20px;
  height: 175px;
}
@media (min-width: 768px) {
  .project-image--item {
    height: 300px;
  }
}
@media (min-width: 992px) {
  .project-image--item {
    height: 500px;
  }
}
.project-image--item {
  margin-bottom: 30px;
}
.project-image--container:not(:last-child) {
  margin-bottom: 100px;
}
.project-sticky {
  position: sticky;
  top: 7rem;
}
.project-tech {
  display: flex;
  align-items: center;
  gap: 15px;
}
.project-tech li {
  font-size: 1.8rem;
  width: 40px;
  height: 40px;
  border: 1px solid rgb(var(--text-color) / 50%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.project {
  padding: 50px 0;
}
@media (min-width: 768px) {
  .project {
    padding: 75px 0;
  }
}
@media (min-width: 992px) {
  .project {
    padding: 150px 0 100px;
    min-height: 100vh;
  }
}
</style>
