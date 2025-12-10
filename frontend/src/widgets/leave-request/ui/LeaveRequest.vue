<script setup lang="ts">
import Contacts from './Contacts.vue';
import Form from './Form.vue';
</script>

<template>
  <section class="leave-request">
    <Contacts />
    <Form />
  </section>
</template>

<style scped>
.leave-request {
    width: 100vw;
    height: calc(var(--vh) * 100);
    padding: 0 var(--padding-section-x);
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    background: linear-gradient(
      to bottom,
      var(--strategix-dark) 0%,
      var(--strategix-dark) 24%,
      var(--strategix-accent) 24%,
      var(--strategix-accent) 100%
    );

    @media(--tablet-width){
        height: calc(var(--vh) * 90);
        flex-direction: row;
        flex-wrap: nowrap;

        background: linear-gradient(
        to right,
        var(--strategix-dark) 0%,
        var(--strategix-dark) 50%,
        var(--strategix-accent) 50%,
        var(--strategix-accent) 100%
      );
    }
    
}
</style>
