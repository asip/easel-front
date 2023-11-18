<template>
  <div v-if="googleClientID !== ''" id="googleButton" />
</template>

<script setup lang="ts">
/// <reference types='google.accounts' />

import type { CredentialResponse } from '~/interfaces/credential_response'

const { googleClientID } = useConstants()
const { login_with_google } = useLoginUser()

onMounted(() => {
  const googleButton = document.getElementById('googleButton')
  if (googleButton) {
    google.accounts.id.initialize({
      client_id: googleClientID,
      callback: handleCredentialResponse // method to run after user clicks the Google sign in button
    })
    google.accounts.id.renderButton(
      googleButton,
      { type: 'standard', theme: 'outline', size: 'large' } // customization attributes
    )
    google.accounts.id.prompt() // also display the One Tap dialog
  }
})

const handleCredentialResponse = async (response: CredentialResponse) => {
  // call your backend API here
  // the token can be accessed as: response.credential
  await login_with_google(response)

  navigateTo('/')
}
</script>
