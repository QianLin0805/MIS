<template>
    <li :id="comment.id">
        <span>{{text}}</span>
        <span class="viewMore" v-if="!flag" @click="viewDetail(comment.commentid)">查看详细</span>
        <span class="viewMore" v-if="flag" @click="viewDetail(comment.commentid)">隐藏</span>
    </li>
</template>

<script>
export default {
    name: 'comments',
    data() {
        return {
            text: this.comment.sentence,
            btntext: '',
            flag: false
        }
    },
    props: {
        comment: Object
    },
    methods: {
        viewDetail(id){
            if(this.flag){
                this.text = this.comment.sentence;
                this.flag = false;
            }else{
                let mode;
                switch(this.$route.name){
                    case 'zenboDetail' :
                        mode = 'comment';
                        break;
                    case 'noteDetail' :
                        mode = 'pccomment';
                        break;
                    case 'miDetail' :
                        mode = 'comcomment';
                        break;
                }
                this.$ajax({
                    method: 'get',
                    url: '/api/'+ mode +'/'+ id
                }).then((res) => {
                    this.text = res.data.content;
                    this.flag = true;
                }).catch((err) => {
                    console.log('访问失败');
                });
            }
        }
    }
}
</script>

<style lang="scss">

</style>
