<template>
    <div class="detail" :class="{'slide':type}" @click="stop">
        <h3>{{title}}列表<a class="back" @click="back"><i class="icon-undo2"></i>返回</a></h3>
        <ul v-if="lists.length > 0">
            <v-list v-for="list in lists" :comment="list" :key="list.id"></v-list>
        </ul>
        <p v-if="start<count" class="more" @click="getList">加载更多评论</p>
    </div>
</template>

<script>
import Comments from './Comments'
export default {
    name: 'detail',
    data() {
        return {
            lists: [],
            start: 0,
            limit: 20,
            loadover: false,
            result: false
        }
    },
    props: {
        type: String,
        count: Number
    },
    components: {
        'v-list': Comments
    },
    computed: {
        title(){
            if(this.type == 'good') return '正向';
            if(this.type == 'mid') return '中性';
            if(this.type == 'bad') return '负向';
        }
    },
    watch: {
        type(val, oldval){
            if(val){
                this.getList();
            }else{
                setTimeout(() => {
                    this.start = 0;
                    this.lists.splice(0, this.lists.length);
                }, 200);
            }
        }
    },
    methods: {
        getList(){
            let mode;
            switch(this.$route.name){
                case 'zenbo' :
                    mode = 'sublist';
                    break;
                case 'note' :
                    mode = 'pcsublist';
                    break;
                case 'mi' :
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
            }).catch((err) => {
                console.log('数据加载失败');
            });
        },
        stop(event){
            let e = event || window.event;
            e.stopPropagation();
        },
        back(){
            this.$emit('hideDetail');
        }
    }
}
</script>

<style lang="scss">
.detail{
    position: absolute; right: 0; top: 0; z-index: 99; overflow-x: hidden; overflow-y: visible; width: 40%; height: calc(100vh - 5rem);
    background: #f8f8f8; padding: 2rem 2rem 3rem; transform: translateX(100%); transition: all ease-in .2s;
    &.slide{ transform: translateX(0);}
    h3{
        font-size: 1.2rem; color: #555; line-height: 3rem; font-weight: bold; text-indent: 1.2rem; border-bottom: 1px solid #ccc;
        .back{
            float: right; font-size: 13px; font-weight: normal; color: #3af; text-indent: 0; margin-right: 1rem; cursor: pointer;
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
