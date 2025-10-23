<template>
  <div>
    <section class="aboutMe d-flex align-items-center">
      <div class="container">
        <BigTitle text="À propos" :tag="titleTag" />
        <div class="row">
          <div class="col-lg-6 order-lg-1 order-2" ref="el">
            <Transition name="slide-fade">
              <div class="aboutMe-picture" v-if="inView">
                <img :src="photo" alt="Photo de Nhiry" />
              </div>
            </Transition>
          </div>
          <div class="aboutMe-info col-lg-6 order-lg-2 order-1" ref="el">
            <Transition name="slide-fade" appear>
              <component :is="tag" class="stagger-0" v-if="inView">
                Salut, je suis <strong>Nhiry Lanto</strong>
              </component>
            </Transition>
            <Transition name="slide-fade" appear>
              <p class="stagger-1" v-if="inView">
                Développeur Front-End passionné, je transforme les idées et les
                maquettes en expérience fluides, performantes et accessibles.
              </p>
            </Transition>
            <Transition name="slide-fade" appear>
              <p class="stagger-2" v-if="inView">
                Avec plus de 4 ans d'expérience en développement web, je
                maîtrise l'intégration responsive, les environnements
                <strong>Vue.js et Wordpress</strong>. J'accorde une attention
                particulière à l'UX/UI et au design pixel-perfect, tout en
                optimisant les performances et le SEO.
              </p>
            </Transition>
            <Transition name="slide-fade" appear>
              <div class="like-h3 stagger-3" v-if="inView">Contactez-moi</div>
            </Transition>
            <Transition name="slide-fade" appear>
              <Rs class="stagger-4" v-if="inView" />
            </Transition>
            <Transition name="slide-fade" appear>
              <div v-if="inView" class="stagger-5">
                <a href="#" target="_blank" class="btn gap-2"
                  ><span class="icon-download"></span> Télécharger mon CV</a
                >
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
    <Skills v-if="showSkills" />
  </div>
</template>

<script setup>
import { useInView } from "@/assets/js/useInView";
import BigTitle from "@/components/BigTitle.vue";
import Rs from "@/components/Rs.vue";
import Skills from "@/components/Skills.vue";
import photo from "@/assets/images/pdp-removebg.png";

const { el, inView } = useInView();

const props = defineProps({
  titleTag: {
    type: String,
    default: "h1",
  },
  showSkills: {
    type: Boolean,
    default: true,
  },
  tag: {
    type: String,
    default: "h2",
  },
});
</script>

<style scoped>
.aboutMe {
  padding: 50px 0;
}
@media (min-width: 768px) {
  .aboutMe {
    padding: 75px 0;
  }
}
@media (min-width: 992px) {
  .aboutMe {
    padding: 150px 0 100px;
    min-height: 100vh;
  }
}
.aboutMe-info {
  font-size: 1.8rem;
}
h3 {
  font-size: 3rem;
}
strong {
  color: var(--accent-color);
}
.like-h3 {
  margin-bottom: 15px;
}

.aboutMe-picture {
  mask-image: url("@/assets/images/blob.svg");
  mask-repeat: no-repeat;
  mask-position: 46% 50%;
  mask-size: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(var(--rgb-accent-color) / 80%);
}
.aboutMe-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
