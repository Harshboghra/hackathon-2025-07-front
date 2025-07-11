const DrawioEditorCss = `

.geEditor {
	font-size:10pt!important;
	border:none!important;
	margin:0px!important;
	
}
.geMenubarContainer{
	display:none !important;
}
.geMenubarContainer , .geTabContainer { display:none !important;; } 
.geMenubarContainer .geItem, .geToolbar .geButton, .geToolbar .geLabel, .geSidebarContainer .geTitle {
	cursor:pointer!important;
}
.geSidebarContainer {
    background: #ffffff;
	position:absolute!important;
	width:350px!important;

}
.geBackgroundPage {
	border:1px solid #ddd!important;;
	border-radius: 6px!important;
}
.geSidebarContainer a, .geMenubarContainer a, .geToolbar a {
	color:#000000!important;
	text-decoration:none!important;
}
.geMenubarContainer, .geToolbarContainer, .geDiagramContainer, .geSidebarContainer, .geFooterContainer, .geHsplit, .geVsplit {
	overflow:hidden!important;
	position:absolute!important;
	cursor:default!important;
	overflow: auto!important;
}

.geDiagramContainer {
	background-color:#ffffff!important;
	font-size:0px!important;
	outline:none!important;
	margin-top:40px!important;
	
}
.view > .geDiagramContainer *[pointer-events],
.view > .geDiagramContainer image  {
	pointer-events:none!important;;
}
.geMenubar, .geToolbar {
	white-space:nowrap!important;
	display:block!important;
	width:100%!important;
}
.geMenubarContainer .geItem, .geToolbar .geButton, .geToolbar .geLabel, .geSidebar, .geSidebarContainer .geTitle, .geSidebar .geItem, .mxPopupMenuItem {
	-webkit-transition: all 0.1s ease-in-out!important;
	-moz-transition: all 0.1s ease-in-out!important;
	-o-transition: all 0.1s ease-in-out!important;
	-ms-transition: all 0.1s ease-in-out!important;
	transition: all 0.1s ease-in-out!important;
}
.geSidebar div.empty-bundle{
	margin-top:40px!important;
}
.geHint {
    background-color: #ffffff!important;
        border: 1px solid #ddd!important;
        padding: 4px 16px 4px 16px!important;
        border-radius: 6px!important;
        -webkit-box-shadow: 0px 1px 3px -1px rgba(0,0,0,.1)!important;
        -moz-box-shadow: 0px 1px 3px -1px rgba(0,0,0,.1)!important;
        box-shadow: 0px 1px 3px -1px rgba(0,0,0,.1)!important;
        opacity: 0.8!important;
        filter: alpha(opacity=80)!important;
        font-size: 9pt!important;
    }
    .geHint > i.far{
        width:25px!important;
        height: 25px!important;
        line-height: 25px!important;
        text-align: center!important;
        border-radius: 3px!important;
        cursor: pointer!important;
    }
    .geHint > i.far:first-of-type{
        margin-left:5px!important;
    }
    
    .geHint > i.far:hover{
        background: #f0f0f0!important;
        color:#232224!important;
    }
    .geHint > a > i.far{
        margin-right:5px!important;
        margin-left:5px!important;
        display: inline-block!important;
        color:#4c6fff!important;
        -webkit-transition: color 200ms!important;
        -moz-transition: color 200ms!important;
        -o-transition: color 200ms!important;
    }
    .geHint > a:hover > i.far{
        color:#C9A900!important;
    }
    .geStatusAlert {
        white-space:nowrap!important;
        margin-top:-5px!important;
        font-size:13px!important;
        padding:4px 6px 4px 6px!important;
        background-color:#f2dede!important;
        border:1px solid #ebccd1!important;
        color:#a94442 !important;;
        border-radius:3px!important;
    }
    .geStatusAlert:hover {
        background-color:#f1d8d8!important;
        border-color:#d6b2b8!important;
    }
    .geStatusMessage {
        white-space:nowrap!important;
        margin-top:-5px!important;
        padding:4px 6px 4px 6px!important;
        font-size:13px!important;
        background-image: -webkit-linear-gradient(top,#dff0d8 0,#c8e5bc 100%)!important;
        background-image: -o-linear-gradient(top,#dff0d8 0,#c8e5bc 100%)!important;
        background-image: -webkit-gradient(linear,left top,left bottom,from(#dff0d8),to(#c8e5bc))!important;
        background-image: linear-gradient(to bottom,#dff0d8 0,#c8e5bc 100%)!important;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffdff0d8', endColorstr='#ffc8e5bc', GradientType=0)!important;
        background-repeat: repeat-x!important;
        border:1px solid #b2dba1!important;
        border-radius:3px!important;
        color:#3c763d !important;;
    }
    .geStatusMessage:hover {
        background:#c8e5bc!important;
        border-color:#b2dba1!important;
    }
    .geAlert {
        position:absolute!important;
        white-space:nowrap!important;
        padding:14px!important;
        background-color:#f2dede!important;
        border:1px solid #ebccd1!important;
        color:#a94442!important;
        border-radius:3px!important;
        -webkit-box-shadow: 2px 2px 3px 0px #ddd!important;
        -moz-box-shadow: 2px 2px 3px 0px #ddd!important;
        box-shadow: 2px 2px 3px 0px #ddd!important;
    }
    .geBtn, .mxWindow .geBtn {
        background-image: none!important;
        background-color: #f5f5f5!important;
        border-radius: 2px!important;
        border: 1px solid #d8d8d8!important;
        color: #333!important;
        cursor: default!important;
        font-size: 11px!important;
        font-weight: bold!important;
        height: 29px!important;
        line-height: 27px!important;
        margin: 0 0 0 8px!important;
        min-width: 72px!important;
        outline: 0!important;
        padding: 0 8px!important;
        cursor: pointer!important;
    }
    .geBtn:hover, .geBtn:focus {
        -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,0.1)!important;
        -moz-box-shadow: 0px 1px 1px rgba(0,0,0,0.1)!important;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.1)!important;
        border: 1px solid #c6c6c6!important;
        background-color: #f8f8f8!important;
        background-image: linear-gradient(#f8f8f8 0px,#f1f1f1 100%)!important;
        color: #111!important;
    }
    .geBtn:disabled {
        opacity: .5!important;
    }
    .geBtnUp,.geBtnDown {
        font-family: "Font Awesome 5 Pro"!important;
        width:15px!important;
        height:15px!important;
        font-size: 8px!important;
        text-align: center!important;
        line-height: 15px!important;
        font-weight: 900!important;
    }
    .geStatusAlert {
        white-space:nowrap!important;
        margin-top:-5px!important;
        font-size:13px!important;
        padding:4px 6px 4px 6px!important;
        background-color:#f2dede!important;
        border:1px solid #ebccd1!important;
        color:#a94442 !important;;
        border-radius:3px!important;
    }
    .geStatusAlert:hover {
        background-color:#f1d8d8!important;
        border-color:#d6b2b8!important;
    }
    .geStatusMessage {
        white-space:nowrap!important;
        margin-top:-5px!important;
        padding:4px 6px 4px 6px!important;
        font-size:13px!important;
        background-image: -webkit-linear-gradient(top,#dff0d8 0,#c8e5bc 100%)!important;
        background-image: -o-linear-gradient(top,#dff0d8 0,#c8e5bc 100%)!important;
        background-image: -webkit-gradient(linear,left top,left bottom,from(#dff0d8),to(#c8e5bc))!important;
        background-image: linear-gradient(to bottom,#dff0d8 0,#c8e5bc 100%)!important;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffdff0d8', endColorstr='#ffc8e5bc', GradientType=0)!important;
        background-repeat: repeat-x!important;
        border:1px solid #b2dba1!important;
        border-radius:3px!important;
        color:#3c763d !important;;
    }
    .geStatusMessage:hover {
        background:#c8e5bc!important;
        border-color:#b2dba1!important;
    }
    .geAlert {
        position:absolute!important;
        white-space:nowrap!important;
        padding:14px!important;
        background-color:#f2dede!important;
        border:1px solid #ebccd1!important;
        color:#a94442!important;
        border-radius:3px!important;
        -webkit-box-shadow: 2px 2px 3px 0px #ddd!important;
        -moz-box-shadow: 2px 2px 3px 0px #ddd!important;
        box-shadow: 2px 2px 3px 0px #ddd!important;
    }
    .geBtn, .mxWindow .geBtn {
        background-image: none!important;
        background-color: #f5f5f5!important;
        border-radius: 2px!important;
        border: 1px solid #d8d8d8!important;
        color: #333!important;
        cursor: default!important;
        font-size: 11px!important;
        font-weight: bold!important;
        height: 29px!important;
        line-height: 27px!important;
        margin: 0 0 0 8px!important;
        min-width: 72px!important;
        outline: 0!important;
        padding: 0 8px!important;
        cursor: pointer!important;
    }
    .geBtn:hover, .geBtn:focus {
        -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,0.1)!important;
        -moz-box-shadow: 0px 1px 1px rgba(0,0,0,0.1)!important;
        box-shadow: 0px 1px 1px rgba(0,0,0,0.1)!important;
        border: 1px solid #c6c6c6!important;
        background-color: #f8f8f8!important;
        background-image: linear-gradient(#f8f8f8 0px,#f1f1f1 100%)!important;
        color: #111!important;
    }
    .geBtn:disabled {
        opacity: .5!important;
    }
    .geBtnUp,.geBtnDown {
        font-family: "Font Awesome 5 Pro"!important;
        width:15px!important;
        height:15px!important;
        font-size: 8px!important;
        text-align: center!important;
        line-height: 15px!important;
        font-weight: 900!important;
    }
    
	.geInputContainer{
		width:auto!important;
	}
	.geInputContainer > div{
		display: flex!important;
		width:auto!important;
		text-align: right!important;
	}
	.geInputContainer > div > input{
		position: relative!important;
		width:100%!important;
		-webkit-box-flex: 1!important;
		flex: 1 1 auto!important;
	}
	.geBtnStepper{
		margin-top:-39px!important;
		right:60px!important;
		border:none!important;
	}
	.geAdaptiveAsset{
		display:none!important;
	}
	.geInputContainer > div > .geBtnStepper{
		position: relative!important;;
		flex-shrink: 0!important;
	}
	.geBigButton{
		background-color: #455a64 !important;
	}

	.geSprite-formatpanel, .geSidebarFooter{
		display:none!important;
	}
	.geFormatSection{
		padding:20px!important;
	}
	.geFormatSection , .geFormatSection{
		font-size:medium!important;
		margin-bottom: 20px !important;
	}
.geColorBtn {
	background-color: #fff!important;
	border-radius: 6px!important;
	color: #333!important;
	cursor: default!important;
	margin: 0px!important;
	outline: 0!important;
	padding: 0px!important;
	cursor: pointer!important;
	height: 30px!important;
	width: 50px!important;
	overflow:hidden!important;
	position: relative!important;
	border:1px solid #BBBBBB!important;
	-moz-box-sizing: border-box!important;
	-webkit-box-sizing: border-box!important;
	box-sizing: border-box!important;
}
.geColorBtn:hover {
	border-color: #999!important;
}
.geColorBtn:active {
	border-color: #525252!important;

}
.geColorBtn:disabled {
	opacity: .5!important;
}
.geColorBtn>div:not(.geSprite){
	position: absolute!important;
	left: 2px!important;
	top: 2px!important;
	right: 2px!important;
	bottom: 2px!important;
	border-radius: 3px!important;
}
.gePrimaryBtn, .mxWindow .gePrimaryBtn {
	background-color: #4d90fe!important;
	background-image: linear-gradient(#4d90fe 0px,#4787ed 100%)!important;
	border: 1px solid #3079ed!important;
	color: #fff!important;
}
.gePrimaryBtn:hover, .gePrimaryBtn:focus {
	background-color: #357ae8!important;
	background-image: linear-gradient(#4d90fe 0px,#357ae8 100%)!important;
	border: 1px solid #2f5bb7!important;
	color: #fff!important;
}
.gePrimaryBtn:disabled {
	opacity: .5!important;
}
.geAlertLink {
	color:#843534!important;
	font-weight:700!important;
	text-decoration:none!important;
}
.geMenubarContainer {
	background-color:#ffffff!important;
}
.geMenubar {
	padding:0px 2px 0px 2px!important;
	vertical-align:middle!important;
}
.geMenubarContainer .geItem, .geToolbar .geItem {
	padding:6px 8px 6px 8px!important;
	cursor:default!important;
}
.geMenubarContainer .geItem:hover {
	background:#eeeeee!important;
}
.mxDisabled:hover {
	background:inherit !important;;
}
.geMenubar a.geStatus {
	color:#b3b3b3!important;
	padding-left:6px!important;
	display:inline-block!important;
	cursor:default !important;;
}
.geMenubar a.geStatus:hover {
	background:transparent!important;
}
.geMenubarMenu {
	border:1px solid #d5d5d5 !important;;
}
.geToolbarContainer {
	 height: 70px!important;
	 display:flex!important;
	 justify-content: space-between!important;
	 align-items: center!important;
}

.geToolbarContainer.geToolbar{
	background:#fff!important;
	box-shadow: 0px 1px 2px rgba(90,90,90,0.15)!important;
    -moz-box-shadow: 0px 1px 2px rgba(90,90,90,0.15)!important;
    -webkit-box-shadow: 0px 1px 2px rgba(90,90,90,0.15)!important;
    -moz-box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    box-sizing: border-box!important;
	padding:10px!important;
	height: 60px!important;
	width: auto!important;
}
.geSidebarContainer .geToolbarContainer {
	position: relative!important;
	height: auto!important;
	background:transparent!important;
	border-bottom:none!important;
}
.geSidebarContainer button {
	text-overflow:ellipsis!important;
	overflow:hidden!important;
}
.geToolbar {
	padding-top:20px!important;

}
.geToolbarContainer .geSeparator {
	float:left!important;
	width:1px!important;
	height:40px!important;
	background:#e5e5e5!important;
	margin-left:10px!important;
	margin-right:10px!important;
	margin-top:0px!important;
}
.geToolbarContainer .geButton {
	float:left!important;
	width:40px!important;;
	height:40px!important;
	padding:0px!important;
	cursor:pointer!important;
	color:#232224!important;
}
.geToolbarContainer .geButton:hover {
	background-color: #f0f0f0!important; 
	color:#232224!important;
	-moz-border-radius: 6px!important;
	-webkit-border-radius: 6px!important;
	border-radius: 6px!important;
}
.geToolbarContainer .geButton:active {
	color:#232224!important;
}
.geToolbarContainer .geButton.geColorBtn{
	border:none!important;
	border-radius: 0px!important;
}
.geToolbarContainer .geButton.geColorBtn.active{
	background-color: #f0f0f0!important;
}
div.mxWindow .geButton {
	margin: -1px 2px 2px 2px!important;
	padding: 1px 2px 2px 1px!important;
}
.geToolbarContainer .geLabel {
	float:left!important;
	height: 40px!important;
	min-width: 40px!important;;
	cursor:pointer!important;
	text-align: center!important;
	padding:0px!important;
	line-height: 40px!important;
}
.geToolbarContainer .geLabel:hover {
	background:#f0f0f0!important; 
	-moz-border-radius: 6px!important;
	-webkit-border-radius: 6px!important;
	border-radius: 6px!important;
}
.geToolbarContainer .geLabel:active {
	opacity:1!important;
	filter:none !important;;
}
.geToolbarContainer .mxDisabled{
	color:#999!important;
	opacity: 1!important;;
}
.geToolbarContainer .mxDisabled:hover {
	color:#999!important;
}
div.geToolbarMenu,
div.mxPopupMenu{
	box-shadow: 0 1px 3px rgba(0,0,0,.45)!important;
	-moz-box-shadow: 0 1px 3px rgba(0,0,0,.45)!important;
	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,.45)!important;

	-webkit-border-radius: 6px!important;
	-moz-border-radius: 6px!important;
	border-radius: 6px!important;

	border:none!important;
	background:#fff!important;
	position:absolute!important;
	padding:3px 0px!important;

	-webkit-animation: am-dropdown 200ms ease-in-out!important;
	-moz-animation: am-dropdown 200ms ease-in-out!important;
	-ms-animation: am-dropdown 200ms ease-in-out!important;
	-o-animation: am-dropdown 200ms ease-in-out!important;
	animation: am-dropdown 200ms ease-in-out!important;
	overflow: hidden!important;
}
.geDiagramBackdrop {
	background-color: #f9f9f9!important;
}



.geShapes{
	position: absolute!important;
	left:500px!important;
	top:54px!important;
	width: 600px!important;
	height: 370px!important;
	background:#fff!important;
	border:1px solid #ddd!important;
	overflow: visible!important;
	scrollbar-width: none!important;
	-ms-overflow-style: none!important;
	overflow: -moz-scrollbars-none!important; 
	-moz-box-sizing: border-box!important;
	-webkit-box-sizing: border-box!important;
	box-sizing: border-box!important;
	-moz-border-radius: 6px!important;
	-webkit-border-radius: 6px!important;
	border-radius: 6px!important;
	margin-left: -250px!important;
	z-index: 99!important;
	box-shadow: 0px 1px 2px rgba(90,90,90,0.15)!important;
	-moz-box-shadow: 0px 1px 2px rgba(90,90,90,0.15)!important;
	-webkit-box-shadow: 0px 1px 2px rgba(90,90,90,0.15)!important;
	overflow: hidden!important;
	-webkit-animation: am-dropdown 200ms ease-in-out!important;
    -moz-animation: am-dropdown 200ms ease-in-out!important;
    -ms-animation: am-dropdown 200ms ease-in-out!important;
    -o-animation: am-dropdown 200ms ease-in-out!important;
    animation: am-dropdown 200ms ease-in-out!important;
}
.geShapes:before{
	content:''!important;
	position: absolute!important;
	top: 0px!important;
	left: 50%!important;
	margin-left:-3px!important;
	margin-top:-20px!important;
	border: 10px solid transparent!important;
	border-bottom-color: #FAFAFA!important;
	z-index: 1!important;
	background: transparent!important;
	display: block!important;
}
.geShapes:after{
	
	content:''!important;
	position: absolute!important;
    top: 0px!important;
	left: 50%!important;
	margin-left:-4px!important;
	margin-top:-22px!important;
    border: 11px solid transparent!important;
	border-bottom-color: #bbb!important;
    background: transparent!important;
    display: block!important;
    
}
.geShapes .ge-menu{
	position: absolute!important;
	left:0px!important;
	top:0px!important;
	bottom:0px!important;
	width:149px!important;
	border-right: 1px solid #ddd!important;
	overflow-x: hidden!important;
	overflow-y: auto!important;
}
.geShapes .ge-menu > div{
	color: #525252!important;
	font-weight: 600!important;
	height: 40px!important;
	line-height: 40px!important;
	margin: 0px!important;
	padding-left: 20px!important;
	display: block!important;
	position: relative!important;
	text-overflow: ellipsis!important;
	overflow: hidden!important;
	white-space: nowrap!important;
}
.geShapes .ge-menu > div.active{
	background-color: #4c6fff!important;
	color:#fff!important;
}
.geShapes .ge-content{
	position: absolute!important;
	left: 150px!important;
	top:0px!important;
	bottom: 0px!important;
	right: 0px!important;
	background-color: #fafafa!important;
	padding: 10px!important;
	overflow-x: hidden!important;
	overflow-y: auto!important;
}
.geShapes .ge-searchbar{
	position: absolute!important;
	left:0px!important;
	top:0px!important;
	right:0px!important;
	height: 60px!important;
	padding:12px!important;
	border-bottom: 1px solid #ddd!important;
	box-sizing: border-box!important;
}
.geShapes .ge-searchbar > div{
	position: relative!important;
} 
.geShapes .ge-searchbar input{
	font-size: 12px!important;
    overflow: hidden!important;
    box-sizing: border-box!important;
    border: 1px solid rgb(213, 213, 213)!important;
    border-radius: 4px!important;
    width: 100%!important;
    outline: none!important;
    padding: 6px 20px 6px 6px!important;
}
.geShapes .ge-searchbar .far{
	position: absolute!important;
	right:0px!important;
	height: 35px!important;
	width: 35px!important;
	text-align: center!important;
	line-height: 35px!important;
}
.geShapes::-webkit-scrollbar { 
    display: none!important; 
}
.geShapes .geSearchResult{
	position: absolute!important;
	left:0px!important;
	top:60px!important;
	right:0px!important;
	bottom: 0px!important;
	background: #FAFAFA!important;
	overflow-x: hidden!important;
	overflow-y: auto!important;
	padding: 7px!important;
}

.geSidebarContainer .geTitle {
font-size:9pt!important;	
	border-bottom:1px solid #e5e5e5!important;
	font-weight:normal!important;
	padding:6px 0px 6px 14px!important;
	margin:0px!important;
	cursor:default!important;
	background:#eeeeee!important;
	white-space:nowrap!important;
	overflow:hidden!important;
	text-overflow:ellipsis!important;
	line-height:1.4em!important;
}

.geSidebarContainer .geTitle:hover {
	background:#e5e5e5!important;
}
.geSidebarContainer .geSidebar{
	padding-top:20px!important;
	padding-bottom: 20px!important;
}
.geTitle{
	-moz-box-sizing: border-box!important;
	-webkit-box-sizing: border-box!important;
	box-sizing: border-box!important;
}
.geTitle img {
	opacity:0.5!important;
	_filter:alpha(opacity=50)!important;	
}
.geTitle img:hover {
	opacity:1!important;
	_filter:alpha(opacity=100)!important;
}
.geTitle .geButton {
	border:1px solid transparent!important;
	padding:3px!important;
	border-radius:2px!important;
}
.geTitle .geButton:hover {
	border:1px solid gray!important;
}
.geShapes .geItem {
	display:inline-block!important;
	background-repeat:no-repeat!important;
	background-position:50% 50%!important;
	border:1px solid transparent!important;
	border-radius:2px!important;
	cursor: move!important;
	margin-bottom: 7px!important;
	-moz-box-sizing: border-box!important;
	-webkit-box-sizing: border-box!important;
	box-sizing: border-box!important;
    text-align: center!important;
    position: relative!important;
    width:100px!important;
    height: 110px!important;
    margin:0px!important;
    padding:0px!important;
}

.geShapes .geItem:before {
	content:''!important;
	position: absolute!important;
	left:15px!important;
	top:0px!important;
	width: 66px!important;
    height: 66px!important;
	background-color: #fff!important;
	border:1px solid #ddd!important;
	-moz-border-radius: 6px!important;
	-webkit-border-radius: 6px!important;
	border-radius: 6px!important;

}
.geShapes .geItem span{
	display: inline-block!important;
	max-width: 90px!important;
	font-size: 11px!important;
	margin-top:15px!important;
	padding:1px 3px!important;
	border-radius: 3px!important;
	font-weight: 600!important;
		
}
.geShapes .geItem .fa-times{
	position: absolute!important;
	z-index: 99!important;
	color: #999!important;
	width: 20px!important;
	height: 20px!important;
	right: 9px!important;
	top: -5px!important;
	text-align: center!important;
	line-height: 21px!important;
	background: #BB563B!important;
	color: #fff!important;
	border-radius: 59px!important;
	display: none!important;
	cursor: pointer!important;
}
.geShapes .geItem svg{
	left:21px!important;;
	top:6px!important;;
    text-align: left!important;
}
.geShapes .geItem:hover:before {
	border:1px solid #4c6fff!important;;
}
.geShapes .geItem:hover > span{
	background: #4c6fff!important;
	color:#fff!important;
}
.geShapes .geItem:hover .fa-times{
	display: block!important;
}
.geShapes .geItem[am-loading] .fa-times{
	display: none!important;;
}
.geItem {
	vertical-align: top!important;
	display: inline-block!important;
}
.geSidebarTooltip {
	position:absolute!important;
	background:white!important;
	overflow:hidden!important;
	box-shadow: 0 1px 3px rgba(0,0,0,.45)!important;
	-moz-box-shadow: 0 1px 3px rgba(0,0,0,.45)!important;
	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,.45)!important;
	-webkit-border-radius: 6px!important;
	-moz-border-radius: 6px!important;
	border-radius: 6px!important;
}
.geSidebarTooltip .geSidebarTooltipTitle{
	text-align: center!important;
	width: 100%!important;
	line-height: 20px!important;
	padding: 5px 0px!important;
	font-weight: 600!important;
	font-size: 13px!important;
	color: #232224!important;
	border-top:1px solid #ddd!important;
}
.geFooterContainer {
	background:#e5e5e5!important;
	border-top:1px solid #c0c0c0!important;
}
.geFooterContainer a {
	display:inline-block!important;
	box-sizing:border-box!important;
	width:100%!important;
	white-space:nowrap!important;
	font-size:14px!important;
	color:#235695!important;
	font-weight:bold!important;
	text-decoration:none!important;
}
.geFooterContainer table {
	border-collapse:collapse!important;
	margin:0 auto!important;
}
.geFooterContainer td {
	border-left:1px solid #c0c0c0!important;
	border-right:1px solid #c0c0c0!important;
}
.geFooterContainer td:hover {
	background-color: #b3b3b3!important;
}
.geHsplit {
	cursor:col-resize!important;
	background-color:#e5e5e5!important;
	background-image:url(data:image/png!important;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHBAMAAADdS/HjAAAAGFBMVEUzMzP///9tbW1QUFCKiopBQUF8fHxfX1/IXlmXAAAAHUlEQVQImWMQEGAQFWUQFmYQF2cQEmIQE2MQEQEACy4BF67hpEwAAAAASUVORK5CYII=)!important;
	_background-image:url('thumb_vertical.png')!important;
	background-repeat:no-repeat!important;
	background-position:center center!important;
	left:350px! important;
	top:102px !important;
	
	
}
.geVsplit {
	font-size:1pt!important;
	cursor:row-resize!important;
	background-color:#e5e5e5!important;
	background-image:url(data:image/png!important;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAEBAMAAACw6DhOAAAAGFBMVEUzMzP///9tbW1QUFCKiopBQUF8fHxfX1/IXlmXAAAAFElEQVQImWNgNVdzYBAUFBRggLMAEzYBy29kEPgAAAAASUVORK5CYII=)!important;
	_background-image:url('thumb_horz.png')!important;
	background-repeat:no-repeat!important;
	background-position:center center!important;
}
.geHsplit:hover, .geVsplit:hover {
	background-color:#d5d5d5!important;
}
.geToolbar .doc-name{
	display: inline-block!important;
	float: left!important;
	padding:0px 5px!important;
	position: relative!important;
    height: 40px!important;
    cursor: pointer!important;
}
.geToolbar .doc-name:hover:before{
	content: ""!important;
	display: block!important;
	position: absolute!important;
	left: -5px!important;
	top: -5px!important;
	right: -5px!important;
	bottom: -5px!important;
	z-index: 0!important;;
	border: 2px solid #4c6fff!important;
	background: rgba(0,0,255,0.02)!important;
	border-radius: 4px!important;
	-webkit-border-radius: 4px!important;
	-moz-border-radius: 4px!important;
}.geVariables > div{
	margin: 0px 0px!important;
	padding: 10px 20px!important;
	font-size: 13px!important;
	width: 100%!important;
	border-bottom: 1px solid #ddd!important;
	cursor: pointer!important;
	font-weight: 600!important;
	-moz-box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    box-sizing: border-box!important;
    position: relative!important;
}
.geVariables > div:last-of-type{
	border-bottom: none!important;
}
.geVariables > div:hover{
	background-color: #4c6fff!important; 
	color:#fff!important;
	border-bottom: 1px solid #4c6fff!important;
}
.geVariables > div:hover:before{
	content:''!important;
	position: absolute!important;
	left: 0px!important;
	right: 0px!important;
	top: -1px!important;
	height: 1px!important;
	background: #4c6fff!important;
}
.gePanel select,
.gePanel input{
	height: 30px!important;
	padding-top:0px!important;;
	padding-bottom:0px!important;;
	line-height: 30px!important;
	min-height: 30px!important;
	margin:0px!important;
	border-radius: 6px!important;
}
.gePanel .button{
	background: #fff!important;
	border:1px solid #ddd!important;
	color:#3B3F44!important;
}
.gePanel .button:hover,.gePanel .button:active{
	border-color:#4c6fff!important;
	color:#4c6fff!important;
	background: #fff!important;
}

.gePanel .button.red:hover,.gePanel .button.red:active{
	border-color: #de0303!important;
	color:#de0303!important;
}
.geToolbarContainer .geLabel.geStyledButton,
.geStyledButton{
	display: inline-block!important;
	margin:5px 0px!important;
	height: 30px!important;
	border:1px solid #bbb!important;
	border-radius: 4px!important;
	line-height: 30px!important;
	text-align: left!important;
	background: #fff url(/theme/icon.php?p=cache&src=system-arrow-down.png&w=11&noborder=true&color=acacac) right+10px center no-repeat!important;
	background-size: 11px!important;
    padding: 0px 30px 0px 7px!important;
    -moz-box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    box-sizing: border-box!important;
}
.geStyledButton .geIcon{
	margin-top:14px!important;;
}
.geButton.geStyledButton>.geSprite{
	margin:0px!important;;
	padding:0px!important;;
	height: 28px!important;;
	line-height: 28px!important;;
}
.gePanel{
	padding:20px!important;
	border-bottom: 1px solid #ddd!important;
	position: relative!important;
}
`;

export default DrawioEditorCss;
