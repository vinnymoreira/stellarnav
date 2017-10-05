# StellarNav.js
jQuery responsive multi-level dropdown menu designed to do most of the heavy CSS work for you.

<a href="http://vinnymoreira.com/stellarnav-js-demo/">Click here</a> to see a live demo.

## Installation

### CSS
Include FontAwesome for the menu icons and the StellarNav stylesheet.
```html
<link rel="stylesheet" type="text/css" media="all" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" media="all" href="css/stellarnav.min.css">
```
### HTML
Add a `stellarnav` class to your menu div.
```html
<div class="stellarnav">
     <ul>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
     </ul>
</div>
```

### Javascript
Include `stellarnav.min.js` and call `stellarNav()`.
```javascript
<script type="text/javascript" src="js/stellarnav.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		jQuery('.stellarnav').stellarNav();
	});
</script>
```
## Options

Here's a list of available settings.

```javascript
jQuery('.stellarnav').stellarNav({
	theme     : 'plain',
	breakpoint: 768,
	phoneBtn: false,
	locationBtn: false,
	sticky     : false,
	position: 'static',
	showArrows: true,
	closeBtn     : false,
	scrollbarFix: false
});	
```

Attribute			| Type				| Default		| Description
---						| ---					| ---				| ---
`theme`		| *String*		| `plain`		| Adds default color to nav. [plain, light, dark]
`breakpoint`	| *Integer*		| `768`		| Number in pixels to determine when the nav should turn mobile friendly.
`phoneBtn`	| *String*		| `false`		| Adds a click-to-call phone link to the top of menu - i.e.: "18009084500".
`locationBtn`	| *String*		| `false`		| Adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/".
`sticky`	| *Boolean*		| `false`		| Makes nav sticky on scroll.
`position`	| *String*		| `static`		| [static, top, left, right] - When set to 'top', this forces the mobile nav to be placed absolutely on the very top of page. When set to 'left' or 'right', mobile nav fades in/out from left or right, accordingly.  
`showArrows`	| *Boolean*		| `true`		| Shows dropdown arrows next to the items that have sub menus.
`closeBtn`	| *Boolean*		| `false`		| Adds a close button to the end of nav.
`scrollbarFix`	| *Boolean*		| `false`		| Fixes horizontal scrollbar issue on very long navs.

## Extra

For long dropdown menus towards the last navigation items, you may use the class `drop-left` to the list item so that the dropdown drops leftward. This prevents menu from breaking the grid and getting a horizontal scrollbar.

```html
<div class="stellarnav">
     <ul>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li><a href="#">Item</a></li>
        <li class="drop-left"><a href="#">Last Dropdown Item</a>
        	<ul>
        		<li><a href="#">Item</a></li>
        		<li><a href="#">Item</a>
        			<ul>
        				<li><a href="#">Drop left menu item</a></li>
        				<li><a href="#">Drop left menu item</a></li>
        			</ul>
        		</li>
        	</ul>
        </li>
     </ul>
</div>
```

If this is not an option and you are still getting a scrollbar, you may also set the `scrollbarFix` option to `true`. 
