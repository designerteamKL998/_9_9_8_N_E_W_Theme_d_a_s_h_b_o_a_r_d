<?php
include(_cmsDOCROOT.$cfg['folder']['theme']."/".$cfg['theme']."/theme.config.inc.php");


htmlHeadJS($cfg['folder']['js']."/jquery.latest.min.js");
htmlHeadJS($cfg['folder']['js']."/jquery.url.js");
htmlHeadCSS($theme['imgs_folder']."/../style.css");

htmlHeadCSS($cfg['folder']['js'].'/bootstrap/dist/css/bootstrap.min.css');
htmlHeadJS($cfg['folder']['js'].'/bootstrap/dist/js/bootstrap.min.js');

$theme['html'] = "
<body>
    <div id='body-container'>
        <div class='divHeader'>
            <div class='header-wrapper'>
                <div class='header-left'>
                    [FUNC:readcontent]page=header-left;[/FUNC]
                </div>
                <div class='header-center'>
                    <div class='header-menu'>
                        <div id='divMenu' class='modal modal-menu' tabindex='-1' role='dialog' aria-hidden='true'>
                            <div id='menuContainer' class='modal-dialog'>
                                [FUNC:readcontent]page=menu-top;[/FUNC]
                                ".$theme['menu']."
                                [FUNC:readcontent]page=menu-bottom;[/FUNC]
                            </div>
                        </div>
                    </div>

                </div>
                <div class='header-right'>
                    [FUNC:readcontent]page=header-right;[/FUNC]
                </div>
            </div>
        </div>
        <div id='divBody'>
            ".$theme['body']."
        </div>
        <div id='divFooter' class='footer'>
            [FUNC:readcontent]page=footer;[/FUNC]
        </div>
    </div>
</body>";

$theme['pop_html']="
<body>
<div id='title'>".$theme['title']."</div>
<div id='content'>".$theme['body']."</div>
</body>";


$theme['page404_html']="
<body id='page404'>
<div id='frame-page404'>
<div id='frame-page404-container'>
<div id='title'>".$theme['title']."</div>
<div id='content'>".$theme['body']."</div>
</div>
</div>
</body>";


if(isset($Xcfg['theme_layout'])===true) $theme['html']=$theme['pop_html'];

?>