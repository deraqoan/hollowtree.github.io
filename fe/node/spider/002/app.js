var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var https = require('https');
var promise = require('bluebird');
var url = require('url');

var basicUrl = "https://cnodejs.org/?tab=";
var pageTab = ["all", "good", "share", "ask", "job"];
var desUrl = [];
var pagesArr = [];
pageTab.forEach(function(tab) {
    desUrl.push(basicUrl + tab);
})
console.log(desUrl);
desUrl.forEach(function(url) {
    pagesArr.push(getPageAsync(url));
})


function getPageAsync(url) {
    return new Promise(function(resolve, reject) {
        console.log("正在爬取 " + url);
        https.get(url, function(res) {
            var html = "";
            res.on('data', function(data) {
                html += data;
            });
            res.on('end', function() {
                // console.log(html);
                resolve({ url: url, html: html })
                    // filterInfo(html);
            });
        }).on('error', function() {
            reject(e);
            console.log("ERROR");
        })
    })
}

var spider = {
    all: [
        //     {
        //     url: page.url,
        //     date: date,
        //     data: []
        // }
    ]
};

promise
    .all(pagesArr)
    .then(function(pages) {
        pages.forEach(function(page, index, pages) {
            var pageData = filterInfo(page);
            // console.log(pageData);
        })
        saveData(spider);
    })

function filterInfo(page) {
    var $ = cheerio.load(page.html);
    var chapters = $('.cell');
    // console.log(chapters);
    var date = new Date();
    date = date.toUTCString();

    var pageTemp = {
        pageurl: page.url,
        date: date,
        pagedata: []
    };
    chapters.each(function(index, element) {
        var chapter = $(element);
        // var chapterTitle = chapter.find('a.topic_title').text().trim().replace(/[\s,\[]/g, '');
        var chapterPath = chapter.find('a.topic_title').attr('href');
        // var chapterUrl = url.resolve('https://cnodejs.org/', chapterPath);
        var temp = {};
        temp.author = chapter.find(".user_avatar img").attr("title");
        temp.mark = chapter.find(".topic_title_wrapper span").text();
        temp.title = chapter.find('a.topic_title').text().trim().replace(/\s/g, '');
        temp.url = url.resolve('https://cnodejs.org/', chapterPath);
        pageTemp.pagedata.push(temp);
    })
    console.log("pageTemp:\n", pageTemp);
    spider.all.push(pageTemp);
    console.log("spider: \n", spider);


}

function saveData(data) {
    fs.writeFile('cnodejs.json', JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("OK!");
        }
    })
}