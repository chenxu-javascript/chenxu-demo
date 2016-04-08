<p>包含less常用variables、mixin配置</p>

<h3>常用变量-variables</h3>
<p>品牌色</p>
<div style="padding: 10px;background-color: #ff9400">主色</div>
<div style="padding: 10px;background-color: #5cb85c">成功色</div>
<div style="padding: 10px;background-color: #5bc0de">提示色</div>
<div style="padding: 10px;background-color: #d9534f">警告色</div>
<pre class="code code-css">
//
// Variables
// --------------------------------------------------
//== Colors
//
//## Gray and brand colors for use across Bootstrap.

@gray-darker:            lighten(#000, 13.5%); // #222
@gray-dark:              lighten(#000, 20%);   // #333
@gray:                   lighten(#000, 33.5%); // #555
@gray-light:             lighten(#000, 60%);   // #999
@gray-lighter:           lighten(#000, 93.5%); // #eee

@brand-primary:          #ff9400;
@brand-success:          #5cb85c;
@brand-info:             #5bc0de;
@brand-danger:           #d9534f;

@brand-primary-light:    desaturate(lighten(@brand-primary, 40%), 10%); // #fce9cf
@brand-info-light:    desaturate(lighten(@brand-info, 30%), 10%); //#f7e4e4
@brand-danger-light:       desaturate(lighten(@brand-danger, 35%), 10%); //#dbebdb
@brand-success-light:     desaturate(lighten(@brand-success, 35%), 10%);  //#ddf0f5


//== Scaffolding
//
//## Settings for some of the most global styles.

//** Background color for `<body>`.
//** Global text color on `<body>`.
@text-color:            @gray;

//** Global textual link color.
@link-color:            @gray-dark;
//** Link hover color set via `darken()` function.
@link-hover-color:      darken(@link-color, 15%);


//== Typography
//
//## Font, line-height, and color for body text, headings, and more.

@font-family-sans-serif:  "Helvetica Neue", Helvetica, Arial, sans-serif;
@font-family-serif:       simsun,serif;
@font-family-yahei:       "Microsoft YaHei", sans-serif;

@font-size-base:          14px;
@font-size-large:         ceil((@font-size-base * 1.25)); // ~18px
@font-size-small:         ceil((@font-size-base * 0.85)); // ~12px

@font-size-h1:            floor((@font-size-base * 2.6)); // ~36px
@font-size-h2:            floor((@font-size-base * 2.15)); // ~30px
@font-size-h3:            ceil((@font-size-base * 1.7)); // ~24px
@font-size-h4:            ceil((@font-size-base * 1.25)); // ~18px
@font-size-h5:            @font-size-base;
@font-size-h6:            ceil((@font-size-base * 0.85)); // ~12px


//== Components
//
//## Define common padding and border radius sizes and more. Values based on 14px text and 1.428 line-height (~20px to start).

@padding-base-vertical:     6px;
@padding-base-horizontal:   12px;

@padding-large-vertical:    10px;
@padding-large-horizontal:  16px;

@padding-small-vertical:    5px;
@padding-small-horizontal:  10px;

@padding-xs-vertical:       1px;
@padding-xs-horizontal:     5px;

@border-radius-base:        2px;
@border-radius-large:       4px;
@border-radius-small:       0;


//== Buttons
//
//## For each of Bootstrap's buttons, define text, background and border color.

@btn-font-weight:                normal;

@btn-default-color:              #333;
@btn-default-bg:                 #fff;
@btn-default-border:             #ccc;

@btn-primary-color:              #fff;
@btn-primary-bg:                 @brand-primary;
@btn-primary-border:             darken(@btn-primary-bg, 5%);

@btn-success-color:              #fff;
@btn-success-bg:                 @brand-success;
@btn-success-border:             darken(@btn-success-bg, 5%);

@btn-info-color:                 #fff;
@btn-info-bg:                    @brand-info;
@btn-info-border:                darken(@btn-info-bg, 5%);

@btn-danger-color:               #fff;
@btn-danger-bg:                  @brand-danger;
@btn-danger-border:              darken(@btn-danger-bg, 5%);

@btn-link-disabled-color:        @gray-light;


//-- input color
@input-border-color:             #c1c1c1;
@input-text-color:               #595959;
@input-border-color-hover:       #727272;
@input-border-color-focus:       #07f;
@input-text-color-focus:         #595959;




//-- Z-index master list
@zx10:                  10;//页面级
@zx20:                  20;//页面级较高
@zx100:                 100;//组件级
@zx200:                 200;//组件级较高
@zx500:                 500;//弹出层
@zx999:                 999;//最高
</pre>

<h3>常用功能类-mixin</h3>
<pre class="code code-css">
// Clearfix
//
// For modern browsers
// 1. The space content is one way to avoid an Opera bug when the
//    contenteditable attribute is included anywhere else in the document.
//    Otherwise it causes space to appear at the top and bottom of elements
//    that are clearfixed.
// 2. The use of `table` rather than `block` is only necessary if using
//    `:before` to contain the top-margins of child elements.
//
// Source: http://nicolasgallagher.com/micro-clearfix-hack/

.clearfix() {
    *zoom: 1;
    &:before,
    &:after {
        content: " "; // 1
        display: table; // 2
    }
    &:after {
        clear: both;
    }
}
// Reset filters for IE
//
// When you need to remove a gradient background, do not forget to use this to reset
// the IE filter for IE9 and below.

// Unstyled keeps list items block level, just removes default browser padding and list-style
.list-unstyled(){
  padding-left: 0;
  list-style: none;
  margin-bottom: 0;
}

.reset-filter() {
    filter: e(%("progid:DXImageTransform.Microsoft.gradient(enabled = false)"));
}

// IE7 inline-block
// ----------------
.ie7-inline-block() {
    *display: inline; /* IE7 inline-block hack */
    *zoom: 1;
}

// WebKit-style focus

.tab-focus() {
    // Default
    outline: thin dotted;
    // WebKit
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
}

// Text overflow
// -------------------------
// Requires inline-block or block for proper styling
.text-overflow() {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

// min-height
.min-height(@height){
    min-height:@height;
    height:@height;
    height:auto!important;
}

// Opacity

.opacity(@opacity) {
    opacity: @opacity;
    // IE8 filter
    @opacity-ie: (@opacity * 100);
    filter: ~"alpha(opacity=@{opacity-ie})";
}

// rgba background
// need reset ie 9 filter such as
//.rgba{.rgba-bg(#fff,.75);}
//:root .rgba{.reset-filter();}
.rgba-bg(@color:#000, @alpha:.35){
  @rgba: rgba(red(@color),green(@color),blue(@color),@alpha);
  @argb: argb(@rgba);
  background-color: @rgba;
  filter:~"progid:DXImageTransform.Microsoft.gradient(startColorstr=@{argb}, endColorstr=@{argb})";
}

// Gradients

#gradient {

    // Horizontal gradient, from left to right
    //
    // Creates two color stops, start and end, by specifying a color and position for each color stop.
    // Color stops are not available in IE9 and below.
    .horizontal(@start-color: #555; @end-color: #333; @start-percent: 0%; @end-percent: 100%) {
        background-image: -webkit-linear-gradient(left, color-stop(@start-color @start-percent), color-stop(@end-color @end-percent)); // Safari 5.1-6, Chrome 10+
        background-image: linear-gradient(to right, @start-color @start-percent, @end-color @end-percent); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+
        background-repeat: repeat-x;
        filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=1)",argb(@start-color),argb(@end-color))); // IE9 and down
    }

    // Vertical gradient, from top to bottom
    //
    // Creates two color stops, start and end, by specifying a color and position for each color stop.
    // Color stops are not available in IE9 and below.
    .vertical(@start-color: #555; @end-color: #333; @start-percent: 0%; @end-percent: 100%) {
        background-image: -webkit-linear-gradient(top, @start-color @start-percent, @end-color @end-percent);  // Safari 5.1-6, Chrome 10+
        background-image: linear-gradient(to bottom, @start-color @start-percent, @end-color @end-percent); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+
        background-repeat: repeat-x;
        filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=0)",argb(@start-color),argb(@end-color))); // IE9 and down
    }

    .directional(@start-color: #555; @end-color: #333; @deg: 45deg) {
        background-repeat: repeat-x;
        background-image: -webkit-linear-gradient(@deg, @start-color, @end-color); // Safari 5.1-6, Chrome 10+
        background-image: linear-gradient(@deg, @start-color, @end-color); // Standard, IE10, Firefox 16+, Opera 12.10+, Safari 7+, Chrome 26+
    }
    .horizontal-three-colors(@start-color: #00b3ee; @mid-color: #7a43b6; @color-stop: 50%; @end-color: #c3325f) {
        background-image: -webkit-linear-gradient(left, @start-color, @mid-color @color-stop, @end-color);
        background-image: linear-gradient(to right, @start-color, @mid-color @color-stop, @end-color);
        background-repeat: no-repeat;
        filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=1)",argb(@start-color),argb(@end-color))); // IE9 and down, gets no color-stop at all for proper fallback
    }
    .vertical-three-colors(@start-color: #00b3ee; @mid-color: #7a43b6; @color-stop: 50%; @end-color: #c3325f) {
        background-image: -webkit-linear-gradient(@start-color, @mid-color @color-stop, @end-color);
        background-image: linear-gradient(@start-color, @mid-color @color-stop, @end-color);
        background-repeat: no-repeat;
        filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=0)",argb(@start-color),argb(@end-color))); // IE9 and down, gets no color-stop at all for proper fallback
    }
    .radial(@inner-color: #555; @outer-color: #333) {
        background-image: -webkit-radial-gradient(circle, @inner-color, @outer-color);
        background-image: radial-gradient(circle, @inner-color, @outer-color);
        background-repeat: no-repeat;
    }
    .striped(@color: rgba(255,255,255,.15); @angle: 45deg) {
        background-image: -webkit-linear-gradient(@angle, @color 25%, transparent 25%, transparent 50%, @color 50%, @color 75%, transparent 75%, transparent);
        background-image: linear-gradient(@angle, @color 25%, transparent 25%, transparent 50%, @color 50%, @color 75%, transparent 75%, transparent);
    }
}


// Vendor Prefixes
//
// All vendor mixins are deprecated as of v3.2 due to the introduction of
// Autoprefixer in our Gruntfile. They will be removed in v4.

// - Animations
// - Backface visibility
// - Box shadow
// - Box sizing
// - Content columns
// - Hyphens
// - Placeholder text
// - Transformations
// - Transitions
// - User Select


// Animations
.animation(@animation) {
    -webkit-animation: @animation;
    animation: @animation;
}
.animation-name(@name) {
    -webkit-animation-name: @name;
    animation-name: @name;
}
.animation-duration(@duration) {
    -webkit-animation-duration: @duration;
    animation-duration: @duration;
}
.animation-timing-function(@timing-function) {
    -webkit-animation-timing-function: @timing-function;
    animation-timing-function: @timing-function;
}
.animation-delay(@delay) {
    -webkit-animation-delay: @delay;
    animation-delay: @delay;
}
.animation-iteration-count(@iteration-count) {
    -webkit-animation-iteration-count: @iteration-count;
    animation-iteration-count: @iteration-count;
}
.animation-direction(@direction) {
    -webkit-animation-direction: @direction;
    animation-direction: @direction;
}
.animation-fill-mode(@fill-mode) {
    -webkit-animation-fill-mode: @fill-mode;
    animation-fill-mode: @fill-mode;
}

// Backface visibility
// Prevent browsers from flickering when using CSS 3D transforms.
// Default value is `visible`, but can be changed to `hidden`

.backface-visibility(@visibility){
    -webkit-backface-visibility: @visibility;
    backface-visibility: @visibility;
}

// Drop shadows
//
// Note: Deprecated `.box-shadow()` as of v3.1.0 since all of Bootstrap's
// supported browsers that have box shadow capabilities now support it.

.box-shadow(@shadow) {
    -webkit-box-shadow: @shadow; // iOS <4.3 & Android <4.1
    box-shadow: @shadow;
}

// Border Radius
.border-radius(@radius) {
    -webkit-border-radius: @radius;
    border-radius: @radius;
}

// Box sizing
.box-sizing(@boxmodel) {
    -webkit-box-sizing: @boxmodel;
    box-sizing: @boxmodel;
}

// CSS3 Content Columns
.content-columns(@column-count; @column-gap: #999) {
    -webkit-column-count: @column-count;
    -moz-column-count: @column-count;
    column-count: @column-count;
    -webkit-column-gap: @column-gap;
    -moz-column-gap: @column-gap;
    column-gap: @column-gap;
}

// Optional hyphenation
.hyphens(@mode: auto) {
    word-wrap: break-word;
    -webkit-hyphens: @mode;
    -moz-hyphens: @mode;
    -ms-hyphens: @mode; // IE10+
    hyphens: @mode;
}

// Placeholder text
.placeholder(@color: #999) {
    &::-moz-placeholder           { color: @color;   // Firefox
        opacity: 1; } // See https://github.com/twbs/bootstrap/pull/11526
    &:-ms-input-placeholder       { color: @color; } // Internet Explorer 10+
    &::-webkit-input-placeholder  { color: @color; } // Safari and Chrome
}

// Transformations
.scale(@ratio) {
    -webkit-transform: scale(@ratio);
    -ms-transform: scale(@ratio); // IE9 only
    transform: scale(@ratio);
}
.scale(@ratioX; @ratioY) {
    -webkit-transform: scale(@ratioX, @ratioY);
    -ms-transform: scale(@ratioX, @ratioY); // IE9 only
    transform: scale(@ratioX, @ratioY);
}
.scaleX(@ratio) {
    -webkit-transform: scaleX(@ratio);
    -ms-transform: scaleX(@ratio); // IE9 only
    transform: scaleX(@ratio);
}
.scaleY(@ratio) {
    -webkit-transform: scaleY(@ratio);
    -ms-transform: scaleY(@ratio); // IE9 only
    transform: scaleY(@ratio);
}
.skew(@x; @y) {
    -webkit-transform: skew(@x, @y);
    -ms-transform: skewX(@x) skewY(@y); // See https://github.com/twbs/bootstrap/issues/4885; IE9+
    transform: skew(@x, @y);
}
.translate(@x; @y) {
    -webkit-transform: translate(@x, @y);
    -ms-transform: translate(@x, @y); // IE9 only
    transform: translate(@x, @y);
}
.translate3d(@x; @y; @z) {
    -webkit-transform: translate3d(@x, @y, @z);
    transform: translate3d(@x, @y, @z);
}
.rotate(@degrees) {
    -webkit-transform: rotate(@degrees);
    -ms-transform: rotate(@degrees); // IE9 only
    transform: rotate(@degrees);
}
.rotateX(@degrees) {
    -webkit-transform: rotateX(@degrees);
    -ms-transform: rotateX(@degrees); // IE9 only
    transform: rotateX(@degrees);
}
.rotateY(@degrees) {
    -webkit-transform: rotateY(@degrees);
    -ms-transform: rotateY(@degrees); // IE9 only
    transform: rotateY(@degrees);
}
.perspective(@perspective) {
    -webkit-perspective: @perspective;
    perspective: @perspective;
}
.perspective-origin(@perspective) {
    -webkit-perspective-origin: @perspective;
    perspective-origin: @perspective;
}
.transform-origin(@origin) {
    -webkit-transform-origin: @origin;
    -ms-transform-origin: @origin; // IE9 only
    transform-origin: @origin;
}


// Transitions

.transition(@transition) {
    -webkit-transition: @transition;
    transition: @transition;
}
.transition-property(@transition-property) {
    -webkit-transition-property: @transition-property;
    transition-property: @transition-property;
}
.transition-delay(@transition-delay) {
    -webkit-transition-delay: @transition-delay;
    transition-delay: @transition-delay;
}
.transition-duration(@transition-duration) {
    -webkit-transition-duration: @transition-duration;
    transition-duration: @transition-duration;
}
.transition-timing-function(@timing-function) {
    -webkit-transition-timing-function: @timing-function;
    transition-timing-function: @timing-function;
}
.transition-transform(@transition) {
    -webkit-transition: -webkit-transform @transition;
    transition: transform @transition;
}


// User select
// For selecting text on the page

.user-select(@select) {
    -webkit-user-select: @select;
    -moz-user-select: @select;
    -ms-user-select: @select; // IE10+
    user-select: @select;
}
</pre>
<h3>动画库-animation</h3>
{%require name="common:components/animate/animate.less"%}
<style type="text/css">
    .show-animate{
        text-align: center;
    }
    #show-box{
        width: 500px;
        height: 200px;
        background: #ff9400;
        border-radius: 5px;
        margin: 20px auto;
        font-size: 40px;
        line-height: 200px;
        color: #fff;
    }
