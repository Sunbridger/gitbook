export default {
    install(Vue) {
        Vue.prototype.$setTitle = (title) => {
            document.title = title;
        }
    }
}
