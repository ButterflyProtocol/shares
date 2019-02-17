<template>
  <div>
    <router-view v-if="ready"></router-view>
    <div v-else>
      <span>Loading</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['ready'])
  },
  beforeCreate() {
    this.$store.dispatch('init', this.$dwns);
  }
};
</script>
