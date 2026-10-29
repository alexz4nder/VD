<template>
  <div class="row navigationBar">
    <RouterLink to="/" class="col-sm-12 col-md-2 linkField">
      {{ $t('navbar.homepage') }}
    </RouterLink>
    <RouterLink to="/galery" class="col-sm-12 col-md-2 linkField">
      {{ $t('navbar.galery') }}
    </RouterLink>

    <!-- CATALOG DROPDOWN -->
    <span class="col-sm-12 col-md-2 dropdownMenu linkField">
      <RouterLink to="/catalog">{{ $t('navbar.catalog') }} </RouterLink>
      <button class="dropdown-toggle btn"></button>
      <span class="dropdownContent">
        <RouterLink to="/catalog/strategies" class="dropdown-item">{{
          $t('navbar.catalogStrat')
        }}</RouterLink>
        <RouterLink to="/catalog/family" class="dropdown-item">{{
          $t('navbar.catalogFamily')
        }}</RouterLink>
        <RouterLink to="/catalog/funny" class="dropdown-item">{{
          $t('navbar.catalogFunny')
        }}</RouterLink>
      </span>
    </span>

    <!-- CATALOG DROPDOWN END -->

    <RouterLink to="/about" class="col-sm-12 col-md-2 linkField">{{
      $t('navbar.about')
    }}</RouterLink>

    <span class="col-md-2 col-sm-0"></span>

    <RouterLink to="/login" v-if="this.currentUser == null" class="col-sm-12 col-md-2 linkField">{{
      $t('navbar.login')
    }}</RouterLink>
    <RouterLink to="/user/currentUser.username" v-else class="col-sm-12 col-md-2 linkField">{{
      this.currentUser.username
    }}</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'NavComponent',
  props: ['currentUser'],
}
</script>

<style scoped>
.router-link-active {
  font-weight: bolder;
}
a {
  color: black;
  text-decoration: none;
  height: 100%;
}
a:hover {
  font-weight: bold;
}
.linkField {
  /*background-color: rgb(202, 202, 202);
  border-left-width: 1px;
  border-left-color: black;
  border-left-style: solid;
  padding: 15 15;*/
  text-align: center;
  align-self: center;
}

.dropdownMenu {
  display: inline;
}
.dropdownMenu button {
  padding: 10px 15px;
  cursor: pointer;
}
.dropdownMenu a {
  color: black;
  text-decoration: none;
  padding: 10px 15px;
}
.dropdownMenu .dropdownContent {
  display: none;
  position: absolute;
  background-color: rgb(242, 242, 242);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
}
.dropdownMenu:hover .dropdownContent {
  display: block;
}
.dropdownMenu:hover button {
  background-color: rgb(195, 195, 195);
}
.navigationBar {
  background-color: rgb(246, 246, 246);
  box-shadow: 1px 1px 2px;
}
</style>
