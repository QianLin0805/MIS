<template>
    <div class="note">
        <div class="area left">
            <div class="box top">
                <h2>总览</h2>
                <p class="tip" v-if="!pandect">加载中...</p>
                <ul v-if="pandect">
                    <li>总评价数（约销量）：<span>{{pandect.evaluateCount}}</span></li>
                    <li>评论数：<span>{{pandect.commentCount}}</span></li>
                    <li>参评率：<span>{{pandect.percentage.toFixed(2)}}%</span></li>
                </ul>
            </div>
            <div class="box bottom">
                <h2>公告</h2>
                <p class="tip" v-if="!loadover">加载中...</p>
                <ul>
                    <li>喜报：（好）10月份月评论超出平均50%以上</li>
                    <li>告警：（差）X月x日周差评价数高于平均30%以上</li>
                </ul>
            </div>
        </div>
        <div class="area mid">
            <div class="box" v-show="slideFlag">
                <h2>近10月评论统计<span @click="slide">切换日评论</span></h2>
                <p class="tip" v-if="!loadover">加载中...</p>
                <div class="bar" ref="month"></div>
            </div>
            <div class="box" v-show="!slideFlag">
                <h2>近10日评论统计<span @click="slide">切换月评论</span></h2>
                <p class="tip" v-if="!loadover">加载中...</p>
                <div class="bar" ref="day"></div>
            </div>
        </div>
        <div class="area right">
            <div class="box top">
                <h2>总评论分布比例</h2>
                <p class="tip" v-if="!loadover">加载中...</p>
                <div class="pie" ref="rate"></div>
            </div>
            <div class="box bottom">
                <h2>词频分布<span v-show="front" @click="front=!front">正面</span><span v-show="!front" @click="front=!front">负面</span></h2>
                <p class="tip" v-if="!loadover">加载中...</p>
                <svg v-show="front">
                    <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-99,-53)rotate(90)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">性价比</text><text text-anchor="middle" transform="translate(-25,30)rotate(90)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">速度</text><text text-anchor="middle" transform="translate(70,24)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">运行</text><text text-anchor="middle" transform="translate(30,64)rotate(90)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">京东</text><text text-anchor="middle" transform="translate(16,-63)rotate(0)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">华硕</text><text text-anchor="middle" transform="translate(29,-25)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">固态</text><text text-anchor="middle" transform="translate(91,-24)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">外观</text><text text-anchor="middle" transform="translate(-7,-21)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">流畅</text><text text-anchor="middle" transform="translate(81,-67)rotate(0)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">硬盘</text><text text-anchor="middle" transform="translate(-58,34)rotate(90)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">公式</text><text text-anchor="middle" transform="translate(-25,-102)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">好看</text><text text-anchor="middle" transform="translate(33,-96)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">散热</text><text text-anchor="middle" transform="translate(112,13)rotate(90)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">办公</text><text text-anchor="middle" transform="translate(131,70)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">开机</text><text text-anchor="middle" transform="translate(2,100)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">送货</text><text text-anchor="middle" transform="translate(-131,-41)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">电脑</text><text text-anchor="middle" transform="translate(86,106)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">配置</text><text text-anchor="middle" transform="translate(104,-96)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">恍恍惚惚</text><text text-anchor="middle" transform="translate(132,-54)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">笔记本</text><text text-anchor="middle" transform="translate(-27,92)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">价位</text><text text-anchor="middle" transform="translate(137,4)rotate(90)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">卡顿</text><text text-anchor="middle" transform="translate(-86,48)rotate(90)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">表格</text><text text-anchor="middle" transform="translate(-125,29)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">物有所值</text><text text-anchor="middle" transform="translate(-108,80)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">单一</text><text text-anchor="middle" transform="translate(-72,86)rotate(0)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">物流</text><text text-anchor="middle" transform="translate(-42,-62)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">运算</text><text text-anchor="middle" transform="translate(161,-3)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">漂亮</text><text text-anchor="middle" transform="translate(-69,103)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">大师</text><text text-anchor="middle" transform="translate(-37,121)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">玩游戏</text><text text-anchor="middle" transform="translate(-128,94)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">杠杠</text><text text-anchor="middle" transform="translate(157,42)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">性能</text><text text-anchor="middle" transform="translate(93,86)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">冲着</text><text text-anchor="middle" transform="translate(-104,41)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">超值</text><text text-anchor="middle" transform="translate(-147,49)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">划算</text><text text-anchor="middle" transform="translate(60,126)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">红红火火</text><text text-anchor="middle" transform="translate(-121,-62)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">实惠</text><text text-anchor="middle" transform="translate(-118,-24)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">满意</text><text text-anchor="middle" transform="translate(-141,18)rotate(90)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">价格</text></g>
                </svg>
                <svg v-show="!front">
                    <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-107,61)rotate(90)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">电脑</text><text text-anchor="middle" transform="translate(-95,6)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">开机</text><text text-anchor="middle" transform="translate(-4,10)rotate(0)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">鼠标</text><text text-anchor="middle" transform="translate(-83,-63)rotate(0)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">软件</text><text text-anchor="middle" transform="translate(-27,71)rotate(0)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">京东</text><text text-anchor="middle" transform="translate(62,-24)rotate(0)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">下单</text><text text-anchor="middle" transform="translate(49,-85)rotate(90)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">光驱</text><text text-anchor="middle" transform="translate(21,46)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">快递</text><text text-anchor="middle" transform="translate(69,8)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">硬盘</text><text text-anchor="middle" transform="translate(-13,-33)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">客服</text><text text-anchor="middle" transform="translate(-10,-64)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">相差</text><text text-anchor="middle" transform="translate(109,86)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">用时</text><text text-anchor="middle" transform="translate(-40,37)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">风扇</text><text text-anchor="middle" transform="translate(-92,-36)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">对不上</text><text text-anchor="middle" transform="translate(17,-88)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">裸机</text><text text-anchor="middle" transform="translate(6,109)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">台式机</text><text text-anchor="middle" transform="translate(100,-2)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">退货</text><text text-anchor="middle" transform="translate(-28,-103)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">售后</text><text text-anchor="middle" transform="translate(-98,-103)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">评价</text><text text-anchor="middle" transform="translate(57,93)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">理想</text><text text-anchor="middle" transform="translate(-45,-124)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">声音</text><text text-anchor="middle" transform="translate(15,-112)rotate(0)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">接口</text><text text-anchor="middle" transform="translate(12,-131)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">内存</text><text text-anchor="middle" transform="translate(63,55)rotate(90)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">型号</text><text text-anchor="middle" transform="translate(-134,28)rotate(0)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">好看</text><text text-anchor="middle" transform="translate(-86,-125)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">电源</text><text text-anchor="middle" transform="translate(88,49)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">死机</text><text text-anchor="middle" transform="translate(-1,36)rotate(0)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">华硕</text></g>
                </svg>
            </div>
        </div>
        <transition name="slide"><router-view></router-view></transition>
    </div>
