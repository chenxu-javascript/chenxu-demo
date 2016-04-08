<?php
// 当前访问状态，默认base
$current = $_GET["doc"] ? $_GET["doc"] : "base";


// 读取所有资源列表
$map_url = $_SERVER["DOCUMENT_ROOT"] . "/config/common-map.json";
$map_json = json_decode(file_get_contents($map_url), true);

// 组件列表
$map = array();

// 分成基础、通用、第三方组件
$base_arr = array("base", "mixin", "box", "button", "dropdown", "form", "grid", "iconfont", "loading", "step", "table", "tips",
     "modal", "header", "footer");
$vendor_arr = array("vendor");

foreach ($map_json["res"] as $key => $value) {
    // 判断是否有doc.tpl生成文档
    if(preg_match("/doc.tpl/i", $key)){
        // 通过目录名，获得组件名称
        $dir = array_slice(explode("/", $key), -2, 1);
        $dir = $dir[0];


        switch($dir){
            case in_array($dir, $base_arr):
                $_type = "base";
                break;
            case in_array($dir, $vendor_arr):
                $_type = "vendor";
                break;
            default:
                $_type = "comm";
        }
        $map["$dir"] = array("tpl" => $key, "type" => $_type);
    }
}

// 按字母从低到高排序
ksort($map);

// 字体图标展示单独处理
$icon_json = $_SERVER["DOCUMENT_ROOT"] . $map_json["res"]["common:components/iconfont/selection.json"]["uri"];
$icon = json_decode(file_get_contents($icon_json), true);

// 传值给smarty模板
$fis_data = array(
    "title" => "火焰山",
    "desc" => "基础组件库",
    "map" => $map,
    "current" => $current,
    "icon" => $icon
);