</style>
{%script%}
$('#J-select').change(function() {
    var _name = $(this).val();
    $('#show-box').removeClass().addClass(_name).text(_name);
});
{%/script%}
<div class="show-animate">
    <div id="show-box" class="bounce">bounce</div>
    <select id="J-select">
        <optgroup label="Attention Seekers">
            <option value="bounce">bounce</option>
            <option value="flash">flash</option>
            <option value="pulse">pulse</option>
            <option value="rubberBand">rubberBand</option>
            <option value="shake">shake</option>
            <option value="swing">swing</option>
            <option value="tada">tada</option>
        </optgroup>

        <optgroup label="Specials">
            <option value="hingeLeft">hingeLeft</option>
            <option value="hingeRight">hingeRight</option>
            <option value="rollInLeft">rollInLeft</option>
            <option value="rollInRight">rollInRight</option>
            <option value="rollOutLeft">rollOutLeft</option>
            <option value="rollOutRight">rollOutRight</option>
        </optgroup>

        <optgroup label="Wobbles">
            <option value="wobble">wobble</option>
            <option value="wobbleTop">wobbleTop</option>
            <option value="wobbleBottom">wobbleBottom</option>
            <option value="wobbleSkew">wobbleSkew</option>
        </optgroup>

        <optgroup label="Bouncing Entrances">
            <option value="bounceIn">bounceIn</option>
            <option value="bounceInDown">bounceInDown</option>
            <option value="bounceInLeft">bounceInLeft</option>
            <option value="bounceInRight">bounceInRight</option>
            <option value="bounceInUp">bounceInUp</option>
        </optgroup>

        <optgroup label="Bouncing Exits">
            <option value="bounceOut">bounceOut</option>
            <option value="bounceOutDown">bounceOutDown</option>
            <option value="bounceOutLeft">bounceOutLeft</option>
            <option value="bounceOutRight">bounceOutRight</option>
            <option value="bounceOutUp">bounceOutUp</option>
        </optgroup>

        <optgroup label="Fading Entrances">
            <option value="fadeIn">fadeIn</option>
            <option value="fadeInDown">fadeInDown</option>
            <option value="fadeInDownBig">fadeInDownBig</option>
            <option value="fadeInLeft">fadeInLeft</option>
            <option value="fadeInLeftBig">fadeInLeftBig</option>
            <option value="fadeInRight">fadeInRight</option>
            <option value="fadeInRightBig">fadeInRightBig</option>
            <option value="fadeInUp">fadeInUp</option>
            <option value="fadeInUpBig">fadeInUpBig</option>
        </optgroup>

        <optgroup label="Fading Exits">
            <option value="fadeOut">fadeOut</option>
            <option value="fadeOutDown">fadeOutDown</option>
            <option value="fadeOutDownBig">fadeOutDownBig</option>
            <option value="fadeOutLeft">fadeOutLeft</option>
            <option value="fadeOutLeftBig">fadeOutLeftBig</option>
            <option value="fadeOutRight">fadeOutRight</option>
            <option value="fadeOutRightBig">fadeOutRightBig</option>
            <option value="fadeOutUp">fadeOutUp</option>
            <option value="fadeOutUpBig">fadeOutUpBig</option>
        </optgroup>

        <optgroup label="Flippers">
            <option value="flip">flip</option>
            <option value="flipInX">flipInX</option>
            <option value="flipInY">flipInY</option>
            <option value="flipOutX">flipOutX</option>
            <option value="flipOutY">flipOutY</option>
        </optgroup>

        <optgroup label="Scales">
            <option value="scaleIn">scaleIn</option>
            <option value="scaleInX">scaleInX</option>
            <option value="scaleInY">scaleInY</option>
            <option value="scaleOut">scaleOut</option>
            <option value="scaleOutX">scaleOutX</option>
            <option value="scaleOutY">scaleOutY</option>
        </optgroup>

        <optgroup label="Lightspeed">
            <option value="lightSpeedInLeft">lightSpeedInLeft</option>
            <option value="lightSpeedInRight">lightSpeedInRight</option>
            <option value="lightSpeedOutLeft">lightSpeedOutLeft</option>
            <option value="lightSpeedOutRight">lightSpeedOutRight</option>
        </optgroup>

        <optgroup label="Rotating Entrances">
            <option value="rotateIn">rotateIn</option>
            <option value="rotateInDownLeft">rotateInDownLeft</option>
            <option value="rotateInDownRight">rotateInDownRight</option>
            <option value="rotateInUpLeft">rotateInUpLeft</option>
            <option value="rotateInUpRight">rotateInUpRight</option>
        </optgroup>

        <optgroup label="Rotating Exits">
            <option value="rotateOut">rotateOut</option>
            <option value="rotateOutDownLeft">rotateOutDownLeft</option>
            <option value="rotateOutDownRight">rotateOutDownRight</option>
            <option value="rotateOutUpLeft">rotateOutUpLeft</option>
            <option value="rotateOutUpRight">rotateOutUpRight</option>
        </optgroup>

        <optgroup label="Zoom Entrances">
            <option value="zoomIn">zoomIn</option>
            <option value="zoomInDown">zoomInDown</option>
            <option value="zoomInLeft">zoomInLeft</option>
            <option value="zoomInRight">zoomInRight</option>
            <option value="zoomInUp">zoomInUp</option>
        </optgroup>

        <optgroup label="Zoom Exits">
            <option value="zoomOut">zoomOut</option>
            <option value="zoomOutDown">zoomOutDown</option>
            <option value="zoomOutLeft">zoomOutLeft</option>
            <option value="zoomOutRight">zoomOutRight</option>
            <option value="zoomOutUp">zoomOutUp</option>
        </optgroup>

        <optgroup label="turn Entrances">
            <option value="turnInDown">turnInDown</option>
            <option value="turnInUp">turnInUp</option>
            <option value="turnInLeft">turnInLeft</option>
            <option value="turnInRight">turnInRight</option>
        </optgroup>

        <optgroup label="turn Exits">
            <option value="turnOutDown">turnOutDown</option>
            <option value="turnOutUp">turnOutUp</option>
            <option value="turnOutLeft">turnOutLeft</option>
            <option value="turnOutRight">turnOutRight</option>
        </optgroup>
    </select>
</div>
<h4>通过mixin调用，hover伪类触发</h4>
<pre class="code code-css">
.box:hover{
  .bounce();
  .animation(bounce 1s ease-in-out);
  background: #xxx;
  ...
}
</pre>
<h4>通过mixin调用，js修改样式名触发</h4>
<pre class="code">
// less
.bounce{
  .bounce();
  .animation(bounce 1s ease-in-out);
}

// js
$("xxx").addClass(".bounce");
</pre>
<h4>自定义动画参数</h4>
<pre class="code code-css">
// 自定义样式名
.name{
    // 引入动画keyframes，和demo效果名称一致
    // 部分keyframes传入参数可更新动画效果和幅度，参考animation.less
    .bounce(10px);

    // animation-name和keyframes名称一致，通过animation绑定更改动画执行参数
    .animation(bounce 5s ease-in-out);
}
</pre>