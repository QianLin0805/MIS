<template>
    <div class="mi">
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
                    <li>喜报：（好）8月份月评论大福超出前期平均2000%</li>
                    <li>告警：（好）11月份月评论大福超出前期平均300%</li>
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
                    <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(66,-32)rotate(0)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">外观</text><text text-anchor="middle" transform="translate(-92,-80)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">配置</text><text text-anchor="middle" transform="translate(7,57)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">满意</text><text text-anchor="middle" transform="translate(-79,-17)rotate(90)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">小米</text><text text-anchor="middle" transform="translate(51,28)rotate(90)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">性价比</text><text text-anchor="middle" transform="translate(-29,82)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">速度</text><text text-anchor="middle" transform="translate(-35,-36)rotate(90)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">流畅</text><text text-anchor="middle" transform="translate(110,40)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">性能</text><text text-anchor="middle" transform="translate(124,-14)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">中国</text><text text-anchor="middle" transform="translate(33,-80)rotate(0)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">好看</text><text text-anchor="middle" transform="translate(116,71)rotate(0)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">实惠</text><text text-anchor="middle" transform="translate(143,-48)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">电脑</text><text text-anchor="middle" transform="translate(121,-80)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">家庭</text><text text-anchor="middle" transform="translate(-104,-13)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">国产</text><text text-anchor="middle" transform="translate(-63,50)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">女儿</text><text text-anchor="middle" transform="translate(70,-103)rotate(90)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">轻便</text><text text-anchor="middle" transform="translate(19,-2)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">运行</text><text text-anchor="middle" transform="translate(-61,78)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">犹豫</text><text text-anchor="middle" transform="translate(-110,33)rotate(90)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">漂亮</text><text text-anchor="middle" transform="translate(-61,103)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">下单</text><text text-anchor="middle" transform="translate(121,97)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">玩游戏</text><text text-anchor="middle" transform="translate(30,-109)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">手里</text><text text-anchor="middle" transform="translate(-21,-111)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">开机</text><text text-anchor="middle" transform="translate(26,-132)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">包装</text><text text-anchor="middle" transform="translate(-31,22)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">送货</text><text text-anchor="middle" transform="translate(3,127)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">电池</text><text text-anchor="middle" transform="translate(118,-110)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">做工</text><text text-anchor="middle" transform="translate(-4,-53)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">同事</text><text text-anchor="middle" transform="translate(63,114)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">品牌</text><text text-anchor="middle" transform="translate(-133,27)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">办公</text><text text-anchor="middle" transform="translate(-21,-81)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">游戏</text><text text-anchor="middle" transform="translate(-99,-54)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">轻松</text><text text-anchor="middle" transform="translate(-142,-44)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">台式</text><text text-anchor="middle" transform="translate(-55,126)rotate(90)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">划算</text><text text-anchor="middle" transform="translate(-100,5)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">入手</text><text text-anchor="middle" transform="translate(99,7)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">京东</text><text text-anchor="middle" transform="translate(-106,77)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">苹果</text><text text-anchor="middle" transform="translate(-127,71)rotate(0)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">产品</text><text text-anchor="middle" transform="translate(-104,-37)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">够用</text><text text-anchor="middle" transform="translate(-148,-26)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">物流</text><text text-anchor="middle" transform="translate(-94,113)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">精致</text><text text-anchor="middle" transform="translate(-72,-119)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">硬件</text><text text-anchor="middle" transform="translate(61,93)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">强大</text><text text-anchor="middle" transform="translate(145,31)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">续航</text><text text-anchor="middle" transform="translate(25,133)rotate(90)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">笔记本</text><text text-anchor="middle" transform="translate(63,-131)rotate(0)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">小巧</text><text text-anchor="middle" transform="translate(-73,122)rotate(90)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">想象</text><text text-anchor="middle" transform="translate(-17,129)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">购物</text><text text-anchor="middle" transform="translate(86,-144)rotate(90)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">轻薄</text><text text-anchor="middle" transform="translate(-15,-144)rotate(90)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">高档</text><text text-anchor="middle" transform="translate(106,-14)rotate(0)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">付款</text><text text-anchor="middle" transform="translate(-58,-62)rotate(0)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">世界</text></g>
                </svg>
                <svg v-show="!front">
                    <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-85,84)rotate(0)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">小米</text><text text-anchor="middle" transform="translate(41,71)rotate(90)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">指纹</text><text text-anchor="middle" transform="translate(-90,-42)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">移动硬盘</text><text text-anchor="middle" transform="translate(-35,-89)rotate(90)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">发票</text><text text-anchor="middle" transform="translate(35,-84)rotate(0)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">付款</text><text text-anchor="middle" transform="translate(-15,-17)rotate(0)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">相差</text><text text-anchor="middle" transform="translate(-19,18)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">打打</text><text text-anchor="middle" transform="translate(69,-33)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">页面</text><text text-anchor="middle" transform="translate(-29,53)rotate(90)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">屏幕</text><text text-anchor="middle" transform="translate(40,19)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">声音</text><text text-anchor="middle" transform="translate(38,-48)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">关机</text><text text-anchor="middle" transform="translate(85,80)rotate(90)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">连接</text><text text-anchor="middle" transform="translate(110,57)rotate(90)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">评价</text><text text-anchor="middle" transform="translate(-95,111)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">电脑</text><text text-anchor="middle" transform="translate(132,102)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">协议</text><text text-anchor="middle" transform="translate(40,-20)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">京东</text><text text-anchor="middle" transform="translate(100,-10)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">背着</text><text text-anchor="middle" transform="translate(24,-121)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">弹性</text><text text-anchor="middle" transform="translate(87,35)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">下单</text><text text-anchor="middle" transform="translate(77,-84)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">价格</text><text text-anchor="middle" transform="translate(-116,-43)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">风扇</text><text text-anchor="middle" transform="translate(-117,20)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">客服</text><text text-anchor="middle" transform="translate(115,-86)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">预装</text><text text-anchor="middle" transform="translate(65,-125)rotate(0)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">识别</text><text text-anchor="middle" transform="translate(139,31)rotate(90)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">反馈</text><text text-anchor="middle" transform="translate(-111,-73)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">质量</text><text text-anchor="middle" transform="translate(12,44)rotate(0)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">好评</text><text text-anchor="middle" transform="translate(-113,40)rotate(0)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">开机</text><text text-anchor="middle" transform="translate(-111,-9)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">退货</text><text text-anchor="middle" transform="translate(20,58)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">发热</text><text text-anchor="middle" transform="translate(14,72)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">软件</text></g>
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
    name: 'mi',
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
            url: '/api/cominfo'
        }).then((res) => {
            this.pandect = res.data;
        });
        let monthReply = this.getMonthDatas('/api/commonthlist');
        let dayReply = this.getMonthDatas('/api/comdaylist');
        let rate = this.getRateDatas();
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
            initPie(this, this.$refs.rate, 'miDetail');
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
        getRateDatas(){
            return delay(this, '/api/compie');
        },
        initEcharts(){
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

<style>

</style>
