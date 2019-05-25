# ACF SVG Element Selector Field

Welcome to the Advanced Custom Fields SVG Element Selector repository on Github.

Define a global SVG file and allow posts to select an individual element.

## Why?

Say you have 100 accommodation properties to be shown on one SVG map. This field would allow you to upload one SVG file and assign an individual part of that SVG to each property.

It is probably of limited use, but I needed it. And maybe you do to.

## acf-svg-element-selector

First of all you'll need to enable SVG support for the media library, using a plugin such as (https://en-gb.wordpress.org/plugins/svg-support/)[SVG Support]. And to ensure an XML tag is at the start of your SVG file (see instructions on that plugin page).

1. Create a new SVG Element Selector field
2. Upload an SVG to the Media Library
3. Set default and selected fill colors

When the field is in use, all the fill colours will be stripped from the SVG. Click a part of the SVG to set the active fill color.

The fill color will be set using JavaScript in the editor. It is up to you to modify the actual SVG output on the front end.
