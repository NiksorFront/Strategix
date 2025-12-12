<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const {src, title, description} = defineProps<{src: string, title: string, description: string}>()

const { locale } = useI18n()
const router = useRouter()

function slugify(s: string) {
  const map: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
  }
  return s
    .toLowerCase()
    .trim()
    .split('')
    .map(ch => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const slug = computed(() => slugify(title))

function go() {
  router.push(`/${locale.value}/project/${slug.value}`)
}
</script>

<template>
  <li
    class="project-card"
    role="link"
    tabindex="0"
    @click="go"
    @keydown.enter="go"
  >
    <NuxtImg
      :src="src"
      class="img-card"
      sizes="(max-width: 767px) 74.36vw, (max-width: 1023px) 32.5vw, 33vw"
      format="webp"
      :quality="80"
      :alt="title"
      loading="lazy"
      :width="1000"
      :height="1000"
    />
    <h4 class="base-text title-card">
      {{ title }}
    </h4>
    <p class="small-text description-card">
      {{ description }}
    </p>
  </li>
</template>

<style scoped>
.project-card{
  min-width: 74.36vw;
  height: 100%;
  box-sizing: border-box;
  border-radius: var(--card-radius);

  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  transition: all 0.3s;
  
  @media(--tablet-width){
    min-width: min(32.5%, 74.36vw);
  }

  @media(--mobile-medium){
    min-width: 32.5%;
    /* height: fit-content; */
  }

}

.img-card{
  width: 100%;
  height: 68.5%;
  max-height: calc(var(--vh) * 45.5);

  object-fit: cover;
  border-radius: var(--card-radius);

  @media(--tablet-width){
    max-height: calc(var(--vh) * 48.6);
  }

  @media(--mobile-medium){
    max-height: calc(var(--vh) * 40);
  }
}

.title-card{
  width: 70%;
  text-align: left;
  margin: min(7%, calc(var(--vh) * 3)) 0 0 6%;

  color: white;
  text-transform: uppercase;
  font-size: clamp(23px, calc(1.25vw + var(--vh) * 1.5), 50px);
  font-weight: 500;

  transition: all 0.3s;

  @media(--mobile-medium){
    font-size: min(23px, calc(var(--vh) * 5))
  }
}

.description-card{
  width: 90%;
  margin: auto 0 min(12.5%, calc(var(--vh) * 5)) 6%;

  color: white;
  text-align: left;
  line-height: 125%;

  transition: all 0.3s;

  @media(--laptop-width){
    width: 70%;
    margin: auto 0 min(7%, calc(var(--vh) * 3)) 6%;
  }
}

.project-card:hover{
  margin-top: calc(var(--vh) * 1);
  height: calc(100% - var(--vh) * 1.5);
  border: clamp(2px, 0.175vw, 6px) solid var(--strategix-accent);
  cursor: pointer;
}

.project-card:hover .img-card{
  height: calc(68.5% + var(--vh) * 0.5);
}

.project-card:hover .title-card{
  /* margin: min(8.5%, 3.75vh) 0 0 6%; */
  font-weight: 700;
}

.project-card:hover .description-card{
  margin: auto 0 min(5%, calc(var(--vh) * 2.25)) 6%;
}
</style>