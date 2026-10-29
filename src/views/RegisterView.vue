<template>
  <div>
    <p>
      {{ $t('registration.username') }}
      <input type="text" name="" id="" v-model="this.username" />
      <br />
      {{ $t('registration.password') }}
      <input type="password" name="" id="" v-model="this.password" />
      <br />
      {{ $t('registration.confirmPassword') }}
      <input type="password" name="" id="" v-model="this.confirmPassword" />
      <br />
      <button @click="createAccount">{{ $t('registration.createAccount') }}</button>
      {{ this.errorMessage }}
    </p>
  </div>
</template>

<script>
import { startUsers } from '@/data/startUsers'

export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    }
  },
  created() {
    if (this.$root.$data.currentUser != null) {
      this.$router.push('/')
    }
    this.$root.setBreadCrumb(['breadcrumb.homepage', 'breadcrumb.registration'])
  },
  methods: {
    createAccount() {
      if (this.username == '' || this.password == '') {
        this.errorMessage = this.$t('registration.fieldsNotSet')
        return
      }

      if (this.password != this.confirmPassword) {
        this.errorMessage = this.$t('registration.repeatPasswordIncorrect')
        return
      }

      let allUsersText = localStorage.getItem('users')
      if (allUsersText == null) {
        allUsersText = JSON.stringify(startUsers)
        localStorage.setItem('users', allUsersText)
      }
      let allUsers = JSON.parse(allUsersText)

      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username == this.username) {
          this.errorMessage = this.$t('registration.userAlredyExists')
          return
        }
      }

      let newUser = {
        username: this.username,
        password: this.password,
      }
      allUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(allUsers))
      this.$router.push('/login')
    },
  },
}
</script>
