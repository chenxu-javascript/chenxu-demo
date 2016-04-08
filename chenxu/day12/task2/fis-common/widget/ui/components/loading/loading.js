var makeId = function(){
    var id = 0;
    return function(){
        return '_component_id_' + ( id++ );
    }
}();
var instanceList = {};

function getInstance( dom ){
    var componentId = $(dom).attr( 'data-id' );
    return instanceList[ componentId ];
}


function Loadingable( opts ){
    this.countingdown = opts.countingdown || 0;
    this.counting = opts.counting || 60;
    this.element = $( opts.dom );
    this.countingCls = opts.countingCls || 'disabled';
    this.loadingFmt = function( seconds ){
        if ( this.countingdown ) {
            return seconds + 's后可重新获取';
        } else {
            return '提交中';
        }
    };
    this.busy = 0;
    this.timer = null;
    this.orgHTML = this.element.html();
    this.id = makeId();
    this.element.attr('data-id', this.id);
}

(function(){
    this.loading = function(){
        return this.element.hasClass( this.countingCls );
    };

    this.isBusy = function(){
        return this.busy;
    };

    this.start = function(){
        var self = this;
        this.busy = 1;
        this.element.addClass( this.countingCls );
        if ( this.countingdown ) {
            var frame = this.counting;
            count();
            this.timer = setInterval( function(){
                count();
            }, 1000);

            function count(){
                if ( frame == 0 ) {
                    self.clear();
                    return;
                }
                self.element.html( self.loadingFmt( frame-- ) );
            }
        } else {
            this.element.html( self.loadingFmt() );
        }
        return this;
    };

    this.clear = function(){
        this.busy = 0;
        clearInterval( this.timer );
        this.element
            .html( this.orgHTML )
            .removeClass( this.countingCls );
    };
}).call( Loadingable.prototype );

module.exports = {
    start: function( dom, opts ){
        (opts || (opts = {})) && (opts.dom = dom);
        var loadingable = new Loadingable( opts );
        instanceList[ loadingable.id ] = loadingable;
        return loadingable.start();
    },
    end: function( dom ){
        var loadingable = getInstance( dom );
        loadingable && loadingable.clear();
    },
    isBusy: function( dom ){
        var loadingable = getInstance( dom );
        return loadingable && loadingable.isBusy();
    }
};