<template>
  <div v-if="this.currentUser == null">
    <p>{{ $t('loginView.username') }}</p>
    <input type="text" name="" id="" v-model="this.loginUsername" />
    <br />
    <p>{{ $t('loginView.password') }}</p>
    <input type="password" name="" id="" v-model="this.loginPassword" />
    <br />
    <button @click="login()">{{ $t('loginView.login') }}</button>
    <p>{{ this.errorMessage }}</p>

    <br />
    <p>
      {{ $t('loginView.dontHaveAccount')
      }}<RouterLink to="/registration">{{ $t('loginView.registration') }}</RouterLink>
    </p>
  </div>
  <div v-else>
    <p>{{ $t('loginView.alredyLoggedIn') }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  props: ['currentUser'],
  created() {
    this.$root.setBreadCrumb(['breadcrumb.homepage', 'breadcrumb.login'])
  },
  data() {
    return {
      users: null,
      loginUsername: '',
      loginPassword: '',
      errorMessage: '',
    }
  },
  methods: {
    login() {
      this.users = JSON.parse(localStorage.getItem('users'))

      if (this.currentUser != null) {
        return
      }
      console.log(this.users)
      for (let i = 0; i < this.users.length; i++) {
        let user = this.users[i]
        if (user.username == this.loginUsername && user.password == this.loginPassword) {
          this.$root.logInUser(user)
          this.$router.push('/')
          return
        }
      }
      this.errorMessage = 'WRONG CREDENTIALS'
    },
  },
}
</script>
