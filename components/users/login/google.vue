<template>
  <div v-if="googleClientID !== ''" id="googleButton"></div>
</template>

<script setup lang="ts">
/// <reference types='google.accounts' />
  const { googleClientID } = useConstants()
  const { login_with_google } = useLoginUser()

  onMounted(() => {
    google.accounts.id.initialize({
      client_id: googleClientID,
      callback: handleCredentialResponse, //method to run after user clicks the Google sign in button
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  })

  const handleCredentialResponse = async (response: any) => {
    // call your backend API here
    // the token can be accessed as: response.credential
    await login_with_google(response)

    navigateTo('/')
  }
</script>