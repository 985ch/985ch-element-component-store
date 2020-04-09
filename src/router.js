import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const samples = [
  {
    title: '搜索框',
    list: [
      { path: 'searchbox1', intro: '自带历史记录的搜索框，历史记录通常来自本地储存，不适用于远程获取的历史记录' }
    ]
  }
]

function buildARoute(path) {
  return {
    path: '/' + path,
    name: path,
    component: function () {
      return import('./views/' + path + '.vue')
    }
  }
}

function buildRouters() {
  const routers = [
    {
      path: '/',
      name: 'index',
      component: function () { return import('./views/index.vue') }
    }
  ]
  for (var i = 0; i < samples.length; i++) {
    var node = samples[i]
    var list = node.list
    for (var j = 0; j < list.length; j++) {
      var item = list[j]
      routers.push(buildARoute(item.path))
    }
  }
  return routers
}

export default new Router({
  routes: buildRouters()
})

export { samples }