export default class Lang {
  // 判断字符串是否为空
  static isEmpty(str) {
    return str == '' || str == null || str == 'null';
  }
  // 判断字符串是否不为空
  static isNotEmpty(str) {
    return !this.isEmpty(str);
  }
  // 浮点求和
  static sum(numbers, toFixed = 2) {
    let sum = 0;
    for (const str of numbers) {
      if (!this.isNumber(str)) {
        return NaN;
      }
      const num = parseFloat(str);
      if (isNaN(num)) {
        return NaN;
      }
      sum += num;
    }
    return sum.toFixed(toFixed);
  }
  // 数字判断
  static isNumber(value) {
    const patrn = /^[-+]?\d+(\.\d+)?$/;
    return patrn.test(value);
  }

  // 数字判断
  static isPositiveNumber(value) {
    const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/;
    return patrn.test(value);
  }
  // 数组判断
  static isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }
  // 事件转日期
  static convertTimestapeToDay(timestape) {
    return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.');
  }

  // 格式化日期
  static dateFormate (date, fmt) {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
    return fmt;
  }

  static dateAddDays(date,days){

    if (days == undefined || days == null || days == '') {
      days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + this.getFormatDate(month) + '-' + this.getFormatDate(day);
  }

  static getFormatDate(arg) {
    if (arg == undefined || arg == '') {
      return '';
    }

    var re = arg + '';
    if (re.length < 2) {
      re = '0' + re;
    }

    return re;
  }

  //价格显示格式化 1,231.00元
  static fmMoney(money, precision ,isUnit,isPrecssion){
    if(money==null || money==undefined || money=='') money = 0
    precision = precision || 0;
    if(precision > 2) precision = 2;
    isUnit = isUnit==undefined?false :isUnit;
    var unit = ""
    if(isUnit) unit = "￥"
    money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
    if(money>0){
        money = money.toFixed(precision) + "";
        //_integer -- 整数部分，_dec -- 小数部分, _comma--每三位数用逗号分隔
        var _integer = money.split(".")[0].split("").reverse(),
            _dec     = "",
            _comma   = "";
        if(precision>0){
            _dec = "." + money.split(".")[1];
        }
        if(_integer.length>4) {
            //过万元
            // if(isUnit) unit = "万";
            // else unit = "W";
            unit = "万"
            if(isPrecssion) return this.fmMoney(money / 10000, 0, false) + unit;
            else return this.fmMoney(money / 10000, 2, false) + unit;
        }
        for(var i = 0; i < _integer.length; i ++ ){
            _comma += _integer[i] + ((i + 1) % 3 == 0 && (i + 1) != _integer.length ? "," : "");
        }
        return unit + _comma.split("").reverse().join("") + _dec;
        }
    return unit + money;
   }
}
