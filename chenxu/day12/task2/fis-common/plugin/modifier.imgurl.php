<?php
function smarty_modifier_imgurl($imgpath,$size='',$shop=0) {
	$strResourceApiPath = preg_replace('/[\\/\\\\]+/', '/', dirname(__FILE__) . '/FISResource.class.php');
	require_once( $strResourceApiPath );
	$upFileOld = FISResource::$siteConfig['siteUrlList']['upfile'];
	if (!is_string($imgpath)) return '';
	$domain = '';
	if(substr($imgpath,0,2)=='20'){//oldcase  200907/8/18_1247034260B6a6.jpg
		$quanUrl = FISResource::$siteConfig['siteUrlList']['quan'];
		$domain = $quanUrl.'/upload/album/';
		return $domain.$imgpath;
	} else if ((strpos($imgpath,'serv/')!=FALSE) && !(strpos($imgpath, 'ttp://'))){//oldserv  /serv/2010-08/31/middleu71ba73a18.jpg
		if ($size) {
			$urlarr = explode('/',$imgpath);
			$filename = array_pop($urlarr);
			$aSize = explode('x',$size);
			if ($aSize && $aSize[0] < 420 && $aSize[1] < 420) {
				$size = 'middle';
			} else {
				$size = '';
			}
			$filename = $size.$filename;
			array_push($urlarr,$filename);
			$imgpath = implode('/',$urlarr);
		}
		$domain = $upFileOld;
		return $domain.$imgpath;
	} else if (substr_count($imgpath,'service/') == 2 ){//  service/2012-12/11/service/50c7245230b4e.jpg
		if ($size) {
			$urlarr = explode('/',$imgpath);
			$filename = array_pop($urlarr);
			$aSize = explode('x',$size);
			if ($aSize[0] && $aSize[1] && $aSize[0] < 420 && $aSize[1] < 420) {
				$size = 'middle';
			}
			//兼容200x1000
			if ($size == 'middle') {
				if (empty($urlarr[0])) {
					$path_day = $urlarr[2].'-'.$urlarr[3];
				} else {
					$path_day = $urlarr[1].'-'.$urlarr[2];
				}
				if ($path_day < '2015-08-19') {
					$size = '200x1000';
				}
				if (strlen($filename)>20) {
					$size = '200x1000';
				}
			}
			$filename = $size.$filename;
			array_push($urlarr,$filename);
			$imgpath = implode('/',$urlarr);
		}
		$domain = $upFileOld;
		return $domain.$imgpath;

	} else if (substr_count($imgpath,'service/')==1 && substr_count($imgpath,'pub/')==1){//老服务图片
		if ($size) {
			$urlarr = explode('/',$imgpath);
			$filename = array_pop($urlarr);
			//兼容200x1000
			if ($size == 'middle') {
				if (empty($urlarr[0])) {
					$path_day = $urlarr[2].'-'.$urlarr[3];
				} else {
					$path_day = $urlarr[1].'-'.$urlarr[2];
				}
				if ($path_day < '2015-08-19') {
					$size = '200x1000';
				}
			}
			$filename = $size.$filename;
			array_push($urlarr,$filename);
			$imgpath = implode('/',$urlarr);
			if (substr($imgpath,0,4) == 'http') {
				$domain = '';
			} else {
				$domain = $upFileOld;
			}
		}
		return $domain.$imgpath;

	} else if (preg_match("/cms\/.*cmsarticle\//",$imgpath)){//  cms/2012-12/11/cmsarticle/50c7245230b4e.jpg
		if ($size) {
			$urlarr = explode('/',$imgpath);
			$filename = array_pop($urlarr);
			$aSize = explode('x',$size);
			if ($aSize && $aSize[0] < 420 && $aSize[1] < 420) {
				$size = 'middle';
			}
			$filename = $size.$filename;
			array_push($urlarr,$filename);
			$imgpath = implode('/',$urlarr);
		}
		$domain = $upFileOld;
		return $domain.$imgpath;
	}else if (strpos($imgpath,'image/upload')!=FALSE){
		$domain = $upFileOld;
		return $domain.$imgpath;
	} else {//腾四
		$domain = $upFileOld;
		if ($imgpath) {
			$urlarr = explode('/',$imgpath);
			$filename = array_pop($urlarr);
			$filename = $size.$filename;
			array_push($urlarr,$filename);
			$imgpath = implode('/',$urlarr);
			if (substr($imgpath,0,4) != 'http' && substr($imgpath,0,1) != '/') {
				$imgpath = '/'.$imgpath;
			} else {
				if (substr($imgpath,0,4) == 'http') $domain = '';
			}
		} else {
			return 'http://s.zbjimg.com/p/shop/img/no_pic4.gif';
		}
		return $domain.$imgpath;
	}
}
?>