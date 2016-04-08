(function (test) {
    test(function (utils) {
        return utils.isObject({});
    }, '{} 是对象');

    test(function (utils) {
        return 1 + 1 === 2;
    }, '1 + 1 = 2');

    test(function (utils) {
        return 123 + 256 === 379;
    }, '123 + 256 = 379');

    test(function (utils) {
        var b= [1,'1',2,3,4];
        return utils.uniqueArray(b);
    }, "[1,'1',2,3,4]",true);

    test(function (utils) {

    }, '异常不能被捕获');

    test(function (utils) {
        var total = 0;
        var i;
        for (i = 1; i <= 999999; i++) {
            total += i;
        }
        return total === (1 + 9999) * 9999 / 2;
    }, '可以用简便公式计算1 + 2 + ... + 9999', true);
})(test);