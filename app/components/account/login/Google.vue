<script setup lang="ts">
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin'

const { closeModal } = useModal()
const { login_with_google } = useLoginUser()

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  // call your backend API here
  // the token can be accessed as: response.credential
  closeModal('#login_modal')
  await login_with_google(response)
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
