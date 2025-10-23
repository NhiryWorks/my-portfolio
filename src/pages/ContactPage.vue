<template>
  <section class="contact d-flex align-items-center">
    <div class="container">
      <BigTitle text="Contact" :tag="titleTag" />
      <div class="row align-items-center">
        <!-- Col gauche -->
        <div class="col-md-6 mb-md-0 mb-5" ref="el">
          <div class="px-md-5">
            <Transition name="slide-fade">
              <component :is="tag" class="like-h2" v-if="inView"
                >Travaillons ensemble</component
              >
            </Transition>
            <Transition name="slide-fade">
              <p v-if="inView">
                Je suis disponible pour des projets freelance et des
                opportunités à temps plein.
              </p>
            </Transition>
            <Transition name="slide-fade">
              <p v-if="inView">
                N’hésitez pas à me contacter via le formulaire ou par email, que
                ce soit pour un projet, une collaboration ou simplement pour
                échanger.
              </p>
            </Transition>
            <Transition name="slide-fade">
              <p v-if="inView">Je vous répondrai dans les meilleurs délais.</p>
            </Transition>
            <Transition name="slide-fade">
              <div class="mt-5" v-if="inView">
                <a href="mailto:nhirlanto@gmail.com" class="btn gap-2"
                  ><span class="icon-send"></span>nhirlanto@gmail.com</a
                >
              </div>
            </Transition>
          </div>
        </div>

        <!-- Col droite : Formulaire -->
        <div class="col-md-6" ref="el">
          <Transition name="slide-fade">
            <form
              class="contact-form"
              @submit.prevent="handleSubmit"
              novalidate
              v-if="inView"
            >
              <!-- Honeypot (champ caché pour bots) -->
              <input
                v-model="form.website"
                type="text"
                autocomplete="off"
                tabindex="-1"
                aria-hidden="true"
                style="
                  position: absolute;
                  left: -9999px;
                  top: auto;
                  width: 1px;
                  height: 1px;
                  overflow: hidden;
                "
              />

              <!-- Nom -->
              <div class="form-group col-md-6 px-md-3 col-12">
                <label for="name">Nom</label>
                <div class="position-relative">
                  <span class="icon-user"></span>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    @input="onInput('name')"
                    @blur="onBlur('name')"
                    :class="{
                      'is-invalid': touched.name && errors.name,
                      'is-valid': touched.name && !errors.name,
                    }"
                    placeholder="Votre nom"
                  />
                </div>
                <small v-if="touched.name && errors.name" class="text-danger">{{
                  errors.name
                }}</small>
              </div>

              <!-- Email -->
              <div class="form-group col-md-6 px-md-3 col-12">
                <label for="email">Email</label>
                <div class="position-relative">
                  <span class="icon-email1"></span>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    @input="onInput('email')"
                    @blur="onBlur('email')"
                    :class="{
                      'is-invalid': touched.email && errors.email,
                      'is-valid': touched.email && !errors.email,
                    }"
                    placeholder="Votre email"
                  />
                </div>
                <small
                  v-if="touched.email && errors.email"
                  class="text-danger"
                  >{{ errors.email }}</small
                >
              </div>

              <!-- Sujet -->
              <div class="form-group px-md-3 col-12">
                <label for="subject">Sujet</label>
                <div class="position-relative">
                  <span class="icon-file"></span>
                  <input
                    type="text"
                    id="subject"
                    v-model="form.subject"
                    @input="onInput('subject')"
                    @blur="onBlur('subject')"
                    :class="{
                      'is-invalid': touched.subject && errors.subject,
                      'is-valid': touched.subject && !errors.subject,
                    }"
                    placeholder="Sujet du message"
                  />
                </div>
                <small
                  v-if="touched.subject && errors.subject"
                  class="text-danger"
                  >{{ errors.subject }}</small
                >
              </div>

              <!-- Message -->
              <div class="form-group px-md-3 col-12">
                <label for="message">Message</label>
                <div class="position-relative">
                  <span class="icon-chat"></span>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    @input="onInput('message')"
                    @blur="onBlur('message')"
                    :class="{
                      'is-invalid': touched.message && errors.message,
                      'is-valid': touched.message && !errors.message,
                    }"
                    placeholder="Écrivez votre message..."
                  ></textarea>
                </div>
                <small
                  v-if="touched.message && errors.message"
                  class="text-danger"
                  >{{ errors.message }}</small
                >
              </div>

              <!-- Erreur serveur -->
              <div v-if="serverError" class="text-danger mb-2 px-3">
                {{ serverError }}
              </div>

              <!-- Bouton -->
              <div class="px-md-3">
                <button type="submit" :disabled="isSubmitting" class="gap-2">
                  <span class="icon-send"></span>
                  {{ isSubmitting ? "Envoi..." : "Envoyer" }}
                </button>
                <span v-if="success" class="text-success ms-3"
                  >Message envoyé</span
                >
              </div>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInView } from "@/assets/js/useInView";
