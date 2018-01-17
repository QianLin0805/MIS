<template>
    <div @click="hideDetail">
        <h1 class="header"><span class="logo">京东用户评论数据大屏</span>{{mode.val}}</h1>
        <div class="area left">
            <div class="box top">
                <h2><i class="icon-file-text2"></i>总览</h2>
                <p class="tip" v-show="!loadOver">加载中...</p>
                <ul v-if="loadOver">
                    <li>总评价数（约销量）：<span>{{info.evaluateCount}}</span></li>
                    <li>评论数：<span>{{info.commentCount}}</span></li>
                    <li>参评率：<span>{{info.percentage.toFixed(2)}}%</span></li>
                </ul>
            </div>
            <div class="box bottom">
                <h2><i class="icon-bullhorn"></i>公告</h2>
                <p class="tip" v-show="!loadOver">加载中...</p>
                <ul v-if="loadOver && $route.name=='zenbo'">
                    <!-- <li>喜报：（好）X月x日周评论数高于平均30%以上</li>
                    <li>告警：（差）X月x日周差评价数高于平均30%以上</li> -->
                </ul>
                <ul v-if="loadOver && $route.name=='note'">
                    <li>喜报：（好）10月份月评论超出平均50%以上</li>
                    <li class="warn">告警：（差）1月5日周差评价数高于平均30%以上</li>
                </ul>
                <ul v-if="loadOver && $route.name=='mi'">
                    <li>喜报：（好）8月份月评论大福超出前期平均2000%</li>
                    <li class="warn">告警：（好）11月份月评论大福超出前期平均300%</li>
                </ul>
            </div>
        </div>
        <div class="area mid">
            <div class="box top" v-show="slideFlag">
                <h2><i class="icon-stats-bars"></i>近10月评论统计<span @click="slideBar">切换日评论</span></h2>
                <p class="tip" v-show="!loadOver">加载中...</p>
                <div class="bar" ref="month"></div>
            </div>
            <div class="box top" v-show="!slideFlag">
                <h2><i class="icon-stats-bars"></i>近10日评论统计<span @click="slideBar">切换月评论</span></h2>
                <p class="tip" v-show="!loadOver">加载中...</p>
                <div class="bar" ref="day"></div>
            </div>
            <div class="box bottom">
                <h2><i class="icon-attachment"></i>Tips 规则说明</h2>
                <ul>
                    <li>1、抓取京东产品用户评论；</li>
                    <li>2、对评论进行分句；</li>
                    <li>3、对分句进行情感分析[0-1], 选 &lt; 0.2的为负向， &gt; 0.8为正向，其他为中性（情感分析正确率据称在80%以上）；</li>
                    <li>4、对正向语句提取正向关键词统计频率，对负向语句同样操作；</li>
                    <li>5、整段评论中有一句负向语句，认为是负向评论（存在误差）；</li>
                    <li>6、参评率=总评论数/总评价数（含无文字），反应用户参与度；</li>
                    <li><pre>
