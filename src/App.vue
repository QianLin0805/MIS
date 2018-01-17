<template>
    <div id="app" @click="hideCompare">
        <img src="./resource/image/bg.jpg" alt="" class="bg" />
        <div class="menu">
            <p class="icon"><i class="icon-compass"></i></p>
            <ul>
                <li><img src="./resource/image/logo.png" alt="" class="logo" /></li>
                <li v-for="list in proList"><router-link :to="{name:list.name}">{{list.val}}</router-link></li>
            </ul>
        </div>
        <keep-alive><router-view class="main" :proList="proList"></router-view></keep-alive>
        <v-compare :proList="proList" :flag="compareFlag" @select="select" @hideCompare="hideCompare">
            <p class="entrance" v-show="!compareFlag" @click="showComapre">竞品分析</p>
        </v-compare>
    </div>
</template>

<script>
import Compare from '@/components/Compare'
export default {
    name: 'app',
    data() {
        return {
            proList: [
                {
                    name: 'zenbo',
                    val: 'Zenbo',
                    selected: false,
                    info: 'zenboinfo',
                    month: 'monthlist',
                    day: 'daylist',
                    pie: 'subpie'
                },
                {
                    name: 'note',
                    val: '顽石畅玩版R414UV',
                    selected: false,
                    info: 'pcinfo',
                    month: 'pcmonthlist',
                    day: 'pcdaylist',
                    pie: 'pcpie'
                },
                {
                    name: 'mi',
                    val: '小米(MI)Air 13.3',
                    selected: false,
                    info: 'cominfo',
                    month: 'commonthlist',
                    day: 'comdaylist',
                    pie: 'compie'
                }
            ],
            compareFlag: false
        }
    },
    components: {
        'v-compare': Compare
    },
    methods: {
        showComapre(){
            this.compareFlag = true;
        },
        hideCompare(){
            this.compareFlag = false;
        },
        select(index, val){
            this.proList[index].selected = val;
        }
    }
}
</script>

<style lang="scss">
#app{
    position: relative; overflow: hidden; width: 100%; height: 100vh; background: #151515;
    .bg{position: absolute; left: 50%; top: 50%; min-width: 100%; min-height: 100%; transform: translate(-50%, -50%);}
    .menu{
        position: absolute; left: -200px; top: 0; z-index: 999; width: 240px; height: 100vh; background: #454545; transition: left .15s ease-in;
        &:hover{left: 0;}
        .icon{
            position: absolute; right: 10px; top: 30px; font-size: 18px; color: white; text-align: center; width: 20px; height: 20px; line-height: 20px;
        }
        ul{
            position: absolute; left: 0; right: 20px; top: 36%; overflow: hidden; font-size: 12px; transform: translateY(-50%);
            li{
                text-indent: 3rem; height: 1.3rem; line-height: 1.3rem; padding: .6rem 0;
                &:first-child{
                    overflow: hidden; height: auto; margin-bottom: 30px; padding: 0;
                    .logo{height: 20px;}
                }
                a{color: rgba(255,255,255,.5); width: 100%;}
                .active{color: white;}
            }
        }
    }
    .main{
        display: flex; flex-direction: row; position: relative; color: #e5e5e5; height: 100vh; padding: 0 10px 0 50px;
    }
}
</style>
