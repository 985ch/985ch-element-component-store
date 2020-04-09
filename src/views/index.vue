<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        :title="node.title"
        :name="node.title"
        v-for="(node,index) in samples"
        :key="index"
      >
        <router-link
          v-for="item in node.list"
          :to="'/'+item.path"
          :key="item.path"
        >{{item.path+':'+item.intro}}</router-link>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { samples } from "../router";

export default {
  name: "index",
  data() {
    return {
      activeName: "",
      samples
    };
  }
};
</script>