7、喜报：近3日日均评论数高于前2月日均30%以上（计算方式 差额>30% 并且大于10条）；
     告警：近3日日均评论数低于前2月日均30%以上（计算方式 差额>30% 并且大于10条；
     告警：近3日日均负向评论数高于前2月日均30%以上（计算方式 差额>30% 并且大于10条）。
                    </pre></li>
                </ul>
            </div>
        </div>
        <div class="area right">
            <div class="box top">
                <h2><i class="icon-pie-chart"></i>总评论（分句）分布比例</h2>
                <p class="tip" v-show="!loadOver">加载中...</p>
                <div class="pie" ref="rate" @click="stop"></div>
            </div>
            <div class="box bottom">
                <h2><i class="icon-equalizer"></i>词频分布<span v-show="front" @click="front=!front">正向</span><span v-show="!front" @click="front=!front">负向</span></h2>
                <p class="tip" v-show="!loadOver">加载中...</p>
                <div v-if="$route.name=='zenbo'">
                    <svg v-show="front">
                        <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-62,42)rotate(0)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">发给</text><text text-anchor="middle" transform="translate(61,34)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">漂亮</text><text text-anchor="middle" transform="translate(71,-50)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">外观</text><text text-anchor="middle" transform="translate(14,-75)rotate(90)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">外形</text><text text-anchor="middle" transform="translate(-72,-36)rotate(90)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">尺寸</text><text text-anchor="middle" transform="translate(-38,-82)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">机器人</text><text text-anchor="middle" transform="translate(139,17)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">体验</text><text text-anchor="middle" transform="translate(121,51)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">母亲</text><text text-anchor="middle" transform="translate(-8,-17)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">指令</text><text text-anchor="middle" transform="translate(50,67)rotate(90)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">产品</text><text text-anchor="middle" transform="translate(-2,69)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">小朋友</text><text text-anchor="middle" transform="translate(82,-101)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">容错</text><text text-anchor="middle" transform="translate(-3,92)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">莫名</text><text text-anchor="middle" transform="translate(-130,6)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">期望值</text><text text-anchor="middle" transform="translate(-6,12)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">孩子</text><text text-anchor="middle" transform="translate(42,-11)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">开心</text><text text-anchor="middle" transform="translate(-104,-24)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">线程</text><text text-anchor="middle" transform="translate(-85,-87)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">华硕</text><text text-anchor="middle" transform="translate(-154,14)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">学习</text><text text-anchor="middle" transform="translate(-56,69)rotate(0)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">做工</text><text text-anchor="middle" transform="translate(-101,69)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">美金</text><text text-anchor="middle" transform="translate(-99,-63)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">屋内</text><text text-anchor="middle" transform="translate(-41,88)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">测试</text><text text-anchor="middle" transform="translate(99,54)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">故事</text><text text-anchor="middle" transform="translate(111,-100)rotate(90)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">躲避</text><text text-anchor="middle" transform="translate(-133,54)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">互动</text><text text-anchor="middle" transform="translate(28,86)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">精细</text></g>
                    </svg>
                    <svg v-show="!front">
                        <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-96,1)rotate(90)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">退货</text><text text-anchor="middle" transform="translate(13,22)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">识别率</text><text text-anchor="middle" transform="translate(20,67)rotate(0)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">求救信</text><text text-anchor="middle" transform="translate(12,-24)rotate(0)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">太低</text><text text-anchor="middle" transform="translate(3,-67)rotate(0)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">机器人</text><text text-anchor="middle" transform="translate(63,-60)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">语音</text><text text-anchor="middle" transform="translate(-139,11)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">充电</text><text text-anchor="middle" transform="translate(-80,-58)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">路径</text><text text-anchor="middle" transform="translate(-12,-101)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">推广</text><text text-anchor="middle" transform="translate(-136,-59)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">宣传</text><text text-anchor="middle" transform="translate(-99,-113)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">预售</text><text text-anchor="middle" transform="translate(-69,-133)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">满意</text><text text-anchor="middle" transform="translate(-62,96)rotate(90)" style="font-size: 28px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">腾讯</text><text text-anchor="middle" transform="translate(56,-125)rotate(90)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">微小</text><text text-anchor="middle" transform="translate(64,102)rotate(90)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">测试</text><text text-anchor="middle" transform="translate(-9,98)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">厂商</text><text text-anchor="middle" transform="translate(-14,-152)rotate(90)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">半程</text><text text-anchor="middle" transform="translate(118,-59)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">失望</text><text text-anchor="middle" transform="translate(108,23)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">信号</text><text text-anchor="middle" transform="translate(111,-26)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">上架</text><text text-anchor="middle" transform="translate(-162,-42)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">京东</text><text text-anchor="middle" transform="translate(108,74)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">手机</text><text text-anchor="middle" transform="translate(-123,50)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">半成品</text><text text-anchor="middle" transform="translate(27,97)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">官网</text><text text-anchor="middle" transform="translate(-100,68)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">有用</text><text text-anchor="middle" transform="translate(93,95)rotate(90)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">客服</text><text text-anchor="middle" transform="translate(-84,105)rotate(0)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">七天</text><text text-anchor="middle" transform="translate(-63,63)rotate(0)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">上线</text><text text-anchor="middle" transform="translate(-23,95)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">客观</text><text text-anchor="middle" transform="translate(109,-8)rotate(0)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">月底</text></g>
                    </svg>
                </div>
                <div v-if="$route.name=='note'">
                    <svg v-show="front">
                        <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-99,-53)rotate(90)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">性价比</text><text text-anchor="middle" transform="translate(-25,30)rotate(90)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">速度</text><text text-anchor="middle" transform="translate(70,24)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">运行</text><text text-anchor="middle" transform="translate(29,-25)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">固态</text><text text-anchor="middle" transform="translate(91,-24)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">外观</text><text text-anchor="middle" transform="translate(-7,-21)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">流畅</text><text text-anchor="middle" transform="translate(81,-67)rotate(0)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">硬盘</text><text text-anchor="middle" transform="translate(-58,34)rotate(90)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">公式</text><text text-anchor="middle" transform="translate(-25,-102)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">好看</text><text text-anchor="middle" transform="translate(33,-96)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">散热</text><text text-anchor="middle" transform="translate(112,13)rotate(90)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">办公</text><text text-anchor="middle" transform="translate(131,70)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">开机</text><text text-anchor="middle" transform="translate(2,100)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">送货</text><text text-anchor="middle" transform="translate(86,106)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">配置</text><text text-anchor="middle" transform="translate(132,-54)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">笔记本</text><text text-anchor="middle" transform="translate(-27,92)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">价位</text><text text-anchor="middle" transform="translate(137,4)rotate(90)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">卡顿</text><text text-anchor="middle" transform="translate(-86,48)rotate(90)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">表格</text><text text-anchor="middle" transform="translate(-125,29)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">物有所值</text><text text-anchor="middle" transform="translate(-108,80)rotate(90)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">单一</text><text text-anchor="middle" transform="translate(-72,86)rotate(0)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">物流</text><text text-anchor="middle" transform="translate(-42,-62)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">运算</text><text text-anchor="middle" transform="translate(161,-3)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">漂亮</text><text text-anchor="middle" transform="translate(-69,103)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">大师</text><text text-anchor="middle" transform="translate(-37,121)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">玩游戏</text><text text-anchor="middle" transform="translate(-128,94)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">杠杠</text><text text-anchor="middle" transform="translate(157,42)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">性能</text><text text-anchor="middle" transform="translate(93,86)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">冲着</text><text text-anchor="middle" transform="translate(-104,41)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">超值</text><text text-anchor="middle" transform="translate(-147,49)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">划算</text><text text-anchor="middle" transform="translate(60,126)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">红红火火</text><text text-anchor="middle" transform="translate(-121,-62)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">实惠</text><text text-anchor="middle" transform="translate(-118,-24)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">满意</text><text text-anchor="middle" transform="translate(-141,18)rotate(90)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">价格</text></g>
                    </svg>
                    <svg v-show="!front">
                        <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-95,6)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">开机</text><text text-anchor="middle" transform="translate(-4,10)rotate(0)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">鼠标</text><text text-anchor="middle" transform="translate(-83,-63)rotate(0)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">软件</text><text text-anchor="middle" transform="translate(62,-24)rotate(0)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">下单</text><text text-anchor="middle" transform="translate(49,-85)rotate(90)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">光驱</text><text text-anchor="middle" transform="translate(21,46)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">快递</text><text text-anchor="middle" transform="translate(69,8)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">硬盘</text><text text-anchor="middle" transform="translate(-13,-33)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">客服</text><text text-anchor="middle" transform="translate(-10,-64)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">相差</text><text text-anchor="middle" transform="translate(109,86)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">用时</text><text text-anchor="middle" transform="translate(-40,37)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">风扇</text><text text-anchor="middle" transform="translate(-92,-36)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">对不上</text><text text-anchor="middle" transform="translate(17,-88)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">裸机</text><text text-anchor="middle" transform="translate(6,109)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">台式机</text><text text-anchor="middle" transform="translate(100,-2)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">退货</text><text text-anchor="middle" transform="translate(-28,-103)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">售后</text><text text-anchor="middle" transform="translate(-98,-103)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">评价</text><text text-anchor="middle" transform="translate(57,93)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">理想</text><text text-anchor="middle" transform="translate(-45,-124)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">声音</text><text text-anchor="middle" transform="translate(15,-112)rotate(0)" style="font-size: 19px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">接口</text><text text-anchor="middle" transform="translate(12,-131)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">内存</text><text text-anchor="middle" transform="translate(63,55)rotate(90)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">型号</text><text text-anchor="middle" transform="translate(-134,28)rotate(0)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">好看</text><text text-anchor="middle" transform="translate(-86,-125)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">电源</text><text text-anchor="middle" transform="translate(88,49)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">死机</text></g>
                    </svg>
                </div>
                <div v-if="$route.name=='mi'">
                    <svg v-show="front">
                        <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(66,-32)rotate(0)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">外观</text><text text-anchor="middle" transform="translate(-92,-80)rotate(0)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">配置</text><text text-anchor="middle" transform="translate(7,57)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">满意</text><text text-anchor="middle" transform="translate(-79,-17)rotate(90)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">小米</text><text text-anchor="middle" transform="translate(51,28)rotate(90)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">性价比</text><text text-anchor="middle" transform="translate(-29,82)rotate(90)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">速度</text><text text-anchor="middle" transform="translate(-35,-36)rotate(90)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">流畅</text><text text-anchor="middle" transform="translate(110,40)rotate(0)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">性能</text><text text-anchor="middle" transform="translate(124,-14)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">中国</text><text text-anchor="middle" transform="translate(33,-80)rotate(0)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">好看</text><text text-anchor="middle" transform="translate(116,71)rotate(0)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">实惠</text><text text-anchor="middle" transform="translate(143,-48)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">电脑</text><text text-anchor="middle" transform="translate(121,-80)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">家庭</text><text text-anchor="middle" transform="translate(-104,-13)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">国产</text><text text-anchor="middle" transform="translate(-63,50)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">女儿</text><text text-anchor="middle" transform="translate(70,-103)rotate(90)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">轻便</text><text text-anchor="middle" transform="translate(19,-2)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">运行</text><text text-anchor="middle" transform="translate(-61,78)rotate(0)" style="font-size: 25px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">犹豫</text><text text-anchor="middle" transform="translate(-110,33)rotate(90)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">漂亮</text><text text-anchor="middle" transform="translate(-61,103)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">下单</text><text text-anchor="middle" transform="translate(121,97)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">玩游戏</text><text text-anchor="middle" transform="translate(30,-109)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">手里</text><text text-anchor="middle" transform="translate(-21,-111)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">开机</text><text text-anchor="middle" transform="translate(26,-132)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">包装</text><text text-anchor="middle" transform="translate(-31,22)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">送货</text><text text-anchor="middle" transform="translate(3,127)rotate(90)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">电池</text><text text-anchor="middle" transform="translate(118,-110)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">做工</text><text text-anchor="middle" transform="translate(-4,-53)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">同事</text><text text-anchor="middle" transform="translate(63,114)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">品牌</text><text text-anchor="middle" transform="translate(-133,27)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">办公</text><text text-anchor="middle" transform="translate(-21,-81)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">游戏</text><text text-anchor="middle" transform="translate(-99,-54)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">轻松</text><text text-anchor="middle" transform="translate(-142,-44)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">台式</text><text text-anchor="middle" transform="translate(-55,126)rotate(90)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">划算</text><text text-anchor="middle" transform="translate(-100,5)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">入手</text><text text-anchor="middle" transform="translate(99,7)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">京东</text><text text-anchor="middle" transform="translate(-106,77)rotate(90)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">苹果</text><text text-anchor="middle" transform="translate(-127,71)rotate(0)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">产品</text><text text-anchor="middle" transform="translate(-104,-37)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">够用</text><text text-anchor="middle" transform="translate(-148,-26)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">物流</text><text text-anchor="middle" transform="translate(-94,113)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">精致</text><text text-anchor="middle" transform="translate(-72,-119)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">硬件</text><text text-anchor="middle" transform="translate(61,93)rotate(0)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">强大</text><text text-anchor="middle" transform="translate(145,31)rotate(90)" style="font-size: 14px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">续航</text><text text-anchor="middle" transform="translate(25,133)rotate(90)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">笔记本</text><text text-anchor="middle" transform="translate(63,-131)rotate(0)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">小巧</text><text text-anchor="middle" transform="translate(-73,122)rotate(90)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">想象</text><text text-anchor="middle" transform="translate(-17,129)rotate(90)" style="font-size: 11px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">购物</text><text text-anchor="middle" transform="translate(86,-144)rotate(90)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">轻薄</text><text text-anchor="middle" transform="translate(-15,-144)rotate(90)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">高档</text><text text-anchor="middle" transform="translate(106,-14)rotate(0)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">付款</text><text text-anchor="middle" transform="translate(-58,-62)rotate(0)" style="font-size: 10px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">世界</text></g>
                    </svg>
                    <svg v-show="!front">
                        <g transform="translate(160,160)"><text text-anchor="middle" transform="translate(-85,84)rotate(0)" style="font-size: 50px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">小米</text><text text-anchor="middle" transform="translate(41,71)rotate(90)" style="font-size: 45px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">指纹</text><text text-anchor="middle" transform="translate(-90,-42)rotate(90)" style="font-size: 44px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">移动硬盘</text><text text-anchor="middle" transform="translate(-35,-89)rotate(90)" style="font-size: 43px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">发票</text><text text-anchor="middle" transform="translate(35,-84)rotate(0)" style="font-size: 34px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">付款</text><text text-anchor="middle" transform="translate(-15,-17)rotate(0)" style="font-size: 33px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">相差</text><text text-anchor="middle" transform="translate(-19,18)rotate(0)" style="font-size: 32px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">打打</text><text text-anchor="middle" transform="translate(69,-33)rotate(90)" style="font-size: 29px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">页面</text><text text-anchor="middle" transform="translate(-29,53)rotate(90)" style="font-size: 27px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">屏幕</text><text text-anchor="middle" transform="translate(40,19)rotate(0)" style="font-size: 26px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">声音</text><text text-anchor="middle" transform="translate(38,-48)rotate(0)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">关机</text><text text-anchor="middle" transform="translate(85,80)rotate(90)" style="font-size: 24px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(196, 156, 148);">连接</text><text text-anchor="middle" transform="translate(110,57)rotate(90)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(227, 119, 194);">评价</text><text text-anchor="middle" transform="translate(-95,111)rotate(0)" style="font-size: 23px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(247, 182, 210);">电脑</text><text text-anchor="middle" transform="translate(132,102)rotate(0)" style="font-size: 22px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(127, 127, 127);">协议</text><text text-anchor="middle" transform="translate(40,-20)rotate(0)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(199, 199, 199);">京东</text><text text-anchor="middle" transform="translate(100,-10)rotate(90)" style="font-size: 21px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(188, 189, 34);">背着</text><text text-anchor="middle" transform="translate(24,-121)rotate(0)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(219, 219, 141);">弹性</text><text text-anchor="middle" transform="translate(87,35)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(23, 190, 207);">下单</text><text text-anchor="middle" transform="translate(77,-84)rotate(90)" style="font-size: 20px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(158, 218, 229);">价格</text><text text-anchor="middle" transform="translate(-116,-43)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(31, 119, 180);">风扇</text><text text-anchor="middle" transform="translate(-117,20)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(174, 199, 232);">客服</text><text text-anchor="middle" transform="translate(115,-86)rotate(0)" style="font-size: 18px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 127, 14);">预装</text><text text-anchor="middle" transform="translate(65,-125)rotate(0)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 187, 120);">识别</text><text text-anchor="middle" transform="translate(139,31)rotate(90)" style="font-size: 17px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(44, 160, 44);">反馈</text><text text-anchor="middle" transform="translate(-111,-73)rotate(0)" style="font-size: 16px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(152, 223, 138);">质量</text><text text-anchor="middle" transform="translate(12,44)rotate(0)" style="font-size: 15px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(214, 39, 40);">好评</text><text text-anchor="middle" transform="translate(-113,40)rotate(0)" style="font-size: 13px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(255, 152, 150);">开机</text><text text-anchor="middle" transform="translate(-111,-9)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(148, 103, 189);">退货</text><text text-anchor="middle" transform="translate(20,58)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(197, 176, 213);">发热</text><text text-anchor="middle" transform="translate(14,72)rotate(0)" style="font-size: 12px; font-family: &quot;Microsoft YaHei&quot;; margin: 10px; padding: 10px; fill: rgb(140, 86, 75);">软件</text></g>
                    </svg>
                </div>
            </div>
        </div>
        <v-detail :type="detailType" :count="detailCount" @hideDetail="hideDetail"></v-detail>
    </div>
