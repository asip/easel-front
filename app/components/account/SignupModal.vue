<script setup lang="ts">

const form: Ref = ref(null)

const onBackClick = () => {
  form.value?.onBackClick()
}
</script>

<template>
  <div
    id="signup_modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-hidden="false"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content col-sm-8 kadomaru bottom-10">
        <div class="modal-header">
          <div class="float-start">
            <div class="float-start">
              <a
                href="#"
                @click="onBackClick"
              >
                <i class="bi bi-arrow-left-circle" />
              </a>&nbsp;
            </div>
            {{ $t('action.user.new') }}
          </div>
          <!---<button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />-->
        </div>
        <div class="modal-body">
          <UsersNewForm ref="form" />
        </div>
      </div>
    </div>
  </div>
</template>
