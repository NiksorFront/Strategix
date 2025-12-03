<script setup lang="ts">
  import ButtonWithIcon from '@/shared/ui/button-with-icon';
  import arrowNext from '@/assets/images/arrow-next.svg';
</script>

<template>
  <form class="form">
    <div class="lr-form">
      <h4 class="base-text title">
        Ваши контакты
      </h4>
      <input
        class="base-text field"
        type="text"
        placeholder="Имя Фамилия *"
      >
      <input
        class="base-text field"
        type="tel"
        placeholder="Телефон *"
      >

      <h4 class="base-text title">
        О проекте
      </h4>
      <input
        class="base-text field"
        type="text"
        placeholder="Какие услуги вас интересуют?"
      >
      <textarea
        class="base-text field textarea"
        placeholder="С чем вам нужна помощь?"
      />

      <div class="form-row">
        <ButtonWithIcon
          :src-icon="arrowNext"
          style-button="white"
          class="submit"
        >
          ОТПРАВИТЬ
        </ButtonWithIcon>
        <p class="base-text agree">
          Нажимая на кнопку, я&nbsp;соглашаюсь с&nbsp;обработкой <a
            href="#"
            class="hover"
          >персональных данных</a>
        </p>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form{
  width: 100%;
  height: 76%;

  background-color: var(--strategix-accent);

  @media(--tablet-width){
    width: 50%;
    height: 100%;
  }
}

.lr-form {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 3vh 0;
  box-sizing: border-box; 

  display: flex;
  flex-direction: column;
  gap: 2.5%;

  color: var(--strategix-dark);
  background-color: var(--strategix-accent);

  @media(--tablet-width){
    padding: 4.25vh 0 0 min(108px, 4.5vw);
    gap: 1.6%;
  }
}

.title {
  margin: 0;

  font-size: clamp(20px, 2.6vw, 32px);
  font-weight: 500;     
  line-height: 110%;  
  letter-spacing: 0;
  text-align: left;
  text-transform: none;

  color: var(--strategix-dark);
  font-size: min(25px, 6.4vw);

  @media(--tablet-width){
    font-size: clamp(25px, 2.166vw, 52px);
    padding: 1.5vh 0 0 0;
  }

  @media(--mobile-medium) {
    font-size: min(25px, 5vh);
  }
}

.field {
  width: 100%;
  padding: 1.95vh 4vw;
  box-sizing: border-box;
  border-radius: var(--card-radius);
  border: 1px solid var(--strategix-dark);
  background: var(--strategix-accent);
  
  font-size: min(18px, 4.65vw);
  font-weight: 400;
  /* box-sizing: border-box; */
  outline: none;
  text-align: left;
  color: var(--strategix-dark);

  @media(--tablet-width){
    padding: min(16px, 1.2vh) min(40px, 1.8vw);
    font-size: clamp(18px, 1.5vw, 42px);
  }

  @media(--mobile-medium) {
    font-size: min(18px, 3.75vh);
  }
}

.field::placeholder{
  color: var(--strategix-dark);
  opacity: 0.8;
}

.textarea {
  height: 21%;
  resize: vertical; 
  color: var(--strategix-dark);

  @media(--tablet-width){
    height: 12%;
  }
}

.form-row {
  margin: 1% 0 0;
  
  display: flex;
  flex-direction: column;
  
  gap: 4%;

  @media(--tablet-width){
    margin: 3.5% 0 0;
    flex-direction: row;
    align-items: center;
  }
}

.submit{
  width: 100%;

  @media(--tablet-width){
    min-width: 36%;
    width: fit-content;
  }
}

.agree {
  width: 80%;
  margin: 1.6vh 0;

  font-size: min(15px, 3.85vw); 
  font-weight: 400;
  text-align: left;

  color: black; 

  @media(--tablet-width){
    min-width: 30%;
    width: fit-content;
    max-width: 50%;
    margin: 0;

    font-size: clamp(8px, 0.667vw, 16px);
  }

  @media(--mobile-medium) {
    font-size: min(8px, 2vh);
  }
}

.agree a { 
  color: white; 
  text-decoration: underline;
}

</style>