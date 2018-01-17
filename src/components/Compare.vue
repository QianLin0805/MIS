<template>
    <div class="compare" :class="{'slide':flag}" @click="stop">
        <slot></slot>
        <h3>竞品分析<span class="back" @click="back"><i class="icon-undo2"></i>返回</span></h3>
        <ul>
            <li>请选择要对比的产品（限3个）</li>
            <li v-for="(list, index) in proList" @click="select(index)">
                <span class="box"><img v-show="list.selected" src="../resource/image/dice.png" alt="" /></span>
                <span>{{list.val}}</span>
            </li>
            <li id="compare" @click="compare">对比</li>
        </ul>
        <ol>
            <li v-if="lists.length > 0">
                <h4></h4>
                <p>总评价数</p>
                <p>评论数</p>
                <p>参评率</p>
                <p>正向评论<br />比例</p>
                <p>中性评论<br />比例</p>
                <p>负向评论<br />比例</p>
                <p class="comment">正向评语</p>
                <p class="comment">负向评语</p>
            </li>
            <li v-for="list in lists">
                <h4>{{list.val}}</h4>
                <p>{{list.pandect.evaluateCount}}</p>
                <p>{{list.pandect.commentCount}}</p>
                <p>{{list.pandect.percentage.toFixed(2)}}%</p>
                <p><span>{{list.pie[0].cou}}</span><br /><span>{{list.pie[0].rate}}</span></p>
                <p><span>{{list.pie[1].cou}}</span><br /><span>{{list.pie[1].rate}}</span></p>
                <p><span>{{list.pie[2].cou}}</span><br /><span>{{list.pie[2].rate}}</span></p>
                <p class="comment center">{{list.positive}}</p>
                <p class="comment center">{{list.negative}}</p>
            </li>
        </ol>
    </div>
</template>

<script>
import {delay} from '@/resource/js/common.js'
export default {
    name: 'compare',
    data() {
        return {
            selected: [],
            lists: [],
            loadOver: true
        }
    },
    props: {
        proList: Array,
        flag: Boolean
    },
    methods: {
        stop(event){
            let e = event || window.event;
            e.stopPropagation();
        },
        back(){
            this.$emit('hideCompare');
        },
        select(index){
            let p = this.selected.indexOf(this.proList[index].name);
            if(p < 0){
                if(this.selected.length >= 3) return;
                this.selected.push(this.proList[index].name);
                this.$emit('select', index, true);
            }else{
                this.selected.splice(p, 1);
                this.$emit('select', index, false);
            }
        },
        compare(){
            if(this.selected.length <= 1 || !this.loadOver) return;
            this.loadOver = false;
            this.lists.splice(0, this.lists.length);
            let arr = [];
            this.selected.forEach((i) => {
                arr.push(delay(this, '/api/compare?name=' + i));
            });
            let promise = Promise.all(arr);
            promise.then((datas) => {
                let lists = [];
                datas.forEach((item) => {
                    let list = {};
                    list['name'] = item.name;
                    list['val'] = item.val;
                    list['positive'] = item.positive.join(',');
                    list['negative'] = item.negative.join(',');
                    list['count'] = 0;
                    list['pandect'] = item.pandect;
                    list['pie'] = [];
                    item.pie.forEach((i) => {
                        list.count += parseInt(i.cou);
                    });
                    item.pie.forEach((i) => {
                        let obj = {'cou': parseInt(i.cou), 'rate': ((parseInt(i.cou)/list.count)*100).toFixed(2)+'%'}
                        if(i.type == 'good') list.pie[0] = obj;
                        if(i.type == 'mid') list.pie[1] = obj;
                        if(i.type == 'bad') list.pie[2] = obj;
                    });
                    lists.push(list);
                });
                this.lists = lists;
                this.loadOver = true;
            });
        }
    }
}
</script>

<style lang="scss">
.compare{
    position: absolute; left: 100%; top: 0; z-index: 1; overflow-y: visible; color: #454545; width: calc(50% - 40px); height: 100vh; padding: 0 20px; background: #ddd; transition: left .2s ease-in;
    &.slide{left: 50%;}
    .entrance{
        display: flex; flex-direction: column; justify-content: center; position: absolute; left: -40px; top: 0; text-align: center; color: white; width: 16px; height: calc(7rem - 10px); padding: 0 12px; background: #454545; cursor: pointer;
    }
    h3{
        font-size: 1.1rem; color: #333; height: 3rem; line-height: 3rem; margin-top: 1rem;
        .back{
            float: right; font-size: 13px; font-weight: normal; color: #3af; text-indent: 0; cursor: pointer;
            i{margin-right: 3px; font-size: 12px;}
        }
    }
    ul{
        overflow: hidden;
        li{
            float: left; height: 2rem; line-height: 2rem; margin-right: 20px; cursor: pointer;
            &:first-child{float: none; font-size: 12px; margin: 0;}
            .box{
                display: inline-block; text-align: center; width: 10px; height: 10px; border: 1px solid #bbb; border-radius: 2px; background: #fafafa; margin-top: -2px; vertical-align: middle;
                img{width: 8px; vertical-align: top; margin-top: 1px;}
            }
        }
        #compare{clear: both; display: inline-block; font-size: .9rem; color: #3af; height: 2rem; line-height: 2rem; margin-top: 1rem; padding: 0 20px; border: 1px solid #bbb; border-radius: 5px; background: #efefef; cursor: pointer;}
    }
    ol{
        overflow: hidden; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #999;
        li{
            float: left; overflow: hidden; font-size: 12px; text-align: center; width: 25%;
            h4{font-size: 0.9rem; height: 3rem; line-height: 3rem; background: #ccc; border-left: 1px solid #ddd;}
            p{
                overflow: hidden; font-size: 1rem; line-height: 1.4rem; padding: .8rem 0; border-left: 1px solid #d5d5d5;
                &:nth-child(odd){background: #d3d3d3; border-left: 1px solid #ddd;}
                &.comment{display: flex; flex-direction: column; justify-content: center; height: 5.6rem;}
                &.center{text-align: left; padding-left: 5px; padding-right: 5px;}
            }
            &:first-child{ h4, p{border-left: none;} }
        }
    }
}
</style>
