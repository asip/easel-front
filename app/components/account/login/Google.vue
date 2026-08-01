<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login'
import type { CallbackTypes } from 'vue3-google-login'

const { closeModal } = useModal()
const { loginWithGoogle } = useAccount()

// handle success event
const onSuccess = async (response: CallbackTypes.CredentialPopupResponse): Promise<void> => {
  // call your backend API here
  // the token can be accessed as: response.credential
  closeModal('#login_modal')
  await loginWithGoogle(response)
}

// handle an error event
const onError = (): void => {
  // console.error("Login failed");
}
</script>

<template>
  <ClientOnly>
    <GoogleLogin :callback="onSuccess" :error="onError" />
  </ClientOnly>
</template>
