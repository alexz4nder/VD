<template>
  <header class="row">
    <h2 class="col-sm-9">GameShop</h2>
    <div class="col-sm-3 col-md-3 languageSelect">
      <p>{{ $t('app.language') }}</p>
      <select v-model="this.$i18n.locale" @change="changeLanguage" class="form-select">
        <option v-for="locale in $i18n.availableLocales" :value="locale">
          {{ locale }}
        </option>
      </select>
    </div>
  </header>
  <div>
    <nav-component :current-user="this.currentUser"></nav-component>
    <p class="breadCrumb">
      {{ this.breadCrumb }}
    </p>
    <RouterView :currentUser="currentUser"></RouterView>
  </div>
  <footer>
    <div class="row">
      <div class="col-sm-6 baner1">baner1</div>
      <div class="col-sm-6 baner2">baner2</div>
      <div class="col-sm-6 baner3">baner3</div>
      <div class="col-sm-6 baner4">baner4</div>
    </div>
    <p>
      Coopyright 2026, Aleksandar Nikolić, Odsek za softversko inženjerstvo Elektrotehničkog
      fakulteta Univerziteta u Beogradu
    </p>
    <br />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-instagram"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
      />
    </svg>
    &nbsp;
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-facebook"
      viewBox="0 0 16 16"
    >
      <path
        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
      />
    </svg>
  </footer>
</template>

<script>
import NavComponent from './components/NavComponent.vue'
import HomePageView from './views/HomePageView.vue'
import LoginView from './views/LoginView.vue'
import { startUsers } from './data/startUsers.js'
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    NavComponent: NavComponent,
  },
  created() {
    let usersText = localStorage.getItem('users')
    if (usersText == null) {
      localStorage.setItem('users', JSON.stringify(startUsers))
    }
    this.users = JSON.parse(localStorage.getItem('users'))

    let currentUserText = localStorage.getItem('currentUser')
    if (currentUserText != null) {
      this.currentUser = JSON.parse(currentUserText)
    }

    let localeText = localStorage.getItem('language')
    if (localeText == null) {
      localeText = 'sr'
      localStorage.setItem('language', localeText)
    }
    this.$i18n.locale = localeText
  },
  data() {
    return {
      users: null,
      currentUser: null,
      breadCrumb: 'breadcrumb',
    }
  },
  methods: {
    logInUser(user) {
      alert('APP LOGIN')
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
    setBreadCrumb(newBreadCrumb) {
      this.breadCrumb = this.$t(newBreadCrumb[0])
      for (let i = 1; i < newBreadCrumb.length; i++) {
        this.breadCrumb += ' > ' + this.$t(newBreadCrumb[i])
      }
    },
    changeLanguage() {
      localStorage.setItem('language', this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
footer {
  text-align: center;
  min-height: 20vh;
  margin-top: 3%;
}
header {
  position: sticky;
  top: 0;
  background-color: white;
}
.baner1 {
  background-color: red;
  height: 5vh;
}
.baner2 {
  background-color: blue;
  height: 5vh;
}
.baner3 {
  background-color: yellow;
  height: 5vh;
}
.baner4 {
  background-color: green;
  height: 5vh;
}

.languageSelect {
  white-space: nowrap;
}
.languageSelect p {
  display: inline;
}
.languageSelect select {
  display: inline;
  margin: 5px;
  width: 50%;
}
.breadCrumb {
  margin: 2%;
  box-shadow: 2px 2px 4px;
  border-radius: 5%;
}
</style>
