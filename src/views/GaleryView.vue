<template>
  <div>
    <div class="row">
      <img
        v-for="imag in galeryImages"
        :src="imag"
        alt=""
        class="col-sm-12 col-md-4 img-fluid img-thumbnail"
      />
    </div>
  </div>
</template>

<script>
import { galeryImages } from '@/data/galeryData'

export default {
  name: 'GaleryView',
  data() {
    return {
      galeryImages: galeryImages,
    }
  },
  created() {
    this.$root.setBreadCrumb([this.$t('breadcrumb.homepage'), this.$t('breadcrumb.galery')])
  },
}
</script>
