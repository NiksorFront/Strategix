<script setup lang="ts">
    const {categories} = defineProps<{categories: string[] }>()
    // При разработке CMS добавить active и setChages
</script>

<template>
  <ul
    class="projects-filters"
    aria-label="Фильтр проектов"
  >
    <li
      v-for="category in categories"
      :key="category"
      class="filter-item"
    >
      <button 
        type="button" 
        class="item"
      >
        {{ category }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.projects-filters{
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    list-style-type: none;
    gap: clamp(10px, 1.5%, 40px);
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;

    margin: 0;

    @media(--mobile-medium){
        gap: min(10px, 1.5%);
    }
}

.filter-item{
    width: fit-content;
    height: fit-content;
    /* list-style-type: none; */
    padding: 0;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    /* margin-bottom: clamp(8px, 2.9%, 20px);

    @media(--mobile-medium){
        margin-bottom: min(8px, 2.9%);
    } */
}

.item{
    border: 0;
    background-color: white;
    padding: 10px 13px;
    border-radius: 50px;

    /* text-decoration: none; */
    font-family: "Liberty-MT", "Onest", Arial, sans-serif;
    font-size: clamp(16px, 1.5vw, 36px);

    line-height: 110%;
    font-weight: 700;
    letter-spacing: 0;


    display: inline-flex;
    text-wrap: none;
    text-align: center;    
    align-items: center;       /* вертикальное выравнивание по центру */
    justify-content: center;   /* горизонтальное выравнивание внутри кнопки/тэга */


    @media(--mobile-medium){
        font-size: min(16px, 3.35vh);
        padding: 2vh 1vw;
    }
}
</style>