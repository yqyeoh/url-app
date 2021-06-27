<template>
  <div class="text-center">
    <v-text-field
      :value="url"
      @input="handleInput"
      placeholder="Enter URL"
      outlined
      :error="showError"
      :error-messages="errorMsg"
      :loading="isLoading"
    />
    <v-btn class="ma-2" :color="btnColor" @click="handleClick">{{
      btnText
    }}</v-btn>
  </div>
</template>

<script>
import { shortenURL, lengthenURL } from "@/services/url";

const PURPOSE_SHORTEN = "shorten";
const PURPOSE_LENGTHEN = "lengthen";
const ACTION_FETCH = "fetch";
const ACTION_COPY = "copy";
const ACTION_COPIED = "copied";

export default {
  props: {
    purpose: {
      validator(value) {
        return [PURPOSE_SHORTEN, PURPOSE_LENGTHEN].includes(value);
      },
    },
  },
  data() {
    return {
      url: "",
      urlList: [],
      action: ACTION_FETCH,
      showError: false,
      errorMsg: "",
      isLoading: false,
    };
  },
  computed: {
    btnColor() {
      switch (this.action) {
        case ACTION_COPIED:
          return "success";
        default:
          return "primary";
      }
    },
    btnText() {
      switch (this.action) {
        case ACTION_COPIED:
          return "copied";
        case ACTION_COPY:
          return "copy";
        default:
          switch (this.purpose) {
            case PURPOSE_LENGTHEN:
              return "lengthen";
            default:
              return "shorten";
          }
      }
    },
  },
  methods: {
    handleInput(value) {
      this.action = ACTION_FETCH;
      this.url = value;
      this.errorMsg = "";
      this.showError = false;
    },
    handleClick() {
      this.errorMsg = "";
      this.showError = false;
      if (this.action === ACTION_FETCH) {
        if (!this.url) {
          this.errorMsg = "Invalid URL";
          this.showError = true;
          return;
        }
        this.fetchURL(this.url);
      } else {
        this.copyUrl({ url: this.url });
        this.action = ACTION_COPIED;
        setTimeout(() => {
          if (this.action === ACTION_COPIED) {
            this.action = ACTION_COPY;
          }
        }, 1500);
      }
    },
    async fetchURL(url) {
      try {
        this.isLoading = true;
        if (this.purpose === PURPOSE_SHORTEN) {
          this.url = await shortenURL({ url });
          this.urlList.push({ originalURL: url, shortURL: this.url });
        } else {
          this.url = await lengthenURL({ url });
          this.urlList.push({ originalURL: this.url, shortURL: url });
        }
        this.action = ACTION_COPY;
      } catch (error) {
        console.log(error);
        this.errorMsg = error.response.data.error;
        this.showError = true;
      } finally {
        this.isLoading = false;
      }
    },
    copyUrl({ url }) {
      const el = document.createElement("textarea");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    },
  },
};
</script>

<style></style>
