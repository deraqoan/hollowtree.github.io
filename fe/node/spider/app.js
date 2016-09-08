var cheerio = require('cheerio');
var fs = require('fs');
var http = require('http');
var https = require('https');
var url = require('url');

var desUrl = "https://cnodejs.org/";

function filterInfo(html) {
    var $ = cheerio.load(html);
    var chapters = $('#topic_list .cell');
    var date = new Date();
    date = date.toUTCString();
    var spider = {
        date: date,
        data: []
    }
    var courseData = [];
    chapters.each(function(idex, element) {
        var chapter = $(element);
        var chapterTitle = chapter.find('a.topic_title').text().trim().replace(/\s/g, '');
        var chapterPath = chapter.find('a.topic_title').attr('href');
        var chapterUrl = url.resolve('https://cnodejs.org/', chapterPath);
        // console.log(chapterTitle + " " + chapterUrl);
        var temp = {};
        temp.title = chapter.find('a.topic_title').text().trim().replace(/\s/g, '');
        temp.url = url.resolve('https://cnodejs.org/', chapterPath);
        spider.data.push(temp);
    })
    console.log(courseData);
    fs.writeFile('cnodejs.json', JSON.stringify(spider), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("OK!");
        }
    })
}

https.get(desUrl, function(res) {
    var html = "";
    res.on('data', function(data) {
        html += data;
    });
    res.on('end', function() {
        // console.log(html);
        filterInfo(html);
    });
}).on('error', function() {
    console.log("ERROR");
})