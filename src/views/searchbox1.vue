<template>
  <div>
    搜索框
    <search-box
      v-model="value"
      :history="history"
      @search="handleSearch"
      @update-history="handleHistory"
    />
  </div>
</template>

<script>
export default {
  name: "searchbox1",
  components: {
    searchBox: function() {
      return import("../components/SearchBox/SearchBox1.vue");
    }
  },
  data: function() {
    return {
      value: "",
      history: ["123", "abc"]
    };
  },
  methods: {
    handleSearch: function(key) {
      console.log("执行搜索:" + key);
    },
    handleHistory: function(history) {
      this.history = history;
    }
  }
};
</script>