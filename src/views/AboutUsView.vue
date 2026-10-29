<template>
  <div>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum exercitationem facilis, libero
      dolore iusto error obcaecati minima est, voluptates quasi, a quis animi quas asperiores
      voluptatum quod porro aut velit consequuntur nam accusamus eaque et earum blanditiis?
      Exercitationem accusantium ipsum dolore iure aut a dignissimos doloribus, aperiam repellat rem
      fugit sequi in excepturi at veritatis maiores ullam odit nemo! Maiores dolor consectetur illo
      molestiae doloribus corrupti dolorum, esse, minima mollitia quas possimus suscipit tempore
      quasi sapiente, necessitatibus officiis quos provident quod sit eveniet exercitationem?
      Debitis quia quo quos architecto et ipsam soluta reiciendis quae alias. Veritatis hic
      architecto ducimus dolorem, amet exercitationem suscipit eaque aspernatur provident! Ab
      expedita doloribus blanditiis vero facilis quas distinctio earum sunt assumenda, debitis
      temporibus quisquam a soluta? Iste?
    </p>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1297.9161563161015!2d20.475642132566556!3d44.80576841245489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7a9f5ee145d3%3A0x3ed89b5bb505d83!2z0JXQu9C10LrRgtGA0L7RgtC10YXQvdC40YfQutC4INGE0LDQutGD0LvRgtC10YIg0KPQvdC40LLQtdGA0LfQuNGC0LXRgtCwINGDINCR0LXQvtCz0YDQsNC00YM!5e0!3m2!1ssr!2srs!4v1782644613750!5m2!1ssr!2srs"
      width="600"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'AboutUsView',
  created() {
    this.$root.setBreadCrumb(['breadcrumb.homepage', 'breadcrumb.about'])
  },
}
</script>
