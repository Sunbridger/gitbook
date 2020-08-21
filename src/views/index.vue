<style lang="less" scoped>
    .pg-hello {
        padding: 12px;
        .kebi-icon {
            display: block;
            margin: 25px auto;
        }
        .tip-word {
            color: green;
        }
    }
</style>

<template>
    <div class="pg-hello">
        <center>欢迎使用Vue2.x...</center>
        <center @click="goToR">
            <button>路由测试</button>
        </center>
        <img class="kebi-icon" src="~assets/kebi.jpg" alt="">
        <center class="tip-word">
            到2020 07 31为止 <br/>
            基础组合：<br/>
            vue 最新的线上版本是 2.6.11 <br/>
            vue-router 最新版本 3.3.4 <br/>
            vuex 最新版本是 3.5.1 <br/>
            axios 最新版本 0.19.2  <br/>
            开发依赖： <br/>
            webpack 最新版本是 4.44.1 <br/>
            webpack-cli 最新版本是3.3.12 <br/>
            babel/core 最新 7.11.0 <br/>
        </center>
    </div>
</template>

<script>

import Api from 'api';

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
        // this.getInitData();
        this.$setTitle('Hello ~')
    },
    methods: {
        getInitData() {
            Api.getTestData().then(({data}) => {
                console.log(data, '测试网络请求数据');
            });
        },
        goToR() {
            this.$router.push({
                name: 'nested'
            });
        }
    },
    computed: {

    },
    watch: {

    }
};
</script>
