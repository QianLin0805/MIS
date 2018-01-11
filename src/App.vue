<template>
    <div id="app" @click="back">
        <img src="./resource/image/bg.jpg" alt="" class="bg" />
        <div class="menu">
            <p class="icon"><i class="icon-compass"></i></p>
            <ul>
                <li><img src="./resource/image/logo.png" alt="" class="logo" /></li>
                <li v-for="list in proList"><router-link :to="{name:list.name}">{{list.val}}</router-link></li>
            </ul>
        </div>
        <keep-alive><router-view class="main">
            <h1 class="header"><span class="logo">京东用户舆情分析系统</span>{{title}}</h1>
            <div class="compare" :class="{'slide':compareFlag}">
                <p v-show="!compareFlag" @click="compareFlag=true">竞品分析</p>
                <h3>竞品分析</h3>
                <ul>
                    <li v-for="(list, index) in proList"><input type="checkbox" /><span>{{list.val}}</span></li>
                    <li>对比</li>
                </ul>
            </div>
        </router-view></keep-alive>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            proList: [
                {
                    name: 'zenbo',
                    val: 'Zenbo'
                },
                {
                    name: 'note',
                    val: '顽石畅玩版R414UV'
                },
                {
                    name: 'mi',
                    val: '小米(MI)Air 13.3'
                }
            ],
            compareFlag: false
        }
    },
    computed: {
        title(){
            let str;
            switch(this.$route.name){
                case 'zenbo' : 
                    str = 'Zenbo';
                    break;
                case 'note' : 
                    str = '顽石畅玩版R414UV';
                    break;
                case 'mi' : 
                    str = '小米(MI)Air 13.3';
                    break;
            }
            return str;
        }
    },
    methods: {

        back(){
            if(/detail/gi.test(this.$route.name)){
                window.history.back();
            }
        }
    }
}
</script>

<style lang="scss">
#app{
    position: relative; overflow: hidden; width: 100%; height: 100vh; background: #151515;
    .bg{position: absolute; left: 50%; top: 50%; min-width: 100%; min-height: 100%; transform: translate(-50%, -50%);}
    .menu{
        position: absolute; left: -200px; top: 0; z-index: 999; width: 240px; height: 100vh; background: #454545;
        transition: left .15s ease-in;
        &:hover{left: 0;}
        .icon{
            position: absolute; right: 10px; top: 30px; font-size: 18px; color: white; text-align: center;
            width: 20px; height: 20px; line-height: 20px;
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
        display: flex; flex-direction: row; position: relative; color: #e5e5e5; height: calc(100vh - 7rem); padding: 0 10px 0 50px;
        .header{
            position: absolute; font-size: 1.5rem; font-weight: bold; text-align: center; letter-spacing: 1px;
            color: white; width: 100%; height: 7rem; line-height: 6.4rem;
            .logo{position: absolute; left: 0; color: rgba(255,255,255,.75);}
        }
        .compare{
            position: absolute; left: 100%; top: 0; z-index: 1; overflow-y: visible; width: 50%; height: 100vh; background: #fff;
            transition: left .2s ease-in;
            &.slide{left: 50%;}
            p{
                display: flex; flex-direction: column; justify-content: center; position: absolute; left: -40px; top: 0;
                text-align: center; color: white; width: 16px; height: calc(7rem - 10px); padding: 0 12px; background: #454545; cursor: pointer;
            }
        }
        .area{
            display: flex; position: relative; flex-direction: column; height: calc(100vh - 8rem); margin-top: 7rem;
            .box{
                flex: auto; background: rgba(255,255,255,.12);
                h2{
                    font-size: 1rem; color: #eee; text-indent: 20px; height: 2.5rem; line-height: 2.4rem; background: rgba(255,255,255,.15);
                    span{float: right; font-size: 12px; margin-right: 20px; cursor: pointer;}
                }
                .tip{text-align: center; height: 3rem; line-height: 3rem;}
            }
            &.left{
                flex: 0 0 270px;
                ul{
                    overflow: hidden; margin-top: 1rem;
                    li{
                        overflow: hidden; font-size: 12px; height: 3rem; line-height: 3rem; padding: 0 20px;
                        span:first-child{display: inline-block; width: 100px;}
                        &:nth-child(even){background: rgba(255,255,255,.05);}
                    }
                }
                .bottom{
                    flex: 0 0 calc(50% - 7px); margin-top: 7px;
                    li{height: auto; line-height: 1.2rem; padding: 10px 20px;}
                }
            }
            &.mid{
                flex: auto; margin: 7rem 7px 0;
                .bar{position: absolute; left: 0; top: 50%; width: 100%; height: 64vh; margin-top: -30vh;}
            }
            &.right{
                flex: 0 0 480px;
                .top{
                    position: relative;
                    .pie{position: absolute; left: 0; top: 50%; width: 100%; height: 35vh; margin-top: -16vh;}
                }
                .bottom{
                    position: relative; flex: 0 0 calc(50% - 7px); margin-top: 7px;
                    svg{
                        position: absolute; left: 50%; top: 50%; overflow: hidden; width: 320px; height: 320px;
                        background: rgba(0,0,0,.5); border-radius: 100%; margin: -140px 0 0 -160px;
                    }
                }
            }
        }
    }
}
</style>
