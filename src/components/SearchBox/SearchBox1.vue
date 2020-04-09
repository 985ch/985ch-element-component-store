<template>
  <div>
    <el-autocomplete
      :ref="name"
      class="search-input"
      :value="value"
      :fetch-suggestions="getHistory"
      :placeholder="placeholder"
      :trigger-on-focus="false"
      clearable
      @input="input"
      @select="onSelected"
      @keyup.enter.native="search($event)"
    >
      <el-button slot="append" icon="el-icon-search" @click="search($event)" />
    </el-autocomplete>
  </div>
</template>
<script>
/*
 input：响应搜索框输入事件
 search：相应搜索按钮和回车
 */
export default {
  name: "SearchBox",
  props: {
    name: {
      // 组件名，用于获取组件实例
      type: String,
      default:
        "searchbox" + new Date() + ((Math.random() * 1000).toFixed(0) + "")
    },
    value: {
      // 输入框的值
      type: String,
      default: ""
    },
    placeholder: {
      // 搜索框提示内容
      type: String,
      default: "请输入搜索条件"
    },
    history: {
      // 传入的历史记录，每一个值都是字符串，如['abc','123']
      type: Array,
      default: function() {
        return [];
      }
    },
    max: {
      // 保留的最大历史记录数量
      type: Number,
      default: 10
    }
  },
  methods: {
    input: function(value) {
      this.$emit("input", value);
    },
    getHistory: function(text, cb) {
      var list = [];
      var cmp = this.value;
      var history = this.history;
      for (var i = 0; i < history.length; i++) {
        var cur = history[i];
        if (cur !== cmp && cur.includes(cmp)) {
          list.push({ value: cur });
        }
      }
      cb(list);
    },
    pushHistory: function(keyword) {
      var history = [keyword];
      var old = this.history;
      var max = Math.min(this.max - 1, old.length);
      for (let i = 0; i < max; i++) {
        if (old[i] !== keyword) history.push(old[i]);
      }
      return history;
    },
    search: function(event) {
      // 关闭建议框
      if (event) {
        event.target.blur();
        this.$refs[this.name].close();
      }
      // 触发搜索
      this.$emit("search", this.value);
      // 添加历史记录并触发事件
      if (this.value !== "") {
        var history = this.pushHistory(this.value);
        this.$emit("update-history", history);
      }
    },
    onSelected: function() {
      this.$refs[this.name].focus();
    }
  }
};
</script>
<style scoped>
.search-input {
  display: inline-block;
  width: 100%;
}
</style>