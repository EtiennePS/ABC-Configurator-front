<template lang="pug">
.itemList
  h1 Choose your options
  .item(v-if="!loading")
    h2 {{ item.name }}
    p {{ item.description }}
    span {{ item.price }}€
    .option(v-for="o in item.options" :key="o.id")
      span {{ o.name + " "}} 
      span {{ o.price }}€ 
      input(type="checkbox" v-model="o.isSelected")
    label Amount : 
    input(type="number" min="1" step="1" v-model="amount")
    .totalPrice {{ totalPrice }}€
    button(@click="goToItems") Cancel
    button(@click="saveToCart") Add to Cart
  span(v-if="loading")
    IconSpinner
    span Loading...
</template>

<script>
import itemService from "@/services/ItemService";
import cartLinesService from "@/services/CartLineService";
import IconSpinner from "@/components/IconSpinner";

export default {
  name: "ItemList",
  components : {
    IconSpinner
  },
  props: {
    id: null,
    idUser: null,
    token: null
  },
  data: function() {
    return {
      item: null,
      amount: 1,
      loading: true
    }
  },
  computed: {
    selectedOptions() {
      return this.item == null ? [] : this.item.options.filter(o => o.isSelected);
    },
    totalPrice() {
      return this.item == null ? 0 : (this.item.price + this.selectedOptions.reduce((a,b) => a + b.price, 0)) * this.amount;
    }
  },
  methods: {
    goToItems() {
      window.location.href = process.env.VUE_APP_ECOM_URL + "/items/" + this.idUser + "/" + this.token;
    },
    saveToCart() {
      const data = {
        item: {
          id: this.id
        },
        selectedOptions: this.selectedOptions,
        amount: this.amount
      };
      this.loading = true;
      cartLinesService.create(data, this.goToCart, alert, () => this.loading = false);
    },
    goToCart() {
      window.location.href = process.env.VUE_APP_ECOM_URL + "/cart/" + this.idUser + "/" + this.token;
    }
  },
  mounted() {
    const user = {
      token: this.token
    }
    this.$store.commit('login', user);

    let id = 1;
    itemService.getById(id, (response) => this.item = response, alert, () => this.loading = false)
  }
};
</script>
