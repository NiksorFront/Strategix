<!-- <script>

</script> -->

<template>
  <button class="fill-form-button">
    <span>ЗАПОЛНИТЬ АНКЕТУ</span>
    <span class="arrow">
      <NuxtImg
        src="/images/line-md_arrow-up.svg"
        alt="arrow"
        width="12px"
        height="12px"
      />
    </span>
  </button>
</template>

<style scoped>
.fill-form-button {
  /* width: 147px; */
  height: 100%;
  display: inline-flex;
  align-items: center;

  font-family: "Onest", system-ui, -apple-system, BlinkMacSystemFont,
                "Segoe UI", sans-serif;
  font-weight: 400;         
  font-size: min(10px, 80%);
  line-height: 110%;         
  letter-spacing: 0;
  text-align: center;
  text-transform: capitalize; /* приближение к макетному Title case */

  gap: 3px;                    /* расстояние между текстом и кругом */

  padding: 0 1px 0 12px;      

  background: transparent;
  border: 0.8px solid #2AB464;  /* Accent из макета */
  border-radius: 999px;         /* «капсула» */
  color: #ffffff;

  cursor: pointer;
}

/* Круг с стрелкой — второй span */
.arrow{
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: auto;
  height: 90%;
  aspect-ratio: 1 / 1;

  font-size: 100%;

  background-color: #2AB464;    /* заливка круга */
  border-radius: 50%;

  /* чёрный кружок внутри, как на скрине */
  box-shadow: 0 0 0 0.8px #000000;
}

</style>