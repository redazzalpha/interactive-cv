<template>
  <article>
    <v-container v-bind="containerBindings">
      <!-- animated title -->
      <v-row>
        <v-col>
          <AnimatedTitle
            v-show="!$vuetify.display.mobile"
            id="title-about"
            tag="h1"
            :text="title"
            v-bind="animatedTitleBindings"
            style="position: fixed"
          />
        </v-col>
      </v-row>

      <!-- section introduce -->
      <v-row v-bind="rowBindings">
        <v-col v-bind="colBindings">
          <AnimatedBlock id="about-introduce">
            <template v-slot:content>
              <section id="about-introduce" v-bind="sectionBindings">
                <h2 v-bind="subtitleBindings">Introduction</h2>
                <p>
                  Bonjour, je m'applelle Wilfried et je suis candidat pour un
                  poste de concepteur et développeur (bureautique, mobile, web).
                  <br />
                  Diplômé d'une
                  <strong>cerification de niveau VI (bac+3/4) </strong> en tant
                  que
                  <strong>concepteur et développeur d'applications </strong> je
                  suis initié aux langages de programmation tels que
                  <strong>HTML </strong>, <strong>CSS </strong>,
                  <strong>JavaScript </strong>, <strong>C/C++ </strong>,
                  <strong>C# </strong>, <strong>Java </strong>.
                  <br />
                  Je suis passionné par les nouvelles technologies et la
                  création d'applications en tout genre, site web fullstack
                  interactifs, dynamiques et responsive qui répondent aux
                  besoins des utilisateurs et clients.
                  <br />
                  Je maîtrise les outils de conceptions graphique comme
                  <strong>figma </strong>, <strong>photoshop </strong>,
                  <strong>illustrator </strong>
                  ainsi que les frameworks comme
                  <strong>Bootstrap </strong>, <strong>JQuery </strong>,
                  <strong>VueJs </strong>, <strong>Springboot </strong>,
                  <strong>.NET </strong>.
                  <br />
                  Je suis également familier avec les méthodes agiles de gestion
                  de projet, comme le
                  <strong>Scrum</strong> et <strong>Kanban</strong>.
                  <br />
                  Motivé, rigoureux et capable de travailler en équipe ou en
                  autonomie, je pense avoir les compétences et les qualités
                  requises pour rejoindre vore entrprise et participer à vos
                  projets.
                </p>
              </section>
            </template>
          </AnimatedBlock>
        </v-col>
      </v-row>

      <!-- section cv -->
      <v-row v-bind="rowBindings">
        <v-col v-bind="colBindings">
          <AnimatedBlock id="about-cv" :scroll-limit="100">
            <template v-slot:content>
              <section v-bind="sectionBindings">
                <h2 v-bind="subtitleBindings">Mon CV</h2>
                <AppAsset :asset="store.assets[0]" />
              </section>
            </template>
          </AnimatedBlock>
        </v-col>
      </v-row>

      <!-- section certification -->
      <v-row v-bind="rowBindings">
        <v-col v-bind="colBindings">
          <AnimatedBlock id="about-cert" :scroll-limit="800">
            <template v-slot:content>
              <section v-bind="sectionBindings">
                <h2 v-bind="subtitleBindings">Diplômes et Certifications</h2>
                <div
                  class="cert_container d-flex flex-column flex-lg-row jusitfy-center align-center"
                >
                  <template
                    v-for="(asset, index) in store.assets"
                    :key="asset.label"
                  >
                    <AppAsset
                      v-if="index != 0 && index != store.assets.length - 1"
                      :asset="asset"
                    />
                  </template>
                </div>
              </section>
            </template>
          </AnimatedBlock>
        </v-col>
      </v-row>

      <!-- section vision -->
      <v-row v-bind="rowBindings">
        <v-col v-bind="colBindings">
          <AnimatedBlock id="about-vision" :scroll-limit="1500">
            <template v-slot:content>
              <section v-bind="sectionBindings">
                <h2 v-bind="subtitleBindings" class="vision_title">
                  Vision de développeur et développement
                </h2>
                <div class="vision_content">
                  <v-img
                    class="codeline"
                    src="@/assets/codeline.png"
                    style="border-radius: 15px"
                  ></v-img>
                  <p style="text-align: center">
                    Selon moi un développeur se doit d'avoir certaines
                    compétences, telles que la communication, le travail en
                    équipe, le partage, mais se doit également d'être autonome
                    et autodidacte.
                    <br />
                    Il doit se soucier de l'utilisateur et/ou du client.
                    <br />
                    Un site ou une application se doit d'être ergonomique,
                    effiente, exacte, robuste et autant que faire se peut doit
                    être facilement extensible, maintenable et/ou interoperable.
                    <br />
                    Une application ou un site se doit aussi d'être sécurisé au
                    vu des informations partagées.
                    <br />
                    C'est à ce moment que les patrons de conceptions entre en
                    jeux afin de concevoir le type d'application précédemment
                    d'écrit.
                    <br />
                    Le développeur doit être en mesure de s'informer des
                    nouvelles technologies qui s'offrent à lui ou des normes en
                    vigueur lorsque cela est nécéssaire.
                    <br />
                    Le travail du développeur n'est pas une mince affaire, mais
                    requiert qu'il soit passioné, et c'est dans ce type de
                    développeur que je me décris.
                  </p>
                </div>
              </section>
            </template>
          </AnimatedBlock>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import AnimatedBlock from "@/components/AnimatedBlock.vue";
import AppAsset from "@/components/AppAsset.vue";
import {
  containerBindings,
  animatedTitleBindings,
  rowBindings,
  colBindings,
  subtitleBindings,
  sectionBindings,
} from "@/utils/objectBindings";
import { useAppStore } from "@/store/app";
const store = useAppStore();

//#region variables
const title: string = "Qui suis-je ?";
//#endregion
</script>
