/**
 * Created by xiongjiyuan on 2016/10/19.
 */

window.onload = function () {
    var brower = document.getElementById('brower');
    console.log(brower);

    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

//以下进行测试
    if (Sys.ie) brower.innerText = 'IE: ' + Sys.ie;
    if (Sys.firefox) brower.innerText = 'Firefox: ' + Sys.firefox;
    if (Sys.chrome) brower.innerText = 'Chrome: ' + Sys.chrome;
    if (Sys.opera) brower.innerText = 'Opera: ' + Sys.opera;
    if (Sys.safari) brower.innerText = 'Safari: ' + Sys.safari;

//WebSQL
    var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024 * 1024);
    if (db != null)
        document.getElementById("result-WebSQL").innerHTML = ("当前浏览器支持 Web SQL Database");
    else
        document.getElementById("result-WebSQL").innerHTML = ("当前浏览器不支持 Web SQL Database");

//IndexedDB
    if (indexedDB)
        document.getElementById("result-IndexedDB").innerHTML = ("当前浏览器支持 indexedDB");
    else
        document.getElementById("result-IndexedDB").innerHTML = ("当前浏览器不支持 indexedDB");
};
