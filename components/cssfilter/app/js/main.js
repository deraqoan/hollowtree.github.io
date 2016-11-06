var infos = [{
    label: {
        zh: '模糊',
        en: 'blur'
    },
    start: 0,
    end: 50,
    unit: 'px',
    value: 0
}, {
    label: {
        zh: '明度',
        en: 'brightness'
    },
    start: 0,
    end: 100,
    unit: '%',
    value: 100
}, {
    label: {
        zh: '对比度',
        en: 'contrast'
    },
    start: 0,
    end: 100,
    unit: '%',
    value: 100
        // }, {
        //     label: 'drop-shadow',
        //     start: '',
        //     end: '',
        //     unit: ''
}, {
    label: {
        zh: '灰度',
        en: 'grayscale'
    },
    start: 0,
    end: 100,
    unit: '%',
    value: 0
}, {
    label: {
        zh: '色相',
        en: 'hue-rotate'
    },
    start: 0,
    end: 359,
    unit: 'deg',
    value: 0
}, {
    label: {
        zh: '反色',
        en: 'invert'
    },
    start: 0,
    end: 100,
    unit: '%',
    value: 0
}, {
    label: {
        zh: '透明',
        en: 'opacity'
    },
    start: 0,
    end: 100,
    unit: '%',
    value: 100
}, {
    label: {
        zh: '纯度',
        en: 'saturate'
    },
    start: 0,
    end: 100,
    unit: '%',
    value: 100
}, {
    label: {
        zh: '复古',
        en: 'sepia'
    },
    start: 0,
    end: 100,
    unit: '%',
    value: 0
}];

var app = new Vue({
    el: '#demo',
    data: {
        infos: infos,
        filterDatas: [{
            label: {
                zh: '灰度',
                en: 'grayscale'
            },
            start: 0,
            end: 100,
            unit: '%',
            value: 60
        }, {
            label: {
                zh: '复古',
                en: 'sepia'
            },
            start: 0,
            end: 100,
            unit: '%',
            value: 75
        }, {
            label: {
                zh: '色相',
                en: 'hue-rotate'
            },
            start: 0,
            end: 359,
            unit: 'deg',
            value: 50
        }],
        temp: ''
    },
    methods: {
        addOption: function (info) {
            function copyObj(source) {
                var result = {};
                for (var key in source) {
                    result[key] = typeof source[key] === 'object' ? copyObj(source[key]) : source[key];
                }
                return result;
            }
            this.filterDatas.push(copyObj(info));
        },
        remove: function (filterData) {
            this.filterDatas.splice(this.filterDatas.indexOf(filterData), 1);
        },
        removeAll: function () {
            this.filterDatas = [];
            this.temp = '';
        },
        OK: function (event) {
            this.temp = '';
            // Array.prototype.forEach.call(this.filterDatas,  (item) =>{
            //     this.temp = this.temp + item.label.en + '(' + item.value + item.unit + ') ';
            //     console.log(this.temp);
            // });
            for (var i = 0; i < this.filterDatas.length; i++) {
                this.temp = this.temp + this.filterDatas[i].label.en + '(' + this.filterDatas[i].value + this.filterDatas[i].unit + ') ';
            }
            // console.log(this.filterDatas);
            // console.log(this.temp);

        }
    }
})