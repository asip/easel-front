<template>
  <div v-if="googleClientID !== ''" ref="googleButtonRef" />
</template>

<script setup lang="ts">
/// <reference types='google.accounts' />

import { useModal } from '~/composables/ui/use_modal'
import type { CredentialResponse } from '~/interfaces/credential_response'

const { closeModal } = useModal()
const { googleClientID } = useConstants()
const { login_with_google } = useLoginUser()

const googleButtonRef = ref(null)

onMounted(() => {
  const googleButton = googleButtonRef.value

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
  closeModal('#login_modal')
}
</script>
