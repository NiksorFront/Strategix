<script setup lang="ts">
    import strategixLogo from "@/assets/images/strategix-white-2.svg";
    import ButtonWithIcon from "@/shared/ui/button-with-icon";

    const {navData} = defineProps<{
            navData: {
                links: { href: string; label: string }[]
            }
        }>()
</script>

<template>
  <div class="navigation-menu">
    <input
      id="menu-toggle"
      class="checkbox"
      type="checkbox"
    >

    <label
      for="menu-toggle"
      class="checkbox-button"
    >
      <span />
      <span />
      <span />
    </label>

    <div class="menu">
      <NuxtImg
        class="strategix-logo"
        :src="strategixLogo"
        alt="strategix logo"
      />

      <nav class="navigation">
        <ul>
          <li
            v-for="(link, index) in navData.links"
            :key="index"
          >
            <a
              :href="link.href"
              class="base-text big-text"
            >{{ link.label }}</a>
          </li>
        </ul>
      </nav>

      <ButtonWithIcon
        class="button"
        style-button="white"
        href="#contacts"
      >
        ЗАПОЛНИТЕ АНКЕТУ
      </ButtonWithIcon> 
    </div>
  </div>
</template>

<style>
  :root{
    /* Базовая величина анимации — меняйте только эту, чтобы скорректировать все скорости */
    --anim-base: 0.05s;
    /* Производные значения, используемые в этом компоненте */
    --anim-menu: calc(3 * var(--anim-base)); /* 0.15s */
    --anim-span: calc(8 * var(--anim-base)); /* 0.4s  */
    --anim-ui: calc(4 * var(--anim-base));   /* 0.2s  */
    --anim-delay-initial: calc(3.4 * var(--anim-base)); /* ~0.17s */
    --anim-delay-show: calc(4 * var(--anim-base));     /* 0.2s  */
 }
  body:has(.checkbox:checked) {
    overflow: hidden;
  }
</style>
<style scoped>
.navigation-menu{
    width: 28px;
    height: 18px;

    position: relative;

    @media(--tablet-width){
     display: none;
    }

    @media(--mobile-medium) {
      display: none;
    }
    /* background-color: violet; */
}

.checkbox{
  content: '';
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  position: absolute;
  top: 0;
  left: 0;

  opacity: 0;
  pointer-events: auto;
  z-index: 2;
  cursor: pointer;
}

.checkbox-button{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
}

.checkbox-button span{
    display: block;
    width: 100%;
    height: 16.6%;
    margin: 0;
    padding: 0;

    background-color: var(--strategix-accent);
    border-radius: 1px;

    transition: all var(--anim-span) ease;
    z-index: 2;
}

.checkbox:checked ~ .checkbox-button span{
    background-color: var(--strategix-dark);
}

.checkbox:checked ~ .menu{
    transform: translateX(0);
    opacity: 1;
}

.menu{
  width: 100vw;
  height: 100vh;
  padding: 6.75vh var(--padding-section-x) var(--padding-section-x);
  box-sizing: border-box;

  position: fixed;
  top: 0;
  right: 0;

  opacity: 0;
  transform: translateX(100%);

  background-color: var(--strategix-accent);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  transition: all var(--anim-menu) ease;
}

.strategix-logo{
    width: min(172px, 44.1vw);
    height: auto;
    aspect-ratio: 4.77 / 1;

    @media(--tablet-width) {
      width: clamp(121px, 10.1vw, 245px);
    }

    @media(--mobile-small) {
      width: auto;
      height: 100%;
    }
  }

.navigation{
    width: 100%;
    height: fit-content;
    padding: 0;
    margin: 10vh 0 auto;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.navigation ul{
    width: 100%;
    height: fit-content;
    padding: 0;
    margin: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    text-align: right;
    gap: 3vh;

}

.big-text{
    width: 100%;
    height: fit-content;
    text-decoration: none;

    font-size: min(60px, 15vw);
    font-weight: 800;
    line-height: 110%;
    letter-spacing: 0;
    text-align: right;
    text-transform: uppercase;

    color: white;
}

/* Начальное состояние: логотип и CTA скрыты и слегка смещены вниз. */
.menu .button,
.menu .strategix-logo {
    opacity: 0;
    transition: all var(--anim-ui) ease;
    transition-delay: var(--anim-delay-initial); /* ждать пока .menu завершит появление */
}

.menu .navigation ul li{
  opacity: 0;
  transform: translateX(20px);
  transition: all var(--anim-ui) ease;
  transition-delay: var(--anim-delay-initial); /* ждать пока .menu завершит появление */
}

/* После открытия меню — показать элементы с небольшой задержкой. */
.checkbox:checked ~ .menu .strategix-logo,
.checkbox:checked ~ .menu .button {
  opacity: 1;
  transform: translateX(0);
  transition-delay: var(--anim-delay-show);
}

.checkbox:checked ~ .menu .navigation ul li:nth-child(1) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(5 * var(--anim-base));
}

.checkbox:checked ~ .menu .navigation ul li:nth-child(2) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(6 * var(--anim-base));
}

.checkbox:checked ~ .menu .navigation ul li:nth-child(3) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(7 * var(--anim-base));
}

.checkbox:checked ~ .menu .navigation ul li:nth-child(4) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(8 * var(--anim-base));
}

.checkbox:checked ~ .menu .navigation ul li:nth-child(5) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(9 * var(--anim-base));
}

.checkbox:checked ~ .menu .navigation ul li:nth-child(5) {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(10 * var(--anim-base));
}
</style>