import BigTitle from "@/components/BigTitle.vue";
import { reactive, ref } from "vue";

const { el, inView } = useInView();

const props = defineProps({
  titleTag: { type: String, default: "h1" },
  tag: { type: String, default: "h2" },
});

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "", // honeypot (doit rester vide)
});

const errors = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const touched = reactive({
  name: false,
  email: false,
  subject: false,
  message: false,
});

const isSubmitting = ref(false);
const success = ref(false);
const serverError = ref("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field) {
  const v = (form[field] ?? "").trim();
  switch (field) {
    case "name":
      errors.name = v ? "" : "Nom requis";
      break;
    case "email":
      errors.email = emailRegex.test(v) ? "" : "Email invalide";
      break;
    case "subject":
      errors.subject = v ? "" : "Sujet requis";
      break;
    case "message":
      errors.message =
        v.length >= 10 ? "" : "Message trop court (≥10 caractères)";
      break;
  }
}

function onInput(field) {
  if (!touched[field]) touched[field] = true;
  validateField(field);
}

function onBlur(field) {
  touched[field] = true;
  validateField(field);
}

function validateAll() {
  ["name", "email", "subject", "message"].forEach((f) => {
    touched[f] = true;
    validateField(f);
  });
  return !Object.values(errors).some(Boolean);
}

async function handleSubmit() {
  serverError.value = "";
  success.value = false;

  if (!validateAll()) return;

  isSubmitting.value = true;
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        website: form.website, // honeypot
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      serverError.value =
        data && data.error ? data.error : "Erreur serveur lors de l'envoi";
      return;
    }

    // Succès
    success.value = true;
    // Reset
    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";
    form.website = "";
    Object.keys(touched).forEach((k) => (touched[k] = false));
    Object.keys(errors).forEach((k) => (errors[k] = ""));
  } catch (e) {
    console.error(e);
    serverError.value = "Impossible de contacter le serveur";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.contact {
  padding: 50px 0;
}
@media (min-width: 768px) {
  .contact {
    padding: 75px 0;
  }
}
@media (min-width: 992px) {
  .contact {
    padding: 150px 0 100px;
    min-height: 100vh;
  }
}

.contact-form {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  padding: 20px;
  background-color: rgb(var(--bg-color-secondary) / 30%);
  border: 1px solid rgb(var(--bg-color-secondary) / 80%);
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  position: relative;
}
.form-group span[class^="icon-"] {
  position: absolute;
  top: 12px;
  left: 10px;
  color: var(--bg-color-primary);
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 10px 20px 10px 30px;
  border: 2px solid rgb(var(--text-color));
  border-radius: 4px;
  background-color: rgb(var(--text-color));
  color: var(--bg-color-primary);
  font-family: var(--font-primary);
  font-size: 1.4rem;
  outline: none;
}
input:focus,
textarea:focus {
  border: 2px solid var(--accent-color);
}
input.is-invalid,
textarea.is-invalid {
  border-color: #cc0000;
}
input.is-valid,
textarea.is-valid {
  border-color: #0a7f00;
}

button {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: var(--accent-color);
  color: var(--bg-color-primary);
  border: 1px solid var(--accent-color);
  border-radius: 50px;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  padding: 10px 24px;
  transition:
    background-color 0.4s,
    color 0.4s,
    border-color 0.4s;
}
@media (min-width: 768px) {
  button {
    margin: 0 10px;
  }
}

button:hover {
  background-color: var(--bg-color-primary);
  color: var(--text-color);
  border-color: var(--text-color);
}

::placeholder {
  opacity: 1;
}

.text-danger {
  position: absolute;
  bottom: 2px;
  right: 18px;
  font-size: 1.4rem;
  background-color: rgb(var(--text-color));
}
.text-success {
  color: var(--accent-color);
}
</style>
