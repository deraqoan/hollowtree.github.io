function slide(id, showTime, fadeTime) {
        // --- id 为轮播图的ID名
    var doc = document.getElementById(id),
        // --- showTime 为每帧展示时间
        showTime = showTime || 2000,
        // --- fadeTime 为帧与帧之间的过渡时间
        fadeTime = fadeTime || 400;
    
    // --- 渐显
    function fadeIn(el) {
        el.style.display = 'block';
        el.style.opacity = 0;
        var time = +new Date();
        function foo() {
            el.style.opacity = Math.min((+new Date() - time) / fadeTime, 1);
            if (+el.style.opacity < 1) {
                setTimeout(foo, 16);
            }
        }
        foo();
    }

    // --- 渐隐
    function fadeOut(el) {
        el.style.display = 'block';
        el.style.opacity = 1;
        var time = +new Date();
        function foo() {
            el.style.opacity = Math.max((1 - (+new Date() - time) / fadeTime), 0);
            if (+el.style.opacity > 0) {
                setTimeout(foo, 16);
            }
        }
        foo();
    }

    // --- 主函数
    function slideMain(index) {
        // console.log('slideTo: ', index);
        if (timer) {
            clearTimeout(timer);
        }
        var next = null;
        fadeOut(sliderPages[cur]);
        if (typeof index == 'number') {
            next = index;
        } else if (index == 'prev') {
            next = (cur == 0) ? (sliderPages.length - 1) : (cur - 1);
        } else if (index == 'next') {
            next = (cur == sliderPages.length - 1) ? 0 : (cur + 1);
        } else if (cur == sliderPages.length - 1) {
            next = 0;
        } else {
            next = cur + 1;
        }
        fadeIn(sliderPages[next]);
        sliderLinks[cur].style.opacity = 0.4;
        sliderLinks[next].style.opacity = 0.9;
        cur = next;
        timer = setTimeout(slideMain, showTime);
    }

    var sliderPages = doc.getElementsByClassName('slider-page');
    var sliderLinks = doc.getElementsByClassName('slider-link');
    var cur = 0;
    var timer = setTimeout(slideMain, showTime);

    // --- 圆圈按钮
    for (var i = 0; i < sliderLinks.length; i++) {
        sliderLinks[i].addEventListener('mouseenter', function (e) {
            slideMain(+e.target.dataset.slideTo);
        })
    }
    // --- 左侧按钮
    doc.getElementsByClassName('slider-prev')[0].addEventListener('click', function (e) {
        slideMain(e.target.dataset.slideTo);
    });
    // --- 右侧按钮
    doc.getElementsByClassName('slider-next')[0].addEventListener('click', function (e) {
        slideMain(e.target.dataset.slideTo);
    })

};