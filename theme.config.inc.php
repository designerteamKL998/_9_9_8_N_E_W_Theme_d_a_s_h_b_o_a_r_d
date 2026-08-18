<?php
//die(phpinfo());
$url = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

$theme['imgs_folder'] = $cfg['folder']['theme']."/".$cfg['theme']."/imgs";
$theme['js_folder'] = $cfg['folder']['theme']."/".$cfg['theme']."/js";
$theme['titles_folder'] = $cfg['folder']['theme']."/".$cfg['theme']."/titles";


$cfg['htmlDocType']="html5";

//########################  content menu [  $theme[menu]  ]  ############################
function listCommonMenuItem($menuarr,$level=0){
	global $cfg,$cUSER,$theme,$languages,$menutarget ;
if(!is_array($menuarr))	return;
reset($menuarr);


$menu="";
$sub="";
while(list($key,$val)=each($menuarr)){
	if($val['SubCat']!=$level)continue;
	
	$target = @$menutarget[$val['Target']];
	$name = FieldLangSel("Name_",$val,$languages);
	$child=listCommonMenuItem($menuarr,$val['Ref']);
	$class="";
	if(!empty($child))$class.="has-sub ";
	if (preg_match("/\=/i", urldecode($val['Link']))) {
		parse_str(parse_url(urldecode($val['Link']),PHP_URL_QUERY), $output);
		if (preg_match("/".$_GET[_cmsCommonView]."/i", $output['view'])){
			$class.="active ";
		}
	}else{
		$view = explode("/",$val['Link']);
		if (preg_match("/".$_GET[_cmsCommonView]."/i", $view[count($view)-1])){
			$class.="active ";
		}
	}

	$sub.="\r\n<li class='$class'><a href='$val[Link]' target='$target'>$name</a>";
	$sub.=$child;
	$sub.="</li>";
}

if(!empty($sub)){
$menu = "\r\n<ul>$sub\r\n</ul>";
}

return $menu;
}
$theme['menu']=listCommonMenuItem($menuitem);
$theme['menu']="<div id='cssmenu' class='cmsmenu'>".cmsHTML::FinalizeSysVal($theme['menu'])."</div>";

//########################  content language [  $theme[lang]  ]  ############################

	$theme['lang'] = "<div><ul>";	
	$xlang = explode(",",$cUSER['LangReg']);
	while(list($key,$val)=each($xlang)){
		if(empty($lang['language_'.$val]))continue;
		$newlink = _cmsDOCPATH."/$val/".$_GET[_cmsCommonView];
		if(!empty($_GET['cat']))$newlink.="/cat-".$_GET['cat'];
		$theme['lang'].="<li><a href='$newlink'>".$lang['language_'.$val]."</a></li>";
	}
	$theme['lang'].= "</ul></div>";


if(count($xlang)==0)	$theme['lang'] = "&nbsp;";




//##############  set the theme Title  [  $title  ] #####################
if($pgtitle=="-" OR empty($pgtitle)){
	$theme['title']="";
}else{
	$theme['title']="<h1 class='title'>$pgtitle</h1>";
}


//################  set the theme Navigator links  [  $pgbodynav ]  ###################
reset($NAV);$tmp="";
while(list($key,$val)=each($NAV)){
	$x = explode("|",$val);
	$tmp="<li><a href='$x[0]'>".urldecode(strip_tags($x[1]))."</a></li>".$tmp;
}
$pgnav="<ul>$tmp</ul>";
$theme['nav'] = $pgnav;

//##############  set the theme Body  [  $pgbody  ] #####################
$theme['body'] = "<div id='theme-contain-".$_GET[_cmsCommonView]."'>".$pgbody."</div>";

$panel= CMS5readcontent("frame-panel");
$theme['frame-panel']= FieldLangSel("Text_",$panel,$languages);

//################  set the theme footer  [  $footer ]  ###################
$theme['footer'] = $pgfooter;



$theme['logo'] = $cfg['folder']['data']."/blank.gif";
if(file_exists(_cmsDOCROOT._cmsDOCPATH."/".$cfg['folder']['upload']."/logo.jpg"))$theme['logo'] = _cmsDOCPATH."/".$cfg['folder']['upload']."/logo.jpg";
if(file_exists(_cmsDOCROOT._cmsDOCPATH."/".$cfg['folder']['upload']."/logo.png"))$theme['logo'] = _cmsDOCPATH."/".$cfg['folder']['upload']."/logo.png";
if(file_exists(_cmsDOCROOT._cmsDOCPATH."/".$cfg['folder']['upload']."/logo.gif"))$theme['logo'] = _cmsDOCPATH."/".$cfg['folder']['upload']."/logo.gif";

$theme['header'] = $theme['imgs_folder']."/header.gif";
if(file_exists(_cmsDOCROOT._cmsDOCPATH."/".$cfg['folder']['upload']."/header.jpg"))$theme['header'] = _cmsDOCPATH."/".$cfg['folder']['upload']."/header.jpg";
if(file_exists(_cmsDOCROOT._cmsDOCPATH."/".$cfg['folder']['upload']."/header.png"))$theme['header'] = _cmsDOCPATH."/".$cfg['folder']['upload']."/header.png";
if(file_exists(_cmsDOCROOT._cmsDOCPATH."/".$cfg['folder']['upload']."/header.gif"))$theme['header'] = _cmsDOCPATH."/".$cfg['folder']['upload']."/header.gif";


$link= CMS5readcontent("header-link",NULL,$cUSER['Ref'],$sys['Ref']);
$theme['header-link'] = FieldLangSel("Text_",$link,$languages);

?>