<script setup lang="ts">
const error = useError()
// if (error.value) error.value.statusCode = 500
</script>

<template>
  <div class="min-h-[100vh]">
    <Header />
    <div class="container mx-auto bg-aliceblue-200 error-html">
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
  .error-html {
    font-size: 16px;
    /* background: #FFF; */
    color: #261B23;
    display: grid;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Aptos, Roboto, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: clamp(1rem, 2.5vw, 2rem);
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.0025em;
    line-height: 1.4;
    min-height: 100vh;
    place-items: center;
    text-rendering: optimizeLegibility;
    -webkit-text-size-adjust: 100%;
  }

  b, strong {
    font-weight: 700;
  }

  i, em {
    font-style: italic;
  }

  main {
    font-size: 16px;
    /* background: #FFF; */
    color: #261B23;
    display: grid;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Aptos, Roboto, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: clamp(1rem, 2.5vw, 2rem);
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.0025em;
    line-height: 1.4;
    min-height: 100vh;
    place-items: center;
    text-rendering: optimizeLegibility;
    -webkit-text-size-adjust: 100%;
    gap: 1em;
    padding: 2em;
    text-align: center;
  }

  main header {
    width: min(100%, 12em);
  }

  main header svg {
    height: auto;
    max-width: 100%;
    width: 100%;
  }

  main article {
    width: min(100%, 30em);
  }

  main article p {
    font-size: 75%;
  }

  main article br {
    display: none;

    @media(min-width: 48em) {
      display: inline;
    }
  }
</style>