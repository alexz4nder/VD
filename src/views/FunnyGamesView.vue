<template>
  <div class="row">
    <h6 class="col-sm-12 col-md-9">{{ $t('catalog.sorting') }}</h6>
    <p class="col-sm-12 col-md-3">
      {{ $t('catalog.reverseOrder')
      }}<input type="checkbox" name="" id="" v-model="this.reverseOrder" />
    </p>

    <button @click="sortGamesByName" class="col-sm-12 col-md-6">
      {{ $t('catalog.sortByName') }}
    </button>
    <button @click="sortGamesByPrice" class="col-sm-12 col-md-6">
      {{ $t('catalog.sortByPrice') }}
    </button>
  </div>
  <hr />
  <div class="row">
    <p class="col-md-3 col-sm-12">{{ $t('catalog.minAndMaxPrice') }}</p>
    <input class="col-md-3 col-sm-6" type="text" name="minPrice" id="" v-model="this.minPrice" />
    <input class="col-md-3 col-sm-6" type="text" name="maxPrice" id="" v-model="this.maxPrice" />
    <button class="col-md-3 col-sm-12" @click="filterPrice">{{ $t('catalog.filter') }}</button>
  </div>
  <hr />
  <div class="row">
    <p class="col-md-12 col-sm-12">{{ $t('catalog.search') }}</p>
    <button class="col-md-6 col-sm-12" @click="searchGames">{{ $t('catalog.searchThis') }}</button>
    <input class="col-md-6 col-sm-12" type="text" name="" id="" v-model="this.searchBox" />
  </div>
  <hr />
  <button @click="resetFilters">{{ $t('catalog.reset') }}</button>
  <button @click="exportCatalogAsPdf">{{ $t('catalog.exportPdf') }}</button>

  <div class="row" id="gameList">
    <GameComponent
      v-for="game in this.allGamesList"
      :key="game.id"
      :gameId="game.id"
      :minimized="false"
    ></GameComponent>
  </div>
</template>

<script>
import GameComponent from '@/components/GameComponent.vue'
import { allGames } from '@/data/gameList'
import html2pdf from 'html2pdf.js'

export default {
  name: 'FunnyGamesView',
  components: { GameComponent: GameComponent },
  data() {
    return {
      allGamesList: [],
      reverseOrder: false,
      minPrice: 0,
      maxPrice: 999999,
      searchBox: '',
      searchArg: null,
    }
  },
  created() {
    for (let i = 0; i < allGames.length; i++) {
      if (allGames[i].category == 'funny') {
        this.allGamesList.push(allGames[i])
      }
    }
    this.$root.setBreadCrumb([
      'breadcrumb.homepage',
      'breadcrumb.catalog',
      'breadcrumb.catalogFunny',
    ])
  },
  methods: {
    sortGamesByName() {
      let thisObj = this
      this.allGamesList.sort(function (a, b) {
        let aname = thisObj.$t('gamesText[' + a.id.toString() + '].name')
        let bname = thisObj.$t('gamesText[' + b.id.toString() + '].name')

        return aname > bname
      })
      console.log(this.reverseOrder)
      if (this.reverseOrder) {
        this.allGamesList.reverse()
      }
      this.$forceUpdate()
    },
    sortGamesByPrice() {
      this.allGamesList.sort(function (a, b) {
        return b.price - a.price
      })
      if (this.reverseOrder) {
        this.allGamesList.reverse()
      }
      this.$forceUpdate()
      console.log(this.allGamesList)
    },
    filterPrice() {
      this.allGamesList = []
      for (let i = 0; i < allGames.length; i++) {
        if (allGames[i].category == 'funny') {
          this.allGamesList.push(allGames[i])
        }
      }

      console.log(this.allGamesList)
      for (let i = this.allGamesList.length - 1; i >= 0; i--) {
        if (
          this.allGamesList[i].price < this.minPrice ||
          this.allGamesList[i].price > this.maxPrice
        ) {
          this.allGamesList.splice(i, 1)
        }
      }
    },
    searchGames() {
      if (this.searchBox == '') {
        return
      }
      this.searchArg = this.searchBox

      let regex = new RegExp(this.searchArg)
      for (let i = this.allGamesList.length - 1; i >= 0; i--) {
        let gameName = this.$t('gamesText[' + this.allGamesList[i].id + '].name')
        if (regex.test(gameName) == false) {
          this.allGamesList.splice(i, 1)
        }
      }
      console.log(this.allGamesList)
    },
    resetFilters() {
      this.allGamesList = []
      for (let i = 0; i < allGames.length; i++) {
        if (allGames[i].category == 'funny') {
          this.allGamesList.push(allGames[i])
        }
      }
      this.minPrice = 0
      this.maxPrice = 999999
      this.searchArg = null
      this.searchBox = ''
    },
    exportCatalogAsPdf() {
      html2pdf(document.getElementById('gameList'))
    },
  },
}
</script>
