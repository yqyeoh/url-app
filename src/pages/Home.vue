<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <div class="text-h4 text-center">URL Shortener</div>
    </v-col>
    <v-col cols="12" style="max-width: 900px">
      <v-card outlined>
        <v-card-text>
          <v-tabs fixed-tabs>
            <v-tab> Shorten URL </v-tab>
            <v-tab> Get Original URL </v-tab>
            <v-tab-item class="mt-10">
              <url purpose="shorten" />
            </v-tab-item>
            <v-tab-item class="mt-10">
              <url purpose="lengthen" />
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Url from "@/components/Url";
export default {
  components: {
    Url,
  },
};
</script>

<style></style>
