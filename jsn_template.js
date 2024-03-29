/**
* @author    JoomlaShine.com http://www.joomlashine.com
* @copyright Copyright (C) 2008 - 2011 JoomlaShine.com. All rights reserved.
* @license   GNU/GPL v2 http://www.gnu.org/licenses/gpl-2.0.html
*/

	var JSNTemplate = {
		_templateParams:		{},

		initOnDomReady: function()
		{
			// Setup HTML code for typography
			JSNUtils.createGridLayout("DIV", "grid-layout", "grid-col", "grid-lastcol");
			JSNUtils.createExtList("list-number-", "span", "jsn-listbullet", true);
			JSNUtils.createExtList("list-icon", "span", "jsn-listbullet", false);

			// Setup Go to top link settings
			if (_templateParams.enableGotopLink) {
				JSNUtils.setToTopLinkCenter(_templateParams.enableRTL, false);
				JSNUtils.setSmoothScroll(false);
				JSNUtils.setFadeScroll(false);
			}

			// General layout setup
			JSNUtils.setupLayout();

			// Setup mobile menu
			JSNUtils.setMobileMenu("menu-mainmenu", _templateParams.mobileMenuEffect);

			if (JSNUtils.isDesktopViewOnMobile(_templateParams)) {
				// Setup mobile sticky
				if (_templateParams.enableMobileMenuSticky && JSNUtils.checkMobile()) {
					JSNUtils.setMobileSticky();
				}
			}
			else {
				JSNUtils.initMenuForDesktopView();
			}

			// Setup module dropdown on mobile
			JSNUtils.setDropdownModuleEvents();

			// Setup mobile sitetool
			JSNUtils.setMobileSitetool();

			// Stick main menu to top
			if (_templateParams.enableDesktopMenuSticky) {
				JSNUtils.setDesktopSticky('jsn-header');
			}

			// Add class to 'display-dropdown' module according to mainmenu class suffixes
			JSNTemplate.setModuleDropdown();

			// Setup event to update megamenu submenu position
		    try {
			JSNMegamenu.setMegamenuSubmenuPosition(_templateParams.enableRTL);
			JSNMegamenu.setMegamenuSubmenuStyle();
		    }
		    catch(err) {
		    }
		},

		setModuleDropdown: function()
		{
			if ($$('ul.menu-mainmenu') == undefined) return false;

			var ddMenu = $$('ul.menu-mainmenu').getProperty('class')[0].replace(/^\s+|\s+$/g, '').split(' ');
			var count =  ddMenu.length;
			if(count)
			{
				for(var i = 0 ; i < count; i++)
				{
					if (ddMenu[i] == 'menu-richmenu')
					{
						$$('#jsn-menu div.jsn-modulecontainer.display-dropdown').addClass('richmenu');
						$$('#jsn-menu div.jsn-modulecontainer.display-inline').addClass('richmenu');
					}
					if (ddMenu[i] == 'menu-iconmenu')
					{
						$$('#jsn-menu div.jsn-modulecontainer.display-dropdown').addClass('iconmenu');
						$$('#jsn-menu div.jsn-modulecontainer.display-inline').addClass('iconmenu');
					}
				}
			}
		},

		initOnLoad: function()
		{
			// Setup event to update submenu position
			JSNUtils.setSubmenuPosition(_templateParams.enableRTL);

			// Stick positions layout setup
			JSNUtils.setVerticalPosition("jsn-pos-stick-leftmiddle", 'middle');
			JSNUtils.setVerticalPosition("jsn-pos-stick-rightmiddle", 'middle');
		},

		initTemplate: function(templateParams)
		{
			// Store template parameters
			_templateParams = templateParams;

			// Init template on "domready" event
			window.addEvent('domready', JSNTemplate.initOnDomReady);
			window.addEvent('load', JSNTemplate.initOnLoad);
		}
	}; // must have ; to prevent syntax error when compress
