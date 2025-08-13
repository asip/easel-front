<script setup lang="ts">
const error = useError()
</script>

<template>
  <div class="min-h-[100vh]">
    <Header />
    <div class="container mx-auto bg-aliceblue-200">
      <ErrorBadRequest v-if="error?.statusCode == 400" />
      <ErrorForbidden v-if="error?.statusCode == 403" />
      <ErrorNotFound v-if="error?.statusCode == 404" />
      <ErrorUnprocessableEntity v-if="error?.statusCode == 422" />
      <ErrorInternalServerError v-if="error?.statusCode == 500" />
    </div>
    <Footer />
  </div>
</template>

<style>
  div.dialog {
    color: #2E2F30;
    text-align: center;
    font-family: arial, sans-serif;
    width: 95%;
    max-width: 33em;
    margin: 4em auto;
  }

  div.dialog > div {
    border: 1px solid #999;
    border-top: 4px #B00100;
    border-bottom-color: #BBB;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    background-color: white;
    padding: 7px 12% 0;
    box-shadow: 0 3px 8px rgba(50, 50, 50, 0.17);
  }

  div.dialog h1 {
    font-size: 100%;
    color: #730E15;
    line-height: 1.5em;
    margin: 10px 0;
  }

  div.dialog p {
    margin: 16px 0;
  }

  div.dialog > p {
    margin: 0 0 1em;
    padding: 1em;
    background-color: #F7F7F7;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid #999;
    border-top-color: #DADADA;
    color: #666;
    box-shadow: 0 3px 8px rgba(50, 50, 50, 0.17);
  }
</style>