<script>
</script>

<template>
  <section class="example-goals-company">
    <h2 class="upperscase-text title">
      Цели компании
    </h2>
    <ul class="goals-list">
      <li class="goal-item base-text">
        <span class="goal-number">1</span> Получение подписок в Instagram 
      </li>
      <li class="goal-item base-text">
        <span class="goal-number">2</span> Продвижение услуг компании преимущественно среди владельцев модных брендов и дизайнеров
      </li>
      <li class="goal-item base-text">
        <span class="goal-number">3</span> Привлечение новых клиентов через Instagram и WhatsApp
      </li>
    </ul>
  </section>
</template>

<style scoped>
.example-goals-company{
  width: var(--section-width);
  padding-block: min(calc(var(--vh) * 3), 48px);
  padding-inline: var(--padding-section-x);
  box-sizing: border-box;
  background-color: var(--strategix-light);

  @media(--mobile-medium){
    padding-block: min(calc(var(--vh) * 6), 60px);
  }
}

.title{
  margin: 0;
  color: var(--strategix-accent);

  font-size: min(32px, 8.2vw);
  font-weight: 600;
  line-height: 110%;
  letter-spacing: 0;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(24px, 4.1675vw, 100px);
  }

  @media(--mobile-medium){
    font-size: min(24px, calc(var(--vh) * 3.75));
    margin-bottom: min(calc(var(--vh) * 2), 24px);
  }
}

.goals-list{
  list-style: none;
  padding: min(calc(var(--vh) * 2), 20px) 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: min(calc(var(--vh) * 1), 10px);

  @media(--tablet-width){
    padding: min(calc(var(--vh) * 6), 120px) 0;
    gap: min(calc(var(--vh) * 2), 40px);
  }

  @media(--mobile-medium){
    gap: min(calc(var(--vh) * 1), 10px);
  }
}

.goal-item{
  margin: 0;
  display: flex;
  align-items: center;
  align-items: baseline;
  gap: min(4vw, 18px);

  font-size: min(18px, 4.615vw);
  font-weight: 400;
  line-height: 110%;
  letter-spacing: 0;
  text-align: left;

  @media(--tablet-width){
    font-size: clamp(18px, 2.5vw, 60px);
    gap: min(calc(var(--vh) * 4), 96px);
  }

  @media(--mobile-medium){
    font-size: min(18px, calc(var(--vh) * 3));
  }
}

.goal-number{
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: min(calc(var(--vh) * 3), 36px);
  height: min(calc(var(--vh) * 3), 36px);
  aspect-ratio: 1 / 1;

  background-color: transparent;
  border: solid clamp(0px, 0.075vw, 2px) var(--strategix-dark);
  border-radius: 50%;

  text-align: center;

  @media(--tablet-width){
    width: clamp(32px, 4vw, 96px);
    height: clamp(32px, 4vw, 96px);
  }

  @media(--mobile-medium){
    width: min(calc(var(--vh) * 4), 40px);
    height: min(calc(var(--vh) * 4), 40px);
  }
}
</style>