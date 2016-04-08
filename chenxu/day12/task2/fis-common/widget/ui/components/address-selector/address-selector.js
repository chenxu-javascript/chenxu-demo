var Widget = require("arale/widget/1.1.1/widget");
var $ = require("$");

// 这块可能天蓬网要用,先不改嘛...

var api = 'http://api.zhubajie.com/public/getregion?parent_id={%ID%}&appid=a1321823faf68904';
var dataCache = {
    province: [],
    city: [],
    town: []
};
var tipLang = {
    province: '--请选择省份--',
    city: '--请选择城市--',
    town: '--请选择地区--'
};
var AddressSelector = Widget.extend({
    attrs: {
        parentNode: '',
        provinceId: -1,
        cityId: -1,
        townId: -1,
        template: '<div class="address-selector">' + '<select name="province"><option value="-1">' + tipLang.province + '</option></select>' + '<select name="city"><option value="-1">' + tipLang.city + '</option></select>' + '<select name="town"><option value="-1">' + tipLang.town + '</option></select>' + '</div>',
        events: {
            'change select': function (evt) {
                this._freshAddress(evt.target.name, evt.target.value);
            }
        }
    },
    setup: function () {
        var self = this;
        var defaultProvince = this.get('provinceId');
        AddressSelector.superclass.setup.call(this);
        this._loadData(0, 'province', function (data) {
            self.render($(self.get('holder')));
            self._renderAddress('province', data);
            if (defaultProvince > 0) {
                self._initData();
            }
        });
    },
    getAddress: function () {
        var self = this;
        var provinceObj = getCheckOption('province');
        var cityObj = getCheckOption('city');
        var townObj = getCheckOption('town');
        return {
            province: {
                id: provinceObj.attr('value'),
                name: provinceObj.html()
            },
            city: {
                id: cityObj.attr('value'),
                name: cityObj.html()
            },
            town: {
                id: townObj.attr('value'),
                name: townObj.html()
            }
        };

        function getCheckOption(name) {
            return self.element.find('select[name="' + name + '"]').find('option:selected');
        }
    },
    _initData: function () {
        var cityId = this.get('cityId');
        var townId = this.get('townId');
        var self = this;
        this.element.find('select[name="province"]').find('option[value="' + this.get('provinceId') + '"]').attr('selected', 'selected');
        var cityDataDefer = $.Deferred();
        this._freshAddress('province', this.get('provinceId'), cityDataDefer);
        cityDataDefer.done(function () {
            cityId > 0 && self.element.find('select[name="city"]').find('option[value="' + cityId + '"]').attr('selected', 'selected');
        });
        if (cityId > 0) {
            var townDefer = $.Deferred();
            this._freshAddress('city', this.get('cityId'), townDefer);
            townDefer.done(function () {
                townId > 0 && self.element.find('select[name="town"]').find('option[value="' + townId + '"]').attr('selected', 'selected');
            });
        }
    },
    _freshAddress: function (type, value, defer) {
        var self = this;
        var loadType;
        this.trigger('change', {
            type: type,
            value: value
        });
        if (type == 'town') {
            defer && defer.resolve();
            return;
        }
        this._emptyAddress('town');
        if (type == 'province') {
            loadType = 'city';
        } else {
            loadType = 'town';
        }
        this._loadData(value, loadType, function (data) {
            if (loadType == 'city') {
                self._emptyAddress('city');
                self._renderAddress('city', data);
            } else {
                self._renderAddress('town', data);
            }
            defer && defer.resolve();
        });
    },
    _renderAddress: function (type, data) {
        this.element.find('select[name="' + type + '"]').append(this._getOptopnsHTML(type, data));
    },
    _emptyAddress: function (type) {
        this.element.find('select[name="' + type + '"] option').not(':first-child').remove();
    },
    _getOptopnsHTML: function (type, data) {
        var html = '';
        $.each(data, function (idx, item) {
            html += '<option value="' + item.region_id + '">' + item.region_name + '</option>';
        });
        return html;
    },
    _loadData: function (id, type, callback) {
        id = id || 0;
        if (dataCache[type][id]) {
            callback(dataCache[type][id]);
            return;
        }
        $.ajax({
            url: api.replace('{%ID%}', id),
            dataType: 'jsonp',
            success: function (evt) {
                dataCache[type][id] = evt.data;
                callback(evt.data);
            }
        })
    }
});
module.exports = AddressSelector;