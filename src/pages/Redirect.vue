<template>
  <v-row align="center" justify="center">
    <v-col>
      <div class="text-h2 text-center" v-if="notFound">Page Not Found</div>
    </v-col>
  </v-row>
</template>
<script>
import { lengthenURL } from "@/services/url";
export default {
  data() {
    return {
      notFound: false,
    };
  },
  created() {
    this.getOriginalURL();
  },
  methods: {
    async getOriginalURL() {
      try {
        const url = await lengthenURL({
          url: window.location.href,
        });
        window.location.replace(url);
      } catch (error) {
        console.log(error);
        this.notFound = true;
      }
    },
  },
};
</script>