</template>

<script>
import Loading from './Loading'
import {delay, initBar, initPie} from '@/resource/js/common.js'
export default {
    name: 'note',
    data() {
        return {
            pandect: '',
            monthReply: [],
            dayReply: [],
            rate: [],
            promise: '',
            loadover: false,
            result: false,
            slideFlag : true,
            front: true,
            render: false
        }
    },
    created() {
        this.$ajax({
            method: 'get',
            url: '/api/pcinfo'
        }).then((res) => {
            this.pandect = res.data;
        });
        let monthReply = this.getMonthDatas('/api/pcmonthlist');
        let dayReply = this.getMonthDatas('/api/pcdaylist');
        let rate = this.getRate();
        this.promise = Promise.all([monthReply, dayReply, rate]);
    },
    mounted() {
        this.promise.then((datas) => {
            if(!datas[0] || !datas[1] || !datas[2]){
                this.loadover = true;
                this.result = false;
                return;
            }
            this.loadover = true;
            this.result = true;
            if(datas[0].length > 10){
                this.monthReply = datas[0].slice(datas[0].length-10);
            }else{
                this.monthReply = datas[0];
            }
            if(datas[1].length > 10){
                this.dayReply = datas[1].slice(datas[1].length-10);
            }else{
                this.dayReply = datas[1];
            }
            this.rate = datas[2];
            this.$nextTick(function(){
                initBar(this, this.monthReply, this.$refs.month);
                initPie(this, this.$refs.rate, 'noteDetail');
            });
        });
    },
    components: {
        'v-loading': Loading
    },
    methods: {
        getMonthDatas(url){
            return delay(this, url);
        },
        getRate(){
            return delay(this, '/api/pcpie');
        },
        slide(){
            if(this.slideFlag){
                this.slideFlag = false;
                if(!this.render){
                    this.$nextTick(function(){
                        initBar(this, this.dayReply, this.$refs.day, '日期');
                        this.render = true;
                    });
                }
            }else{
                this.slideFlag = true;
            }
        }
    }
}
</script>

<style lang="scss">

</style>
