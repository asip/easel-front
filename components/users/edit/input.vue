<template>
  <div class="card-block">
    <br>
    <div class="row d-flex justify-content-sm-center">
      <label for="image" class="col-form-label col-sm-3 label-bg-style">{{ $t('model.user.image') }}：</label>
      <div class="form-group col-sm-4">
        <input type="file" accept="image/jpg,image/jpeg,image/png" multiple="false" @change="onSelectFile" class="form-control-file" >
        <div v-for="message of error_messages.image">
          <div>{{ message }}</div>
        </div>
      </div>
    </div>
    <Preview />
    <div v-if="!user.social_login" class="row d-flex justify-content-sm-center border border-white">
      <label for="name" class="col-form-label col-sm-3 label-bg-style">{{ $t('model.user.name') }}：</label>
      <div class="form-group col-sm-4">
        <input type="text" v-model="user.name" :placeholder="$t('model.user.name')" class="form-control">
        <div v-for="error of v$.name.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
        <div v-for="message of error_messages.name">
          <div>{{ $t('model.user.name') }}{{ message }}</div>
        </div>
      </div>
    </div>
    <div v-else class="row d-flex justify-content-sm-center border border-white">
      <label for="name" class="col-form-label col-sm-3 label-bg-style">{{ $t('model.user.name') }}：</label>
      <div class="form-group col-sm-4">
        <div class="form-control-plaintext">{{ user.name }}</div>
      </div>
    </div>
    <div v-if="!user.social_login" class="row d-flex justify-content-sm-center border border-white">
      <label for="email" class="col-form-label col-sm-3 label-bg-style">{{ $t('model.user.email') }}：</label>
      <div class="form-group col-sm-4">
        <input type="text" v-model="user.email" :placeholder="$t('model.user.email')" class="form-control" >
        <div v-for="error of v$.email.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
        <div v-for="message of error_messages.email">
          <div>{{ $t('model.user.email') }}{{ message }}</div>
        </div>
      </div>
    </div>
    <div v-else class="row d-flex justify-content-sm-center border border-white">
      <label for="email" class="col-form-label col-sm-3 label-bg-style">{{ $t('model.user.email') }}：</label>
      <div class="form-group col-sm-4">
        <div class="form-control-plaintext">{{ user.email }}</div>
      </div>
    </div>
    <div v-if="!user.social_login" class="row d-flex justify-content-sm-center border border-white">
      <label for="password" class="col-form-label col-sm-3 label-bg-style">{{ $t('model.user.password') }}：</label>
      <div class="form-group col-sm-4">
        <input type="password" v-model="user.password" :placeholder="$t('model.user.password')" class="form-control">
        <div v-for="error of v$.password.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
        <div v-for="message of error_messages.password">
          <div>{{ $t('model.user.password') }}{{ message }}</div>
        </div>
      </div>
    </div>
    <div v-if="!user.social_login" class="row d-flex justify-content-sm-center border border-white">
      <label for="password_confirmation" class="col-form-label col-sm-3 label-bg-style">{{ $t('model.user.password_confirmation') }}：</label>
      <div class="form-group col-sm-4">
        <input type="password" v-model="user.password_confirmation" :placeholder="$t('model.user.password_confirmation')" class="form-control">
        <div v-for="error of v$.password_confirmation.$errors" :key="error.$uid">
          <div>{{ error.$message }}</div>
        </div>
        <div v-for="message of error_messages.password_confirmation">
          <div>{{ $t('model.user.password_confirmation') }}{{ message }}</div>
        </div>
      </div>
    </div>
    <br>
    <div class="d-flex justify-content-sm-center">
      <div class="form-group col-sm-6">
        <button type="button" @click="onUpdateClick" class="btn btn-primary">{{ $t('action.model.create') }}</button>&nbsp;
        <NuxtLink :to="`/account/profile`" class="btn btn-outline-secondary">{{ $t('action.model.return') }}</NuxtLink>
      </div>
    </div>
    <br>
  </div>
</template>

<script setup lang="ts">
  const { login_user, user, v$, setUser, updateProfile, error_messages, isSuccess } = useLoginUser()

  setUser(login_user)

  const onSelectFile = ( event: Event ) => {
    const target = event.target as HTMLInputElement
    user.value.image = target.files![0] ;

    const file: { name?: string, ext?: string, data?: Blob | null } = {};
    file.name = target.value;
    file.ext = file?.name?.replace(/^.*\./, '').toLowerCase();
    //console.log(file.name)
    if (file?.ext?.match(/^(jpeg|jpg|png|gif)$/)) {
      // .file_filedからデータを取得して変数file.dataに代入します
      file.data = user.value.image
      //console.log(file.data)
      // FileReaderオブジェクトを作成します
      let reader = new FileReader()
      // 読み込みが完了したら処理が実行されます
      reader.onload = (function() {
        // 読み込んだファイルの内容を取得して変数imageに代入します
        let image: string | ArrayBuffer | null = reader.result;
        user.value.preview_url = image as string
      })
      // DataURIScheme文字列を取得します
      reader.readAsDataURL(file?.data)
      //preview.src = URL.createObjectURL(file.data)
      // プレビュー画像がなければ表示します
    }
  }

  const onUpdateClick= async () =>{
    await updateProfile()
    if(!v$.value.$invalid && isSuccess()){
      navigateTo('/account/profile')
    }
  }

  provide('model', user)
</script>