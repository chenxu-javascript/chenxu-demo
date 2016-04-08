<?php
/*!
 * ubb2html support for php
 * @requires xhEditor
 * 
 * @author Yanis.Wang<yanis.wang@gmail.com>
 * @site http://xheditor.com/
 * @licence LGPL(http://www.opensource.org/licenses/lgpl-license.php)
 * 
 * @Version: 0.9.8 (build 100505)
 */
function smarty_modifier_ubb2html($sUBB)
{	
	$sHtml=$sUBB;
	
	global $emotPath,$cnum,$arrcode,$bUbb2htmlFunctionInit;$cnum=0;$arrcode=array();
	$emotPath='http://s.zbjimg.com/ubb/xheditor_emot/default/';//表情根路径
	
	if(!$bUbb2htmlFunctionInit){
	function saveCodeArea($match)
	{
		global $cnum,$arrcode;
		$cnum++;$arrcode[$cnum]=$match[0];
		return "[\tubbcodeplace_".$cnum."\t]";
	}}
	$sHtml=preg_replace_callback('/\[code\s*(?:=\s*((?:(?!")[\s\S])+?)(?:"[\s\S]*?)?)?\]([\s\S]*?)\[\/code\]/i','saveCodeArea',$sHtml);
	
	//$sHtml=preg_replace("/&/",'&amp;',$sHtml); 不对&符号进行转义 继安修改
	$sHtml=preg_replace("/</",'&lt;',$sHtml);
	$sHtml=preg_replace("/>/",'&gt;',$sHtml);
	$sHtml=preg_replace("/\r?\n/",'<br />',$sHtml);
	
	$sHtml=preg_replace("/\[(\/?)(b|u|i|s|sup|sub|hl)\]/i",'<$1$2>',$sHtml);
	$sHtml=preg_replace('/\[color\s*=\s*([^\]"]+?)(?:"[^\]]*?)?\s*\]/i','<span style="color:$1;">',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getSizeName($match)
	{
		$arrSize=array('8pt','10pt','12pt','14pt','18pt','24pt','36pt');
		return '<span style="font-size:'.$arrSize[$match[1]-1].';">';
	}}
	$sHtml=preg_replace_callback("/\[size\s*=\s*(\d+?)\s*\]/i",'getSizeName',$sHtml);
	$sHtml=preg_replace('/\[font\s*=\s*([^\]"]+?)(?:"[^\]]*?)?\s*\]/i','<span style="font-family:$1;">',$sHtml);
	$sHtml=preg_replace('/\[back\s*=\s*([^\]"]+?)(?:"[^\]]*?)?\s*\]/i','<span style="background-color:$1;">',$sHtml);
	$sHtml=preg_replace("/\[\/(color|size|font|back)\]/i",'</span>',$sHtml);
	
	for($i=0;$i<3;$i++)$sHtml=preg_replace('/\[align\s*=\s*([^\]"]+?)(?:"[^\]]*?)?\s*\](((?!\[align(?:\s+[^\]]+)?\])[\s\S])*?)\[\/align\]/','<p align="$1">$2</p>',$sHtml);
	$sHtml=preg_replace('/\[img\]\s*(((?!")[\s\S])+?)(?:"[\s\S]*?)?\s*\[\/img\]/i','<img src="$1" alt="" />',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getImg($match)
	{
		$alt=$match[1];$p1=$match[2];$p2=$match[3];$p3=$match[4];$src=$match[5];
		$a=$p3?$p3:(!is_numeric($p1)?$p1:'');
		return '<img src="'.$src.'" alt="'.$alt.'"'.(is_numeric($p1)?' width="'.$p1.'"':'').(is_numeric($p2)?' height="'.$p2.'"':'').($a?' align="'.$a.'"':'').' />';
	}}
	$sHtml=preg_replace_callback('/\[img\s*=([^,\]]*)(?:\s*,\s*(\d*%?)\s*,\s*(\d*%?)\s*)?(?:,?\s*(\w+))?\s*\]\s*(((?!")[\s\S])+?)(?:"[\s\S]*)?\s*\[\/img\]/i','getImg',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getEmot($match)
	{
		global $emotPath;
		$arr=split(',',$match[1]);
		if(!isset($arr[1])){$arr[1]=$arr[0];$arr[0]='default';}
		$path=$emotPath.$arr[0].'/'.$arr[1].'.gif';
		return '<img src="'.$path.'" alt="'.$arr[1].'" />';
	}}
	$sHtml=preg_replace_callback('/\[emot\s*=\s*([^\]"]+?)(?:"[^\]]*?)?\s*\/\]/i','getEmot',$sHtml);
	//人性化表情UBB标签处理
	$sHtml = strtr($sHtml,array(
           '[生气]'=>"<img src='".$emotPath.'1.gif'."'>",
           '[吃饭]'=>"<img src='".$emotPath.'2.gif'."'>",
           '[疑问(微笑)]'=>"<img src='".$emotPath.'3.gif'."'>",
           '[打针]'=>"<img src='".$emotPath.'4.gif'."'>",
           '[大哭]'=>"<img src='".$emotPath.'5.gif'."'>",
           '[拳击]'=>"<img src='".$emotPath.'6.gif'."'>",
           '[投降]'=>"<img src='".$emotPath.'7.gif'."'>",
           '[俯卧撑]'=>"<img src='".$emotPath.'8.gif'."'>",
           '[疑问(不解)]'=>"<img src='".$emotPath.'9.gif'."'>",
           '[发财]'=>"<img src='".$emotPath.'10.gif'."'>",
           '[瞌睡]'=>"<img src='".$emotPath.'11.gif'."'>",
           '[打酱油]'=>"<img src='".$emotPath.'12.gif'."'>",
           '[憨笑]'=>"<img src='".$emotPath.'13.gif'."'>",
           '[吃西瓜]'=>"<img src='".$emotPath.'14.gif'."'>",
           '[汗]'=>"<img src='".$emotPath.'15.gif'."'>",
           '[惊恐]'=>"<img src='".$emotPath.'16.gif'."'>",
           '[中标]'=>"<img src='".$emotPath.'17.gif'."'>",
           '[翻墙]'=>"<img src='".$emotPath.'18.gif'."'>",
           '[摇头]'=>"<img src='".$emotPath.'19.gif'."'>",
           '[念经]'=>"<img src='".$emotPath.'20.gif'."'>",
           '[害羞]'=>"<img src='".$emotPath.'21.gif'."'>",
           '[睡觉]'=>"<img src='".$emotPath.'22.gif'."'>",
           '[勤奋]'=>"<img src='".$emotPath.'23.gif'."'>",
           '[真棒]'=>"<img src='".$emotPath.'24.gif'."'>",
           '[偷笑]'=>"<img src='".$emotPath.'25.gif'."'>",
           '[听音乐]'=>"<img src='".$emotPath.'26.gif'."'>",
           '[晕]'=>"<img src='".$emotPath.'27.gif'."'>"
           ));
    if(!$bUbb2htmlFunctionInit){
	function getUrl($match){
    	$url = $match[1];
    	if (preg_match('/zhubajie\.com/i',$url) || preg_match('/zbj\.com/i',$url)){
    		return '<a target="_blank" href="'.$url.'">'.$url.'</a>';
    	} else {
    		return '<span class="target-url">'.$url.'</span>';
    	}
    }}
    if(!$bUbb2htmlFunctionInit){
    function getLink($match){
    	$url = $match[1];
    	$str = $match[2];
    	if (preg_match('/zhubajie\.com/i',$url)){
    		return '<a target="_blank" href="'.$url.'">'.$str.'</a>';
    	} else {
    		return '<span class="target-url" url="'.$url.'">'.$str.'</span>';
    	}
    }}
	$sHtml=preg_replace_callback('/\[url\]\s*(((?!")[\s\S])*?)(?:"[\s\S]*?)?\s*\[\/url\]/i','getUrl',$sHtml);
	$sHtml=preg_replace_callback('/\[url\s*=\s*([^\]"]+?)(?:"[^\]]*?)?\s*\]\s*([\s\S]*?)\s*\[\/url\]/i','getLink',$sHtml);
	$sHtml=preg_replace('/\[email\]\s*(((?!")[\s\S])+?)(?:"[\s\S]*?)?\s*\[\/email\]/i','<a href="mailto:$1">$1</a>',$sHtml);
	$sHtml=preg_replace('/\[email\s*=\s*([^\]"]+?)(?:"[^\]]*?)?\s*\]\s*([\s\S]+?)\s*\[\/email\]/i','<a href="mailto:$1">$2</a>',$sHtml);
	$sHtml=preg_replace("/\[quote\]([\s\S]*?)\[\/quote\]/i",'<blockquote>$1</blockquote>',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getFlash($match)
	{
		$w=$match[1];$h=$match[2];$url=$match[3];
		if(!$w)$w=480;if(!$h)$h=400;
		return '<embed type="application/x-shockwave-flash" src="'.$url.'" wmode="opaque" quality="high" bgcolor="#ffffff" menu="false" play="true" loop="true" width="'.$w.'" height="'.$h.'" />';
	}}
	$sHtml=preg_replace_callback('/\[flash\s*(?:=\s*(\d+)\s*,\s*(\d+)\s*)?\]\s*(((?!")[\s\S])+?)(?:"[\s\S]*?)?\s*\[\/flash\]/i','getFlash',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getMedia($match)
	{
		$w=$match[1];$h=$match[2];$play=$match[3];$url=$match[4];
		if(!$w)$w=480;if(!$h)$h=400;
		return '<embed type="application/x-mplayer2" src="'.$url.'" enablecontextmenu="false" autostart="'.($play=='1'?'true':'false').'" width="'.$w.'" height="'.$h.'" />';
	}}
	$sHtml=preg_replace_callback('/\[media\s*(?:=\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+)\s*)?)?\]\s*(((?!")[\s\S])+?)(?:"[\s\S]*?)?\s*\[\/media\]/i','getMedia',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getTable($match)
	{
		return '<table'.(isset($match[1])?' width="'.$match[1].'"':'').(isset($match[2])?' bgcolor="'.$match[2].'"':'').'>';
	}}
	$sHtml=preg_replace_callback('/\[table\s*(?:=(\d{1,4}%?)\s*(?:,\s*([^\]"]+)(?:"[^\]]*?)?)?)?\s*\]/i','getTable',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getTR($match){return '<tr'.(isset($match[1])?' bgcolor="'.$match[1].'"':'').'>';}}
	$sHtml=preg_replace_callback('/\[tr\s*(?:=(\s*[^\]"]+))?(?:"[^\]]*?)?\s*\]/i','getTR',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getTD($match){
		$col=isset($match[1])?$match[1]:0;$row=isset($match[2])?$match[2]:0;$w=isset($match[3])?$match[3]:null;
		return '<td'.($col>1?' colspan="'.$col.'"':'').($row>1?' rowspan="'.$row.'"':'').($w?' width="'.$w.'"':'').'>';
	}}
	$sHtml=preg_replace_callback("/\[td\s*(?:=\s*(\d{1,2})\s*,\s*(\d{1,2})\s*(?:,\s*(\d{1,4}%?))?)?\s*\]/i",'getTD',$sHtml);
	$sHtml=preg_replace("/\[\/(table|tr|td)\]/i",'</$1>',$sHtml);
	$sHtml=preg_replace("/\[\*\]((?:(?!\[\*\]|\[\/list\]|\[list\s*(?:=[^\]]+)?\])[\s\S])+)/i",'<li>$1</li>',$sHtml);
	if(!$bUbb2htmlFunctionInit){
	function getUL($match)
	{
		$str='<ul';
		if(isset($match[1]))$str.=' type="'.$match[1].'"';
		return $str.'>';
	}}
	$sHtml=preg_replace_callback('/\[list\s*(?:=\s*([^\]"]+))?(?:"[^\]]*?)?\s*\]/i','getUL',$sHtml);
	$sHtml=preg_replace("/\[\/list\]/i",'</ul>',$sHtml);

	for($i=1;$i<=$cnum;$i++)$sHtml=str_replace("[\tubbcodeplace_".$i."\t]", $arrcode[$i],$sHtml);

	if(!$bUbb2htmlFunctionInit){
	function fixText($match)
	{
		$text=$match[2];
		$text=preg_replace("/\t/",'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',$text);
		$text=preg_replace("/ /",'&nbsp;',$text);
		return $match[1].$text;
	}}
	$sHtml=preg_replace_callback('/(^|<\/?\w+(?:\s+[^>]*?)?>)([^<$]+)/i','fixText',$sHtml);
	//显示源代码
	if(!$bUbb2htmlFunctionInit){
	function showCode($match)
	{
		$match[1]=strtolower($match[1]);
		if(!$match[1])$match[1]='plain';
		$match[2]=preg_replace("/</",'&lt;',$match[2]);
		$match[2]=preg_replace("/>/",'&gt;',$match[2]);
		return '<pre name="code" class="'.$match[1].'">'.$match[2].'</pre>';
	}}
	$sHtml=preg_replace_callback('/\[code\s*(?:=\s*((?:(?!")[\s\S])+?)(?:"[\s\S]*?)?)?\]([\s\S]*?)\[\/code\]/i','showCode',$sHtml);
	//flv播放
	if(!$bUbb2htmlFunctionInit){
	function showFlv($match)
	{
		$w=$match[1];$h=$match[2];$url=$match[3];
		if(!$w)$w=480;if(!$h)$h=400;
		return '<embed type="application/x-shockwave-flash" src="mediaplayer/player.swf" wmode="transparent" allowscriptaccess="always" allowfullscreen="true" quality="high" bgcolor="#ffffff" width="'.$w.'" height="'.$h.'" flashvars="file='.$url.'" />';
	}}
	$sHtml=preg_replace_callback('/\[flv\s*(?:=\s*(\d+)\s*,\s*(\d+)\s*)?\]\s*(((?!")[\s\S])+?)(?:"[\s\S]*?)?\s*\[\/flv\]/i','showFlv',$sHtml);
	
	$bUbb2htmlFunctionInit=true;	
	
	return $sHtml;
}
?>
