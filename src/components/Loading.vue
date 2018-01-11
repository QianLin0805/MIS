<template>
    <div class="mask">
        <p class="loading" v-if="!loadover"><img src="../resource/image/loading.gif" alt="" /><br /><span>正在加载，请稍后...</span></p>
        <p class="faild" v-if="loadover && !result"><img src="../resource/image/faild.jpg" alt="" /><br /><span>服务器开了点小差！</span></p>
    </div>
</template>

<script>
export default {
    name: 'loading',
    props: {
        loadover: Boolean,
        result: Boolean
    }
}
</script>

<style lang="scss">
.mask{
    position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 99; background: #eee;
    p{
        position: absolute; left: 50%; top: 50%; text-align: center; transform: translate(-50%, -65%);
        img{width: 270px;}
        span{font-size: 13px; color: #999;}
    }
    .loading{transform: translate(-45%, -65%);}
    .faild{
        img{width: 210px;}
        span{line-height: 4rem;}
    }
}
</style>
