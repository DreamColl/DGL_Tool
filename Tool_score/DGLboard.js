/**
 * Created by xiongjiyuan on 2016/10/26.
 */
var AREA = {'00': '请选择', '01': '北京', '02': '天津', '03': '西安', '04': '吉林'};
var YEAR = {'2016': '2016', '2017': '2017', '2018': '2018', '2019': '2019'};
var SCHOOL = {
    '101': "清华大学",
    '102': "天津大学",
    '103': "外交学院",
    '104': "北京大学",
    '105': "北京工商大学",
    '106': "北京工业大学",
    '107': "北京交通大学",
    '108': "北京理工大学",
    '109': "北京师范大学",
    '110': "国际关系学院",
    '111': "首都经贸大学",
    '112': "首都师范大学",
    '113': "中央民族大学",
    '114': "中国人民大学",
    '115': "中国农业大学",
    '116': "中国矿业大学（北京）",
    '201': "南开大学",
    '202': "天津工业大学",
    '203': "天津理工大学",
    '204': "天津师范大学",
    '205': "天津城建大学",
    '206': "中国民航大学",
    '207': "天津师范大学津沽分校",
    '208': "河北工业大学",
    '301': '西安外国语大学',
    '302': '',
    '303': '',
    '304': '',
    '305': '',
    '306': '',
    '307': '',
    '308': '',
    '309': ''
};
var turn = {"01": "16", "02": "8", "03": "8", "04": "5"};
var school_begin = {'01': '101', '02': '201', '03': '301'};
var school_end = {'01': '117', '02': '209', '03': '309'};
var areaBackground = {"01": "blue", "02": "purple"};
var db;
const DB_NAME = "test";
const DB_STORE_NAME = "score";
const DB_VERSION = "2";


$(function () {
    createArea();
    initDb();
    $("select").change(board);
});

function createArea() {
    $("select[name=area]").children().remove();
    for (var k = 0; k < Object.keys(AREA).length; k++) {
        var i = Object.keys(AREA)[k];
        $("select[name=area]").append('<option value=' + i + '>' + AREA[i] + '</option>');
    }

    $("select[name=year]").children().remove();
    for (var k = 0; k < Object.keys(YEAR).length; k++) {
        var i = Object.keys(YEAR)[k];
        $("select[name=year]").append('<option value=' + i + '>' + YEAR[i] + '</option>');
    }

    $("option[value=2016]").attr("select", "selected");
}

function initDb() {
    var openRequire = indexedDB.open(DB_NAME, DB_VERSION);
    openRequire.onupgradeneeded = function (e) {
        var store = e.target.result.createObjectStore(DB_STORE_NAME, {keyPath: "id"});
    };

    openRequire.onsuccess = function (e) {
        db = e.target.result;
        console.log("init success");
    };

    openRequire.onerror = function (e) {
        console.error("initDb:", e.target.errorCode);
    };
}
function board() {
    var area = $("select[name=area]>option:selected").val();
    var year = $("select[name=year]>option:selected").val();

    var trans = db.transaction(DB_STORE_NAME, 'readonly');
    var store = trans.objectStore(DB_STORE_NAME);
    var req = store.getAll();
    var result;
    var arrBoard;

    req.onsuccess = function () {
        result = req.result;
        console.log(result);

        boardSort();
        boradShow();
    };

    function boardSort() {
        var arr = [];
        for (var j = school_begin[area]; j < school_end[area]; j++) {
            var s = [0, 0, 0, 0]//学校 胜场 负场 总分
            s[0] = j;
            for (var i in result) {
                if (result[i].school == j && result[i].year == year) {
                    if (result[i].score > 6) s[1]++; else s[2]++;
                    s[3] += parseInt(result[i].score);
                }
            }
            arr.push(s);
        }
        // console.log(arr);
        arrBoard = arr.sort(function (x, y) {
            if (x[1] == y[1])
                if (x[3] == y[3]) return y[0] - x[0];
                else return y[3] - x[3];
            else return y[1] - x[1];

            // if (x[1] == y[1])return y[3] - x[3];else return y[1] - x[1];
        });
        // console.log(arrBoard);
    }

    function boradShow() {
        $("#board-show-school").children().children().remove();

        $("#show-shcool").append("<label>学校</label>");
        for (i = 0; i < arrBoard.length; i++) {
            $("#show-shcool").append("<a>" + SCHOOL[arrBoard[i][0]] + "</a><br>")
        }
        $("#show-win").append("<label>胜场</label>");
        for (i = 0; i < arrBoard.length; i++) {
            $("#show-win").append("<a>" + arrBoard[i][1] + "</a><br>")
        }
        $("#show-defeat").append("<label>负场</label>");
        for (i = 0; i < arrBoard.length; i++) {
            $("#show-defeat").append("<a>" + arrBoard[i][2] + "</a><br>")
        }
        $("#show-score").append("<label>总分</label>");
        for (i = 0; i < arrBoard.length; i++) {
            $("#show-score").append("<a>" + arrBoard[i][3] + "</a><br>")
        }
    }
}
