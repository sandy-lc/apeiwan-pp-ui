// 对外提供对组件的引用，注意组件必须声明 name
import PPCallSound from './src/main'
// 为组件提供 install 安装方法，供按需引入

PPCallSound.install = Vue => {
  Vue.component(PPCallSound.name, PPCallSound)
}
export default PPCallSound