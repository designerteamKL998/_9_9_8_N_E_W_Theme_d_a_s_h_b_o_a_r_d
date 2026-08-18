<?php

$theme['imgs_folder'] = $cfg['folder']['theme']."/".$cfg['theme']."/imgs";
$theme['js_folder'] = $cfg['folder']['theme']."/".$cfg['theme']."/js";
$theme['titles_folder'] = $cfg['folder']['theme']."/".$cfg['theme']."/titles";

if(!empty($SITE['MEMID'])) $theme['imgs_folder'] = _cmsHTTP."/".$theme['imgs_folder'];

$cfg['icon']['activate'] 	= "<img src='".$theme['imgs_folder']."/activate.gif' border='0'>";
$cfg['icon']['unactivate']	= "<img src='".$theme['imgs_folder']."/unactivate.gif' border='0'>";
$cfg['icon']['delete'] 	= "<img src='".$theme['imgs_folder']."/delete.gif' border='0'>";
$cfg['icon']['details'] 	= "<img src='".$theme['imgs_folder']."/details.gif' border='0'>";
$cfg['icon']['edit'] 	= "<img src='".$theme['imgs_folder']."/edit.gif' border='0'>";
$cfg['icon']['image_not_found'] = "<img src='".$theme['imgs_folder']."/imgerr.gif' border='0'>";
$cfg['icon']['sendsms']			= "[send]";
$cfg['icon']['sendsms_bulk']			= "<img src='".$theme['imgs_folder']."/btn_smsbulk.gif' border='0'>";
$cfg['icon']['sendsms_push']			= "<img src='".$theme['imgs_folder']."/btn_smspush.gif' border='0'>";
$cfg['icon']['memcfg']			= "[cfg]";
$cfg['icon']['adsposted']		= "[A]";
$cfg['icon']['summary']			= "[X]";
$cfg['icon']['clsads']			= "[C]";
$cfg['icon']['email']			= "[E]";
$cfg['icon']['themereg']		= "[T]";
$cfg['icon']['modreg']			= "[M]";
$cfg['icon']['clsadscat']		= "[S]";
$cfg['icon']['smslogs']		= "[L]";
$cfg['icon']['credittopup']		= "[U]";

$cfg['icon']['bullect01']		= "<img src='".$theme['imgs_folder']."/bullet.gif' border='0'>";
$cfg['icon']['bullect02']		= "[o]";
$cfg['icon']['bullect03']		= "[o]";
$cfg['icon']['bullect04']		= "[o]";

$cfg['icon']['theme_button_level1'] = "<li>";
$cfg['icon']['theme_button_level2'] = "-";
$cfg['image']['no_image'] = "<img src='".$theme['imgs_folder']."/image_not_found.jpg' border='0' width='150'>";


function on_themeframe($pattern="1", $width="100%", $class="tbl001", $header="",$height=""){
	global $cfg;
	global $theme;
	if($height!="") $height=" height='$height'";

switch($pattern){
  case '1':
  	if($header!=""){
  	$header = "<table width='100%' cellpadding='4' cellspacing='0' border='0' >
															<tr>
																<td style='background-image: url(".$theme['imgs_folder']."/tbl001_header_bg.jpg); background-position: left; background-repeat: no-repeat;'><b>$header</b></td>
																<td width='33' align='right'><img src='".$theme['imgs_folder']."/tbl001_header.jpg'></td>
															</tr>
														</table>";
		}
  	$themeframe = "			<table width='$width' $height cellpadding='0' cellspacing='0' bgcolor='#ffffff' >
												<tr>
													<td width='3'><img src='".$theme['imgs_folder']."/tbl001_top_left.jpg'></td>
													<td background='".$theme['imgs_folder']."/tbl001_top_bg.jpg'><img src='".$theme['imgs_folder']."/tbl001_top_bg.jpg'></td>
													<td width='4'><img src='".$theme['imgs_folder']."/tbl001_top_right.jpg'></td>
												</tr>
												<tr>
													<td background='".$theme['imgs_folder']."/tbl001_left.jpg'></td>
													<td>$header
														
														<table width='100%' cellpadding='4' cellspacing='0' border='0'>
															<tr>
																<td>";
  	break;
  case '2':
  	$themeframe = "<table width='$width' border='1'  bgcolor='#ffffff'>
  		<tr><td bgcolor='#0000ff'><b><font color='#ffffff'># $header</font></b></td></tr>
  		<tr><td>";
  	break;
}
return $themeframe;	
}

function off_themeframe($pattern="1", $class="tbl001", $footer=NULL, $footer_link=NULL){
	global $cfg;
	global $theme;
switch($pattern){
  case '1':
  	$themeframe = "</td>
															</tr>
															<tr>
														</table>
													</td>
													<td background='".$theme['imgs_folder']."/tbl001_right.jpg'></td>
												</tr>
													<td><img src='".$theme['imgs_folder']."/tbl001_bottom_left.jpg'></td>
													<td background='".$theme['imgs_folder']."/tbl001_bottom_bg.jpg'><img src='".$theme['imgs_folder']."/tbl001_bottom_bg.jpg'></td>
													<td><img src='".$theme['imgs_folder']."/tbl001_bottom_right.jpg'></td>
											</table>";
  	break;
  case '2':
  	$themeframe = "</td></tr></table>";
  	break;
}
return $themeframe;
}

?>