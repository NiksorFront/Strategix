<script setup lang="ts">
const languages = ['Rus', 'Eng', 'Der', 'Esp']
</script>

<template>
  <nav class="lang-nav">
    <div class="lang-switcher">
      <!-- активный язык со стрелкой -->
      <button
        class="small-text lang-current "
        type="button"
      >
        Rus
      </button>

      <!-- выпадающий список всех языков -->
      <ul class="lang-list">
        <li
          v-for="language in languages"
          :key="language"
          class="lang-item"
        >
          <a
            href="#"
            class="small-text lang-link hover"
          >
            {{ language }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
  .lang-nav {
    position: relative;
  }

  .lang-switcher {
    position: relative;
    display: inline-block;     
    margin: 0;
    padding: 0;      
    list-style: none;
  }

  /* активный язык + стрелка */
  .lang-current {
    font-size: min(18px, 4.5vw);
    
    display: inline-flex;
    align-items: center;
    gap: 6px;

    padding: 0;
    margin: 0;
    margin-left: 15vw;

    border: none;
    background: transparent;
    color: #ffffff;

    cursor: pointer;
    white-space: nowrap;

    @media(--tablet-width){
      margin-left: 0;
      font-size: clamp(14px, 1.1675vw, 28px);
    }

    @media(--mobile-medium) {
      font-size: min(14px, 2.917vh);
    }
  }

  /* стрелка вниз по умолчанию */
  .lang-current::after {
    content: "";
    width: 6px;
    height: 6px;

    border-right: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: translateY(-2px) rotate(45deg);      /* стрелка вниз */
    transform-origin: center;
    transition: transform 0.15s ease;
  }

  /* сам дропдаун */
  .lang-list {
    position: absolute;
    top: 100%;
    right: -15%;

    margin: 0;
    padding: 12px 18px;
    list-style: none;

    border-radius: var(--card-radius);
    background-color: #262626;

    opacity: 0;
    pointer-events: none;
    transform: translateY(0); /*убрать*/
    transition:
      opacity 0.15s ease,
      transform 0.15s ease;

    z-index: 10;
  }

  .lang-item + .lang-item {
    margin-top: 6px;
  }

  .lang-link {
    font-size: min(18px, 4.5vw);
    text-decoration: none;
    color: white;
    white-space: nowrap;

    @media(--tablet-width){
      font-size: clamp(14px, 1.1675vw, 28px);
    }

    @media(--mobile-medium) {
      font-size: min(14px, 2.917vh);
    }
  }

  .lang-switcher:hover .lang-list,
  .lang-list:hover {
    opacity: 1;
    pointer-events: auto;
  }

  .lang-switcher:hover .lang-current::after,
  .lang-list:hover ~ .lang-current::after {
    transform: translateY(3px) rotate(-135deg);
  }

  @media (--laptop-width) {
    .lang-switcher {
      display: block;
    }

    /* кнопку с активным языком прячем */
    .lang-current {
      display: none;
    }

    /* список становится обычным горизонтальным рядом */
    .lang-list {
      position: static;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0;
      margin: 0;

      background: transparent;
      border-radius: 0;

      opacity: 1;
      pointer-events: auto;
      transform: none;
    }

    .lang-item + .lang-item {
      margin-top: 0;
      margin-left: 24px; /* расстояние между языками */
    }
  }
</style>