</template>

<script>
import Detail from './Detail'
import {delay} from '@/resource/js/common.js'
export default {
    name: 'zenbo',
    data() {
        return {
            mode: '',
            info: '',
            monthReply: [],
            dayReply: [],
            rate: [],
            detailType: '',
            detailCount: 0,
            loadOver: false,
            slideFlag : true,
            render: false,
            front: true
        }
    },
    created() {
        this.proList.forEach((list) => {
            if(list.name == this.$route.name) this.mode = list;
        });

        let info = delay(this,'/api/' + this.mode.info);
        let monthReply = delay(this,'/api/' + this.mode.month);
        let dayReply = delay(this,'/api/' + this.mode.day);
        let rate = delay(this, '/api/' + this.mode.pie);
        let promise = Promise.all([info,monthReply, dayReply, rate]);

        promise.then((datas) => {
            this.info = datas[0];
            if(datas[1].length > 10){
                this.monthReply = datas[1].slice(datas[1].length-10);
            }else{
                this.monthReply = datas[1];
            }
            if(datas[2].length > 10){
                this.dayReply = datas[2].slice(datas[2].length-10);
            }else{
                this.dayReply = datas[2];
            }
            this.rate = datas[3];
            this.$nextTick(function(){
                this.initBar(this.$refs.month, 'monthReply');
                this.initPie();
                this.loadOver = true;
            });
        });
    },
    props: {
        proList: Array
    },
    components: {
        'v-detail': Detail
    },
    watch: {
        $route(val, oldval){
            window.location.reload();
        }
    },
    methods: {
        slideBar(){
            if(this.slideFlag){
                this.slideFlag = false;
                if(!this.render){
                    this.$nextTick(() => {
                        this.initBar(this.$refs.day, 'dayReply', '日期');
                        this.render = true;
                    });
                }
            }else{
                this.slideFlag = true;
            }
        },
        initBar(el,field, type){
            if(this[field].length <= 0) return;
            if(!type) type = '月份';
            let x = [], y = [], y1 = [];               //y轴月份、日期，x轴评论数
            this[field].forEach((i) => {
                x.unshift(i.month);
                y.unshift(i.cou);
                y1.unshift(i.badcou);
            });
            let max = Math.max.apply(Math, y);         //y轴最大值
                max = Math.ceil(max / 10) * 10;
            let diff = 10 - x.length
            if(diff > 0){
                for(let i=0; i<diff; i++){
                    x.unshift('');
                    y.unshift('');
                    y1.unshift('');
                }
            }
            let bar = this.$echarts.init(el);
            bar.setOption({
                color: ['#00b17d','#ffb94a', '#47a4e9'],
                barGap: '25%',
                barCategoryGap: '30%',
                legend: {
                    textStyle: {
                        color: '#eee'
                    },
                    data:['总评论数', '负向评论数']
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}',
                    padding: 8,
                    textStyle: {
                        fontSize: 12,
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        name: type,
                        data: x,
                        axisLine: {
                            lineStyle: {
                                color: '#eee'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#eee',
                                fontSize: 10
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#eee'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '评论数',
                        min: 0,
                        max: max,
                        interval: max/5,
                        axisLine: {
                            lineStyle: {
                                color: '#eee'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#eee'
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#eee'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '总评论数',
                        type: 'bar',
                        label: {
                            normal: {
                                color: '#eee',
                                show: true,
                                position: 'top'
                            }
                        },
                        data: y
                    },
                    {
                        name: '负向评论数',
                        type: 'bar',
                        label: {
                            normal: {
                                color: '#eee',
                                show: true,
                                position: 'top'
                            }
                        },
                        data: y1
                    }
                ]
            });
        },
        initPie(){
            if(this.rate.length <= 0) return;
            let datas = [], mode = ['正向','中性','负向'];
            this.rate.forEach((rate) => {
                let name;
                if(rate.type == 'good') name = '正向';
                if(rate.type == 'mid') name = '中性';
                if(rate.type == 'bad') name = '负向';
                datas.push({
                    name: name,
                    value: rate.cou,
                    type: rate.type
                });
            });
            let pie = this.$echarts.init(this.$refs.rate);            
            pie.setOption({
                legend: {
                    textStyle: {
                        color: '#eee'
                    },
                    orient: 'vertical',
                    right: '5%',
                    top: '2%',
                    data: mode
                },
                color: ['#00b17d','#47a4e9', '#ffb94a', '#d64d54',],
                series : [
                    {
                        name: '评论比例',
                        type: 'pie',
                        hoverOffset: 5,
                        radius : '56%',
                        center: ['45%', '56%'],
                        data: datas,
                        label: {
                            normal: {
                                formatter: '{b|{b}： }{c|{c}}\n比例： {per|{d}%}',
                                color: '#eee',
                                rich: {
                                    b: {
                                        color: '#eee',
                                        lineHeight: 20,
                                        align: 'left'
                                    },
                                    c: {
                                        color: '#eee',
                                        align: 'left'
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: '#eee'
                                }
                            }
                        }
                    }
                ]
            });
            pie.on('click', (params) => {
                this.detailType = params.data.type;
                this.detailCount = parseInt(params.data.value);
            });
        },
        stop(event){
            let e = event || window.event;
            e.stopPropagation();
        },
        hideDetail(){
            this.detailType = '';
        }
    }
}
</script>

<style lang="scss">
.header{
    position: absolute; font-size: 1.5rem; font-weight: bold; text-align: center; letter-spacing: 1px; color: white; width: 100%; height: 7rem; line-height: 6.4rem;
    .logo{position: absolute; left: 0; color: rgba(255,255,255,.75);}
}
.area{
    display: flex; position: relative; flex-direction: column; height: calc(100vh - 8rem); margin-top: 7rem;
    .box{
        flex: auto; background: rgba(255,255,255,.12);
        h2{
            font-size: 1rem; color: #eee; text-indent: 20px; height: 2.5rem; line-height: 2.4rem; background: rgba(255,255,255,.15);
            i{margin-right: 3px;}
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
                &:nth-child(even){background: rgba(255,255,255,.05);}
                span:first-child{display: inline-block; width: 100px;}
            }
        }
        .bottom{
            flex: 0 0 calc(50% - 7px); margin-top: 7px;
            li{
                height: auto; line-height: 1.2rem; padding: 10px 20px;
                &.warn{color: #ffb94a;}
            }
        }
    }
    &.mid{
        flex: auto; margin: 7rem 7px 0;
        .bar{position: absolute; left: 0; top: 50%; width: 100%; height: 50vh; margin-top: -32vh;}
        .bottom{
            flex: 0 0 210px; font-size: 12px; margin-top: 7px;
            ul{overflow: hidden; margin-top: 10px;}
            li{
                line-height: 1rem; padding: .1rem 20px;
                pre{float: left; font-family: "Microsoft YaHei";}
            }
        }
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
                position: absolute; left: 50%; top: 50%; overflow: hidden; width: 320px; height: 320px; background: rgba(0,0,0,.5); border-radius: 100%; margin: -140px 0 0 -160px;
            }
        }
    }
}
</style>
