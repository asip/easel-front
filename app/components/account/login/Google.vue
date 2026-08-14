<script setup lang="ts">
import { GoogleSignInButton } from 'vue3-google-signin'
import type { CredentialResponse } from 'vue3-google-signin'

const { closeModal } = useModal()
const { loginWithGoogle } = useAccount()

// handle success event
const onSuccess = async (response: CredentialResponse): Promise<void> => {
  // call your backend API here
  // the token can be accessed as: response.credential
  closeModal('#login_modal')
  await loginWithGoogle(response)
}

// handle an error event
const onError = (): void => {
  // console.error("Login failed");
}

/*
const onOneTapSuccess = async (response: CredentialResponse): Promise<void> => {
  // call your backend API here
  // the token can be accessed as: response.credential
  await loginWithGoogle(response)
}

useOneTap({
  onSuccess: onOneTapSuccess,
  onError: onError
})
*/
</script>

<template>
  <ClientOnly>
    <GoogleSignInButton @success="onSuccess" @error="onError" />
  </ClientOnly>
</template>
