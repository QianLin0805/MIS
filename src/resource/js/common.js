export function getDatas(vue, url, field){
    let datas;
    new Promise((resolve) => {
        vue.$ajax({
            method: 'get',
            url: url
        }).then((res) => {
            let datas = res.data.reverse();
            resolve(datas);
        });
    }).then((data) => {

    })
}
export function delay(vue, url){
    return new Promise((resolve) => {
        vue.$ajax({
            method: 'get',
            url: url
        }).then((res) => {
            let obj = res.data;
            resolve(obj);
        }).catch((err) => {
            resolve('');
        });
    });
}
export function initBar(vue, datas, el, str){
    if(!str) str = '月份';
    if(datas.length > 0){
        let x = [], y = [];                        //y轴月分，x轴评论数
        datas.forEach((i) => {
            x.push(i.month);
            y.push(i.cou);
        });
        let max = Math.max.apply(Math, y);         //y轴最大值
            max = Math.ceil(max / 10) * 10;
        let diff = 10 - x.length
        if(diff > 0){
            for(let i=0; i<diff; i++){
                x.unshift('');
                y.unshift('');
            }
        }
        let bar = vue.$echarts.init(el);
        bar.setOption({
            color: ['#cde'],
            legend: {
                textStyle: {
                    color: '#eee'
                },
                data:['评论数', '平均评论数']
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
                    name: str,
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
                    name: '评论数',
                    type: 'bar',
                    barWidth: '24px',
                    label: {
                        normal: {
                            color: '#eee',
                            show: true,
                            position: 'top'
                        }
                    },
                    data: y
                }
            ],
        });
    }
}
export function initPie(vue, el, field){
    if(vue.rate.length > 0){
        let datas = [], mode = ['好评','中评','差评'];
        vue.rate.forEach((rate) => {
            let name;
            if(rate.type == 'good') name = '好评';
            if(rate.type == 'mid') name = '中评';
            if(rate.type == 'bad') name = '差评';
            datas.unshift({
                name: name,
                value: rate.cou,
                type: rate.type
            });
        });
        let pie = vue.$echarts.init(el);            
        pie.setOption({
            legend: {
                textStyle: {
                    color: '#eee'
                },
                orient: 'vertical',
                right: '5%',
                top: '5%',
                data: mode
            },
            color: ['#00b17d','#47a4e9', '#ffb94a', '#d64d54', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
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
        pie.on('click', function(params){
            let e = event || window.event;
            e.stopPropagation();
            vue.$router.push({name: field, params: {type: params.data.type}});
        });
    }
}