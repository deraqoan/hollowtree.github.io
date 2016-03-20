var arr = new Array();
        arr = [
            ['单页面制作',
                ['demo/ife/task_1_01_1.html', 'HTML页面'],
                ['demo/ife/task_1_02_1.html', 'HTML+CSS页面1'],
                ['demo/ife/task_1_03_1.html', '三栏式布局'],
                ['demo/ife/task_1_04_1.html', '定位及居中'],
                ['demo/ife/task_1_05_1.html', 'HTML+CSS页面2'],
                ['demo/ife/task_1_06_1.html', '模拟报纸排版'],
                ['demo/ife/task_1_07_1.html', '常见的页面架构及样式布局'],

            ],
            ['网页小部件',
                ['demo/component/101/index.html', '简易电子时钟'],
                //['#', '谷歌'],
                //['#', '微博']
            ]
        ];

        var list = "";
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                if (j == 0) {
                    list += '<div class="myMenu"><dt class="fMenu">' + arr[i][0] + '</dt><div class="sMenu">';
                } else {
                    list += '<dd><a href="' + arr[i][j][0] + '" target="_blank">' + j + ")  " + arr[i][j][1] + '</a></dd>';

                }

            }
            list += '</div></div>';
        }
        list = '<div class="menu"><dl>' + list + '</dl></div>';
        document.write(list);