<script setup lang="ts">
  import ButtonWithIcon from '@/shared/ui/button-with-icon';
  import index from '@/content/pages/index.json'

  const { locale } = useI18n()
  const currentLocale = locale.value || 'example'
  const translations = index.translations[currentLocale as keyof typeof index.translations] || index.translations.example

  const formData = translations.leave_request.form
  const agreeData = formData?.agree || {}
</script>

<template>
  <form class="form">
    <div class="lr-form">
      <h4 class="base-text title">
        {{ formData.title }}
      </h4>
      <input
        class="base-text field"
        type="text"
        :placeholder="`${formData.name} *`"
      >
      <input
        class="base-text field"
        type="tel"
        :placeholder="`${formData.phone} *`"
      >

      <h4 class="base-text title">
        {{ formData.title2 }}
      </h4>
      <input
        class="base-text field"
        type="text"
        :placeholder="formData.question"
      >
      <textarea
        class="base-text field textarea"
        :placeholder="formData.question2"
      />

      <div class="form-row">
        <ButtonWithIcon
          style-button="white"
          class="submit"
        >
          {{ formData.button }}
        </ButtonWithIcon>
        <p class="base-text agree">
          {{ agreeData.text }} <a
            :href="agreeData.href_pdf || '#'"
            class="hover"
          >{{ agreeData.link }}</a>
        </p>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form{
  width: 100%;
  height: calc(var(--vh) * 76);
  padding: 0 var(--padding-section-x);
  box-sizing: border-box;

  background-color: var(--strategix-accent);

  @media(--tablet-width){
    width: 50%;
    height: 100%;
    padding: 0 var(--padding-section-x) 0 0;
  }
/* 
  @media(--mobile-medium){
    width: 100%;
    height: calc(var(--vh) * 76);
    padding: 0 var(--padding-section-x);
  } */
}

.lr-form {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: calc(var(--vh) * 3) 0;
  box-sizing: border-box; 

  display: flex;
  flex-direction: column;
  gap: 2.5%;

  color: var(--strategix-dark);
  background-color: var(--strategix-accent);

  @media(--tablet-width){
    padding: calc(var(--vh) * 4.25) 0 0 min(108px, 4.5vw);
    gap: 1.6%;
  }
}

.title {
  margin: 0;

  font-size: min(25px, 6.4vw);
  font-weight: 500;     
  line-height: 110%;  
  letter-spacing: 0;
  text-align: left;
  text-transform: none;

  color: var(--strategix-dark);

  @media(--tablet-width){
    font-size: clamp(25px, calc(1.166vw + var(--vh) * 1.3), 52px);
    padding: calc(var(--vh) * 1.5) 0 0 0;
  }

  @media(--mobile-medium) {
    font-size: min(25px, calc(var(--vh) * 5));
  }
}

.field {
  width: 100%;
  padding: min(15px, calc(var(--vh) * 1.95)) min(15px, 3.85vw);
  box-sizing: border-box;
  border-radius: var(--card-radius);
  border: 1px solid var(--strategix-dark);
  background: var(--strategix-accent);
  
  font-size: min(18px, 4.65vw);
  font-weight: 400;
  outline: none;
  text-align: left;
  color: var(--strategix-dark);

  @media(--tablet-width){
    padding: min(16px, calc(var(--vh) * 1.2)) min(40px, 1.8vw);
    font-size: clamp(18px, calc(1.1vw + var(--vh) * 0.6), 42px);
  }

  @media(--mobile-medium) {
    font-size: min(18px, calc(var(--vh) * 3.75));
  }
}

.field::placeholder{
  color: var(--strategix-dark);
  opacity: 0.8;
}

.textarea {
  min-height: 21%;
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
  @media(--tablet-width){
    min-width: 36%;
    width: fit-content;
  }
}

.agree {
  width: 80%;
  margin: calc(var(--vh) * 1.6) 0;

  font-size: min(15px, 3.85vw); 
  font-weight: 400;
  text-align: left;

  color: black; 

  @media(--tablet-width){
    min-width: 20%;
    width: fit-content;
    max-width: 40%;
    margin: 0;

    font-size: clamp(8px, calc(0.567vw + var(--vh) * 0.2), 16px);
  }

  @media(--mobile-medium) {
    font-size: min(8px, calc(var(--vh) * 2));
  }
}

.agree a { 
  color: white; 
  text-decoration: underline;
}

</style>
