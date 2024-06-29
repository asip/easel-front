<script setup lang="ts">
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'
import { useModal } from '~/composables/ui/use-modal'

const { closeModal } = useModal()
const { login_with_google } = useLoginUser()

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  // call your backend API here
  // the token can be accessed as: response.credential
  await login_with_google(response)
  closeModal('#login_modal')
}

/*
const handleOneTapLoginSuccess = async (response: CredentialResponse) => {
  // call your backend API here
  // the token can be accessed as: response.credential
  await login_with_google(response)
}
*/

// handle an error event
const handleLoginError = () => {
  // console.error("Login failed");
}

/*
useOneTap({
  disableAutomaticPrompt: false,
  onSuccess: handleOneTapLoginSuccess,
  onError: handleLoginError
})
*/
</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  />
</template>
