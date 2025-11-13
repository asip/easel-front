<script setup lang="ts">
import { GoogleSignInButton  } from 'vue3-google-signin'
import type { CredentialResponse } from 'vue3-google-signin';

const { closeModal } = useModal()
const { loginWithGoogle } = useAccount()

// handle success event
const handleLoginSuccess = async (response: CredentialResponse): Promise<void> => {
  // call your backend API here
  // the token can be accessed as: response.credential
  closeModal('#login_modal')
  await loginWithGoogle(response)
}

/*
const handleOneTapLoginSuccess = async (response: CredentialResponse): Promise<void> => {
  // call your backend API here
  // the token can be accessed as: response.credential
  await loginWithGoogle(response)
}
*/

// handle an error event
const handleLoginError = (): void => {
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
