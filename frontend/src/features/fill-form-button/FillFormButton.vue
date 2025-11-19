<!-- <script>

</script> -->

<template>
  <button class="fill-form-button">
    <span>ЗАПОЛНИТЬ АНКЕТУ</span>
    <span class="arrow">
      <NuxtImg
        src="/images/line-md_arrow-up.svg"
        alt="arrow"
      />
    </span>
  </button>
</template>

<style scoped>
.fill-form-button {
  width: auto;
  height: 100%;
  aspect-ratio: 4.74 / 1;

  align-items: center;

  font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont,
                "Segoe UI", sans-serif;
  font-weight: 400;         
  font-size: min(10px, 80%);
  line-height: 110%;         
  letter-spacing: 0;
  text-align: center;
  text-transform: capitalize; /* приближение к макетному Title case */
  text-wrap: nowrap;

  display: flex;
  justify-content: space-between;
  gap: 3px;                    /* расстояние между текстом и кругом */

  padding: 0 0.1% 0 0.9%;      

  background: transparent;
  border: 1px solid var(--strategix-accent);  /* Accent из макета */
  border-radius: 50px;      
  color: white;

  cursor: pointer;

  @media(--laptop-width){
    font-size: max(10px, 50%);
  }

  @media(--big-laptop-width) {
    height: 135%;
    border-width: 2px;
    font-size: 85%;
  }
  @media(--mini-pc-width) {
    height: 200%;
    font-size: clamp(10px, 125%, 20px);
  }

  @media(--mobile-small) {
    height: 100%;
    font-size: 87%;
  }
}

/* Круг с стрелкой — второй span */
.arrow{
  display: flex;
  justify-content: center;
  align-items: center;

  width: auto;
  height: 90%;
  aspect-ratio: 1 / 1;

  background-color: #2AB464;    /* заливка круга */
  border-radius: 50%;
}

.arrow img{
  width: 40%;
  height: 40%;
}

</style>