<template>
  <div>
    <p>{{ $t('userProfile.username') + ': ' + this.currentUser.username }}</p>
    <br />
    <button @click="logout">{{ $t('userProfile.logout') }}</button>
    <div v-if="this.totalPrice != 0.0">
      <h5>{{ $t('userProfile.cart') + ':' }}</h5>
      <div v-for="item in cart">
        <GameComponent :gameId="item.id"> </GameComponent>
        <input type="number" name="" id="" v-model="item.amount" @change="saveChange" />
      </div>
      <p>{{ $t('userProfile.totalPrice') + ':' + this.totalPrice }}</p>
      <button @click="purchase">{{ $t('userProfile.buyCart') }}</button>
    </div>
    <div v-else>
      {{ $t('userProfile.cartIsEmpty') }}
    </div>
    <hr />
    <!--HISTORY-->
    <h5>{{ $t('userProfile.purchaseHistory') + ':' }}</h5>
    <div v-for="oneCart in purchaseHistory">
      <div v-if="oneCart.username == this.$root.$data.currentUser.username">
        <div v-for="item in oneCart.cart" class="inline">
          <GameComponent :gameId="item.id" :minimized="true"></GameComponent>
          <span>&nbsp{{ $t('userProfile.amount') + ': ' + item.amount.toString() }}</span>
        </div>
        <p>{{ $t('userProfile.totalPrice') + ':' + oneCart.price }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import GameComponent from '@/components/GameComponent.vue'
import { allGames } from '@/data/gameList'

export default {
  name: 'UserProfileView',
  props: ['currentUser'],
  components: { GameComponent: GameComponent },
  data() {
    return {
      cart: [],
      totalPrice: 0.0,
      purchaseHistory: [],
    }
  },
  created() {
    if (this.currentUser == null) {
      this.$router.push('/')
    }

    this.$root.setBreadCrumb([''])

    let cartText = localStorage.getItem('cart')
    if (cartText != null) {
      let cartItems = JSON.parse(cartText)
      for (let i = 0; i < cartItems.length; i++) {
        this.cart.push(cartItems[i])
      }
    }
    this.computeTotalPrice()

    let purchaseHistoryText = localStorage.getItem('purchaseHistory')
    if (purchaseHistoryText == null) {
      localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory))
      purchaseHistoryText = localStorage.getItem('purchaseHistory')
    }
    let purchaseHistoryObj = JSON.parse(purchaseHistoryText)
    for (let i = 0; i < purchaseHistoryObj.length; i++) {
      this.purchaseHistory.push(purchaseHistoryObj[i])
    }
  },
  methods: {
    computeTotalPrice() {
      this.totalPrice = 0.0
      for (let i = 0; i < this.cart.length; i++) {
        let game = allGames[this.cart[i].id]
        let discount = 0.0
        if (game.discount !== undefined) {
          discount = game.discount
        }
        this.totalPrice += this.cart[i].amount * (1.0 - discount / 100) * game.price
      }
    },
    saveChange() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.computeTotalPrice()
    },
    purchase() {
      this.purchaseHistory.push({
        cart: this.cart,
        price: this.totalPrice,
        username: this.$root.$data.currentUser.username,
      })
      this.totalPrice = 0.0
      localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory))
      localStorage.removeItem('cart')
      this.cart.splice(0, this.cart.length)
    },
    logout() {
      localStorage.removeItem('cart')
      localStorage.removeItem('currentUser')
      this.$root.$data.currentUser = null
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.inline {
  display: flex;
  flex-direction: row;
}
</style>
