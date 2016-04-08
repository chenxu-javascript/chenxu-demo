var referStatistics = {
    domain: '',
    proxyUrl: '',
    proxy: null,
    mode: '',
    isOuterRefer:'',

    init: function( data ){
        this.env = data.env || 'pc';
        this.domain = data.domain;
        this.proxyUrl = data.proxyUrl;
        this.mode = this.getMode( data.mode || 'read' );

        this.createProxy();
    },

    getStatisticsData: function( dataType ){
        dataType = dataType || 'string';

        var data = '';
        var params = [
            'referer',
            'first_page',
            'pmcode',
            'fromcode',
            'un_rid',
            'adunion_lead_id',
            'stt'
        ];
        try{
            data = this.collectData( params, this.getData );
            data.uncode = data.fromcode;
            data.uncode_extid = data.un_rid;

            delete data.fromcode;
            delete data.un_rid;

            return dataType == 'string' ? this.stringify( data ) : data;
        } catch ( e ) {
            return data;
        }
    },
    clear: function(){
        this.proxy.remove();
    },

    collectData: function( keys, getDataMethod ){
        var rs = {};

        for ( var i = 0; i < keys.length; i++ ) {
            var key = keys[i];
            var val = getDataMethod.call( this, key );
            rs[ key ] = val;
        }
        return rs;
    },

    setData: function( name, value ){
        this.proxy.set( name,  encodeURIComponent( value ) );
    },

    getData: function( name ){
        return decodeURIComponent( this.proxy.get( name ) );
    },

    getInitData: function( raw ){

        var initData = this.getDataFromUrl();
        initData['isOuterRefer'] = this.getReferer();
        return raw ? initData : this.stringify( initData );
    },

    stringify: function( data ){
        var idx = 0;
        var rs = '';

        for ( var i in data ) {
            if ( data.hasOwnProperty( i ) ) {
                if ( idx > 0 ) {
                    rs += '&';
                }

                rs += i + '=' + encodeURIComponent( data[i] );

                idx++;
            }
        }
        return rs;
    },

    getDataFromUrl: function(){
        var rs = {};

        var params = [
            'pmcode',
            'fromcode',
            'un_rid',
            'adunion_lead_id',
            'stt'
        ];

        rs = this.collectData( params, getURLParam );

        var referer = this.getReferer();
        if ( referer ) {
            rs['referer'] = referer;
        }
        //因为内联的原因，first_page不为iframe的href
        if(this.env=='mobile'&&window.frames.length != parent.frames.length){
            rs['first_page'] = parent.location.href;
        }else{
            rs['first_page'] = document.location.href;
        }
        if ( this.mode == 'write' ) {
            rs['domain'] = this.domain;
        }
        return rs;
    },

    getReferer: function(){
        var hostName = document.location.host;
        var ref = document.referrer;
        var domain = this.domain;

        if ( isOuterPage() ) {
            return ref;
        }

        return "";

        function isOuterPage(){
            if ( ref.indexOf('zbj.com') >= 0
                && ref.indexOf('t6.zbj.com') < 0
                && ( hostName.indexOf('zhubajie.com') >= 0 || hostName.indexOf('t6.zbj.com') >=0 || hostName.indexOf('zbj.com') >=0|| hostName.indexOf('tianpeng.com')|| hostName.indexOf('t6.tp.com')|| hostName.indexOf('t6.tp.com') || hostName.indexOf('zhubiaoju.com') >=0)
            ) {
                return false;
            }
            if ( ref.indexOf( domain + '/' ) < 0 ){
                return ref;
            }
        }

    },

    createProxy: function(){
        if ( this.env == 'pc' ) {
            this.pcEnvProxy();
        } else {
            this.mobileEnvProxy();
        }
    },

    pcEnvProxy: function(){
        var self = this;

        var proxyIframe = document.createElement('iframe');

        if ( this.mode != 'read' ) {
            // 写 domain
            if ( document.domain != this.domain ) {
                document.domain = this.domain;
            }
            proxyIframe.onload = function(){
                self.proxy = proxyIframe.contentWindow.store;
            };
        }

        proxyIframe.src = this.proxyUrl + '?' + this.getInitData();
        proxyIframe.style.display = 'none';
        document.body.appendChild( proxyIframe );

        // http 数据同步到 https
        this.pcEnvHTTPSWorkaround();
    },

    pcEnvHTTPSWorkaround: function(){
        if ( this.proxyUrl.indexOf('http://') >= 0
            && ( this.domain == 'zbj.com' || this.domain == 'zhubajie.la' || this.domain == 'zhubajie.com' ) ) {
            var proxyIframe = document.createElement('iframe');
            proxyIframe.src = this.proxyUrl.replace('http://', 'https://') + '?' + this.getInitData();
            proxyIframe.style.display = 'none';
            document.body.appendChild( proxyIframe );
        }
    },

    mobileEnvProxy: function(){

        this.proxy = window.store;
        var data = this.getInitData( true );
        for ( var i in data ) {
            if (data[i]!='' ) {
                this.proxy.set(i, data[i]);
            }
        }
    },
    getMode: function( mode ){
        var hostName = document.location.hostname;
        if ( (mode != 'read' && hostName.indexOf( this.domain ) >= 0) ){
            return 'write';
        }
        return 'read';
    }
};

function getURLParam ( key ) {
    return decodeURI(document.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

module.exports = referStatistics;