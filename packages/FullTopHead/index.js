// 对外提供对组件的引用，注意组件必须声明 name
import PPFullTopHead from './src/main'
// 为组件提供 install 安装方法，供按需引入

PPFullTopHead.install = Vue => {
  Vue.component(PPFullTopHead.name, PPFullTopHead)
}
export default PPFullTopHead