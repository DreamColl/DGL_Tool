/**
 * Created by xiongjiyuan on 2016/10/9.
 */
//div#initialize 使用了¥作为未来的数据库重构标识
$(function() {
    //生成轮次//生成得分//生成学校
    $("select[name=area]").change(createTurn).change(createScore).change(createSchool);

    //生成轮次、对阵、分数、最佳辩手¥
    function createTurn() {
        $("select[name=turn]").children().remove();
        var area = $("select[name=area]").val();
        var turn = { '01': 16, '02': 8, '03': 8 };
        for (var i = 1; i < turn[area]; i++) {
            $("select[name=turn]").append("<option>第" + NumberToChinese(i) + "轮</option>");
        }
    }

    //数据库标记¥
    function createSchool() {
        $("select[name=school]").children().remove();
        var area = $("select[name=area]").val();
        var school_begin = { '01': '101', '02': '201', '03': '301' };
        var school_end = { '01': '117', '02': '205', '03': '309' };
        var school = {
            '101': "北京大学",
            '102': "北京工商大学",
            '103': "北京工业大学",
            '104': "北京交通大学",
            '105': "北京理工大学",
            '106': "北京师范大学",
            '107': "对外经贸大学",
            '108': "国际关系学院",
            '109': "清华大学",
            '110': "首都经贸大学",
            '111': "首都师范大学",
            '112': "天津大学",
            '113': "外交学院",
            '114': "中国矿业大学（北京）",
            '115': "中国人民大学",
            '116': "中国农业大学",
            '201': "南开大学",
            '202': "天津工业大学",
            '203': "天津理工大学",
            '204': "天津师范大学",
            '205': "天津城建大学",
            '206': "中国民航大学",
            '207': "天津师范大学津沽分校",
            '208': "河北工业大学"
        };

        for (var i = school_begin[area]; i < school_end[area]; i++) {
            $("select[name=school]").append("<option>" + school[i] + "</option>");
        }
    }

    function createScore() {
        $("select[name^=score]").children().remove();
        $('div#school').children().remove();

        var area = $("select[name=area]").val();
        var turn = { '01': 16, '02': 8, '03': 8, '04': 5 };
        var times;
        if (turn[area] % 2 == 0) {
            times = turn[area] / 2;
        } else {
            times = (turn[area] - 1) / 2;
        }
        //添加得分选项、最佳辩手、学校
        for (var i = 0; i < times; i++) {
            $('div#school').append("<ul><a>第" + NumberToChinese(i + 1) + "场:</a><select name='score_a" + i + "'></select><select name='score_b" + i + "'></select><p><a id='bestName'> 最佳辩手:</a><input type='text' name='bestName'></p></ul>");
        }
        $("select[name=school]").remove();
        $('select[name^=score]').before("<select name='school'>");

        //得分自动修改
        for (var j = 0; j < 10; j++) {
            $("select[name=score_a0], select[name = score_b0]").append(" <option> " + j + " </option> ");
            $("select[name=score_a1], select[name = score_b1]").append(" <option> " + j + " </option> ");
            $("select[name=score_a2], select[name = score_b2]").append(" <option> " + j + " </option> ");
            $("select[name=score_a3], select[name = score_b3]").append(" <option> " + j + " </option> ");
            $("select[name=score_a4], select[name = score_b4]").append(" <option> " + j + " </option> ");
            $("select[name=score_a5], select[name = score_b5]").append(" <option> " + j + " </option> ");
            $("select[name=score_a6], select[name = score_b6]").append(" <option> " + j + " </option> ");
            $("select[name=score_a7], select[name = score_b7]").append(" <option> " + j + " </option> ");
            $("select[name=score_a8], select[name = score_b8]").append(" <option> " + j + " </option> ");
            $("select[name=score_a9], select[name = score_b9]").append(" <option> " + j + " </option> ");

            //改前面积分后面跟着变动
            $("select[name=score_a0]").change(function() {
                $("select[name=score_b0]").val(9 - $("select[name=score_a0]").val());
            });
            $("select[name=score_a1]").change(function() {
                $("select[name=score_b1]").val(9 - $("select[name=score_a1]").val());
            });
            $("select[name=score_a2]").change(function() {
                $("select[name=score_b2]").val(9 - $("select[name=score_a2]").val());
            });
            $("select[name=score_a3]").change(function() {
                $("select[name=score_b3]").val(9 - $("select[name=score_a3]").val());
            });
            $("select[name=score_a4]").change(function() {
                $("select[name=score_b4]").val(9 - $("select[name=score_a4]").val());
            });
            $("select[name=score_a5]").change(function() {
                $("select[name=score_b5]").val(9 - $("select[name=score_a5]").val());
            });
            $("select[name=score_a6]").change(function() {
                $("select[name=score_b6]").val(9 - $("select[name=score_a6]").val());
            });
            $("select[name=score_a7]").change(function() {
                $("select[name=score_b7]").val(9 - $("select[name=score_a7]").val());
            });
            $("select[name=score_a8]").change(function() {
                $("select[name=score_b8]").val(9 - $("select[name=score_a8]").val());
            });
            $("select[name=score_a9]").change(function() {
                $("select[name=score_b9]").val(9 - $("select[name=score_a9]").val());
            });

            //改后面积分前面跟着变动
            $("select[name=score_b0]").change(function() {
                $("select[name=score_a0]").val(9 - $("select[name=score_b0]").val());
            });
            $("select[name=score_b1]").change(function() {
                $("select[name=score_a1]").val(9 - $("select[name=score_b1]").val());
            });
            $("select[name=score_b2]").change(function() {
                $("select[name=score_a2]").val(9 - $("select[name=score_b2]").val());
            });
            $("select[name=score_b3]").change(function() {
                $("select[name=score_a3]").val(9 - $("select[name=score_b3]").val());
            });
            $("select[name=score_b4]").change(function() {
                $("select[name=score_a4]").val(9 - $("select[name=score_b4]").val());
            });
            $("select[name=score_b5]").change(function() {
                $("select[name=score_a5]").val(9 - $("select[name=score_b5]").val());
            });
            $("select[name=score_b6]").change(function() {
                $("select[name=score_a6]").val(9 - $("select[name=score_b6]").val());
            });
            $("select[name=score_b7]").change(function() {
                $("select[name=score_a7]").val(9 - $("select[name=score_b7]").val());
            });
            $("select[name=score_b8]").change(function() {
                $("select[name=score_a8]").val(9 - $("select[name=score_b8]").val());
            });
            $("select[name=score_b9]").change(function() {
                $("select[name=score_a9]").val(9 - $("select[name=score_b9]").val());
            });
        }
        //最佳辩手选项
        $("a#bestName").after("<select name='bestName'>");
        for (var i = 1; i < 5; i++) {
            $("select[name=bestName]").append("<option>正方" + NumberToChinese(i) + "辩");
        };
        for (var i = 1; i < 5; i++) {
            $("select[name=bestName]").append("<option>反方" + NumberToChinese(i) + "辩");
        };
    }

    //数字转汉字
    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitChar = ["", "十", "百", "千"];
    var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];

    function SectionToChinese(section) {

        var strIns = '',
            chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            } else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    }

    function NumberToChinese(num) {

        var unitPos = 0;
        var strIns = '',
            chnStr = '';
        var needZero = false;

        if (num === 0) {
            return chnNumChar[0];
        }

        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = chnNumChar[0] + chnStr;
            }
            strIns = SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }

        return chnStr;
    }

});
//div#finish
$(function() {
    var a = $("div#finish");

    a.append("<a>请选择");

    $("select[name=area],select[name=turn]").change(areaFinish);
    //$("select[name=school],select[name^=score],select[name=bestName],input[name=bestName]").live('change', areaFinish);
    $(document).on('change', 'select[name=school],select[name^=score],select[name=bestName],input[name=bestName]', areaFinish);

    function areaFinish() {
        a.children().remove();
        //赛区
        var text_area = $("select[name=area]").find("option:selected").text();
        var val_area = $("select[name=area]").find("option:selected").val();
        a.append('<a id="area">' + text_area + '赛区</a><br>');

        //轮次
        var text_turn = $("select[name=turn]").find("option:selected").text();
        a.append('<a id="turn">' + text_turn + '</a><br>');

        //修改背景色¥
        var areaBackground = { "01": "blue", "02": "purple" };
        a.css("background", areaBackground[val_area]);

        //修改学校、积分、佳辩
        var school = $("select[name=school]").find("option:selected");
        var score = $("select[name^=score]").find("option:selected");
        for (var i = 0; i < school.length; i++) {
            a.append('<a id="school">' + school[i].innerText + '</a>');

            if (i % 2 == 0) {
                for (var k = i; k < i + 2; k++) {
                    a.append('<a id="score">' + score[k].innerText + '</a>');
                    if (k % 2 == 0) a.append('<a id="score">:</a>');
                }
            }
            if (i % 2 != 0) {
                a.append('<a class="bestName"></a><br>');

            }
        }

        //佳辩
        var b = $("a.bestName");
        var best = $("select[name=bestName]").find("option:selected");
        var name = $('input[name=bestName]');
        for (j = 0; j < name.length; j++) {
            if (best[j].value) {
                $(b[j]).append('<a id="name">最佳辩手:' + best[j].value + '</a>');
            }
            if (name[j].value) {
                $(b[j]).append('<a id="name">' + name[j].value + '</a>');
            }
        }

    }
});