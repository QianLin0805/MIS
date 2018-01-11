<template>
    <div class="zenbo">
        <slot></slot>
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
                <!-- <p class="tip" v-if="!loadover">加载中...</p> -->
                <ul>
                    <li>喜报：（好）X月x日周评论数高于平均30%以上</li>
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
                    <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-62,42)rotate(0)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">发给</text><text text-anchor="middle" transform="translate(61,34)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">漂亮</text><text text-anchor="middle" transform="translate(71,-50)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">外观</text><text text-anchor="middle" transform="translate(14,-75)rotate(90)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">外形</text><text text-anchor="middle" transform="translate(-72,-36)rotate(90)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">尺寸</text><text text-anchor="middle" transform="translate(-38,-82)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">机器人</text><text text-anchor="middle" transform="translate(139,17)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">体验</text><text text-anchor="middle" transform="translate(121,51)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">母亲</text><text text-anchor="middle" transform="translate(-8,-17)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">指令</text><text text-anchor="middle" transform="translate(50,67)rotate(90)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">产品</text><text text-anchor="middle" transform="translate(-2,69)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">小朋友</text><text text-anchor="middle" transform="translate(82,-101)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">容错</text><text text-anchor="middle" transform="translate(-3,92)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">莫名</text><text text-anchor="middle" transform="translate(-130,6)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">期望值</text><text text-anchor="middle" transform="translate(-6,12)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">孩子</text><text text-anchor="middle" transform="translate(42,-11)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">开心</text><text text-anchor="middle" transform="translate(-104,-24)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">线程</text><text text-anchor="middle" transform="translate(-85,-87)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">华硕</text><text text-anchor="middle" transform="translate(-154,14)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">学习</text><text text-anchor="middle" transform="translate(-56,69)rotate(0)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">做工</text><text text-anchor="middle" transform="translate(-101,69)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">美金</text><text text-anchor="middle" transform="translate(-99,-63)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">屋内</text><text text-anchor="middle" transform="translate(-41,88)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">测试</text><text text-anchor="middle" transform="translate(99,54)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">故事</text><text text-anchor="middle" transform="translate(111,-100)rotate(90)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">躲避</text><text text-anchor="middle" transform="translate(-133,54)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">互动</text><text text-anchor="middle" transform="translate(28,86)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">精细</text></g>
                </svg>
                <svg v-show="!front">
                    <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-96,1)rotate(90)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">退货</text><text text-anchor="middle" transform="translate(13,22)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">识别率</text><text text-anchor="middle" transform="translate(20,67)rotate(0)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">求救信</text><text text-anchor="middle" transform="translate(12,-24)rotate(0)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">太低</text><text text-anchor="middle" transform="translate(3,-67)rotate(0)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">机器人</text><text text-anchor="middle" transform="translate(63,-60)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">语音</text><text text-anchor="middle" transform="translate(-139,11)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">充电</text><text text-anchor="middle" transform="translate(-80,-58)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">路径</text><text text-anchor="middle" transform="translate(-12,-101)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">推广</text><text text-anchor="middle" transform="translate(-136,-59)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">宣传</text><text text-anchor="middle" transform="translate(-99,-113)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">预售</text><text text-anchor="middle" transform="translate(-69,-133)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">满意</text><text text-anchor="middle" transform="translate(-62,96)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">腾讯</text><text text-anchor="middle" transform="translate(56,-125)rotate(90)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">微小</text><text text-anchor="middle" transform="translate(64,102)rotate(90)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">测试</text><text text-anchor="middle" transform="translate(-9,98)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">厂商</text><text text-anchor="middle" transform="translate(-14,-152)rotate(90)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">半程</text><text text-anchor="middle" transform="translate(118,-59)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">失望</text><text text-anchor="middle" transform="translate(108,23)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">信号</text><text text-anchor="middle" transform="translate(111,-26)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">上架</text><text text-anchor="middle" transform="translate(-162,-42)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">京东</text><text text-anchor="middle" transform="translate(108,74)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">手机</text><text text-anchor="middle" transform="translate(-123,50)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">半成品</text><text text-anchor="middle" transform="translate(27,97)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">官网</text><text text-anchor="middle" transform="translate(-100,68)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">有用</text><text text-anchor="middle" transform="translate(93,95)rotate(90)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">客服</text><text text-anchor="middle" transform="translate(-84,105)rotate(0)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">七天</text><text text-anchor="middle" transform="translate(-63,63)rotate(0)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">上线</text><text text-anchor="middle" transform="translate(-23,95)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">客观</text><text text-anchor="middle" transform="translate(109,-8)rotate(0)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">月底</text></g>
                </svg>
            </div>
        </div>
        <!-- <v-detail></v-detail> -->
        <transition name="slide"><router-view></router-view></transition>
    </div>
</template>

<script>
import Detail from './Detail'
import {delay, initBar, initPie} from '@/resource/js/common.js'
export default {
    name: 'zenbo',
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
            url: '/api/zenboinfo'
        }).then((res) => {
            this.pandect = res.data;
        });

        let monthReply = delay(this,'/api/monthlist');
        let dayReply = delay(this,'/api/daylist');
        let rate = delay(this, '/api/subpie');
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
                initPie(this, this.$refs.rate, 'zenboDetail');
            });
        });
    },
    components: {
        'v-detail': Detail
    },
    methods: {
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
