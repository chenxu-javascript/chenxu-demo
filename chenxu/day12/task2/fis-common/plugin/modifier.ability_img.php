<?php

function smarty_modifier_ability_img( $ability ){
    $ability = (int)$ability;

    if ($ability <= 0){
        $img = "";
    } elseif (1<=$ability && $ability<=299){
        $img = "zbj1.gif";
        $alt = "猪一戒";
    } elseif (300<=$ability && $ability<=999){
        $img = "zbj2.gif";
        $alt = "猪二戒";
    } elseif (1000<=$ability && $ability<=1999){
        $img = "zbj3.gif";
        $alt = "猪三戒";
    } elseif (2000<=$ability && $ability<=4999){
        $img = "zbj4.gif";
        $alt = "猪四戒";
    } elseif (5000<=$ability && $ability<=9999){
        $img = "zbj5.gif";
        $alt = "猪五戒";
    } elseif (10000<=$ability && $ability<=19999){
        $img = "zbj6.gif";
        $alt = "猪六戒";
    } elseif (20000<=$ability && $ability<=49999){
        $img = "zbj7.gif";
        $alt = "猪七戒";
    } elseif (50000<=$ability && $ability<=99999){
        $img = "zbj8.gif";
        $alt = "猪八戒";
    } elseif($ability >= 100000 && $ability < 200000) {
        $img = "tp1.gif";
        $alt = '猪九戒';
    } elseif($ability >= 200000 && $ability < 300000) {
        $img = "tp2.gif";
        $alt = '猪十戒';
    } elseif($ability >= 300000 && $ability < 400000) {
        $img = "tp3.gif";
        $alt = '猪十一戒';
    } elseif($ability >= 400000 && $ability < 500000) {
        $img = "tp4.gif";
        $alt = '猪十二戒';
    } elseif($ability >= 500000 && $ability < 600000) {
        $img = "tp5.gif";
        $alt = '猪十三戒';
    } elseif($ability >= 600000 && $ability < 700000) {
        $img = "tp6.gif";
        $alt = '猪十四戒';
    } elseif($ability >= 700000 && $ability < 800000) {
        $img = "tp7.gif";
        $alt = '猪十五戒';
    } elseif($ability >= 800000 && $ability < 1000000) {
        $img = "tp8.gif";
        $alt = '猪十六戒';
    } elseif($ability >= 1000000 && $ability < 1200000) {
        $img = "zz1.gif";
        $alt = '猪十七戒';
    } elseif($ability >= 1200000 && $ability < 1400000) {
        $img = "zz2.gif";
        $alt = '猪十八戒';
    } elseif($ability >= 1400000 && $ability < 1700000) {
        $img = "zz3.gif";
        $alt = '猪十九戒';
    } elseif($ability >= 1700000 && $ability < 2000000) {
        $img = "zz4.gif";
        $alt = '猪二十戒';
    } elseif($ability >= 2000000 && $ability < 2500000) {
        $img = "zz5.gif";
        $alt = '猪二十一戒';
    } elseif($ability >= 2500000 && $ability < 3000000) {
        $img = "zz6.gif";
        $alt = '猪二十二戒';
    } elseif($ability >= 3000000 && $ability < 3500000) {
        $img = "zz7.gif";
        $alt = '猪二十三戒';
    } elseif($ability >= 3500000 && $ability < 4000000) {
        $img = "zz8.gif";
        $alt = '猪二十四戒';
    } elseif($ability >= 4000000 && $ability < 4500000) {
        $img = "tz1.gif";
        $alt = '猪二十五戒';
    } elseif($ability >= 4500000 && $ability < 5000000) {
        $img = "tz2.gif";
        $alt = '猪二十六戒';
    } elseif($ability >= 5000000 && $ability < 5500000) {
        $img = "tz3.gif";
        $alt = '猪二十七戒';
    } elseif($ability >= 5500000 && $ability < 6000000) {
        $img = "tz4.gif";
        $alt = '猪二十八戒';
    } elseif($ability >= 6000000 && $ability < 7000000) {
        $img = "tz5.gif";
        $alt = '猪二十九戒';
    } elseif($ability >= 7000000 && $ability < 8000000) {
        $img = "tz6.gif";
        $alt = '猪三十戒';
    } elseif($ability >= 8000000 && $ability < 9000000) {
        $img = "tz7.gif";
        $alt = '猪三十一戒';
    } elseif($ability >= 9000000) {
        $img = "tz8.gif";
        $alt = '猪三十二戒';
    } else{
        $img = "tz8.gif";
        $alt = "猪三十二戒";
    }
    $title = "能力等级：".$alt."，能力值：".$ability;

    if ($img ) {
        $str = "<img src=\"http://t5.zbjimg.com/r/pic/".$img."\" alt=\"".$alt."\" title=\"".$title."\"  align=\"absmiddle\" />";
    } else {
        $str = "";
    }
    return $str;
}