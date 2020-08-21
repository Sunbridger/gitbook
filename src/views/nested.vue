<style lang="less">

</style>

<template>
    <div>
        <center>这是嵌套路由：</center>
        <p>使用说明：</p>
        嵌套路由 <br/>
        创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。
        <p>////////////////////////////////////////</p>

        <button @click="goToR('a')">go to A</button>

        <button @click="goToR('b')">go to B</button>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    components: {

    },
    props: {

    },
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        goToR(name) {
            this.$router.push({
                name: `nested-${name}`
            });
        }
    },
    computed: {

    },
    watch: {

    },
};
</script>
