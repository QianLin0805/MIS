<template>
    <div class="detail">
        <v-loading v-if="!loadover || !result" :loadover="loadover" :result="result"></v-loading>
        <h3>{{title}}列表<a class="back" href="javascript:window.history.back()"><i class="icon-undo2"></i>返回</a></h3>
        <ul v-if="result">
            <v-list v-for="list in lists" :comment="list" :key="list.id"></v-list>
        </ul>
        <p v-if="result" class="more" @click="getList">加载更多评论</p>
    </div>
</template>

<script>
import Loading from './Loading'
import Comments from './Comments'
export default {
    name: 'detail',
    data() {
        return {
            lists: [],
            type: this.$route.params.type,
            start: 0,
            limit: 20,
            loadover: false,
            result: false
        }
    },
    created() {
        this.getList();
    },
    components: {
        'v-loading': Loading,
        'v-list': Comments
    },
    computed: {
        title(){
            if(this.type == 'good') return '好评';
            if(this.type == 'mid') return '中评';
            if(this.type == 'bad') return '差评';
        },
        replyList(){
            let arr = [];
        }
    },
    methods: {
        getList(){
            let mode;
            switch(this.$route.name){
                case 'zenboDetail' :
                    mode = 'sublist';
                    break;
                case 'noteDetail' :
                    mode = 'pcsublist';
                    break;
                case 'miDetail' :
                    mode = 'comsublist';
                    break;
            }
            this.$ajax({
                method: 'get',
                url: '/api/'+ mode +'/'+ this.type +'?start='+ this.start +'&limit='+ this.limit
            }).then((res) => {
                res.data.forEach((list) => {
                    this.lists.push(list);
                });
                this.start += this.lists.length;
                this.loadover = true;
                this.result = true;
            }).catch((err) => {
                this.loadover = true;
            });
        }
    }
}
</script>

<style lang="scss">
.detail{
    position: fixed; left: 60%; top: 0; z-index: 99; right: 0; overflow-x: hidden; overflow-y: visible; height: calc(100vh - 5rem);
    background: #f8f8f8; padding: 2rem 2rem 3rem; transition: all ease-in .2s;
    &.slide-enter,&.slide-leave-active{left: 100%;}
    h3{
        font-size: 1.2rem; color: #555; line-height: 3rem; font-weight: bold; text-indent: 1.2rem; border-bottom: 1px solid #ccc;
        .back{
            float: right; font-size: 13px; font-weight: normal; color: #3af; text-indent: 0; margin-right: 1rem;
            i{margin-right: 3px; font-size: 12px;}
        }
    }
    ul{
        overflow: hidden; margin: 1rem 0 2rem;
        li{
            position: relative; color: #666; line-height: 1.6rem; min-height: 1.6rem; padding: 1rem calc(2rem + 48px) 1rem 1.2rem;
            .viewMore{position: absolute; right: 1rem; top: 1rem; font-size: 12px; color: #3af; cursor: pointer;}
            &:nth-child(even){background: #eee;}
        }
    }
    .more{float: right; font-size: 12px; line-height: 2rem; color: #3af; margin-right: 1rem; cursor: pointer;}
}
</style>
