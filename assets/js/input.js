(function($) {
  /**
   *  initialize_field
   *
   *  This function will initialize the $field.
   *
   *  @date	30/11/17
   *  @since	5.6.5
   *
   *  @param	n/a
   *  @return	n/a
   */

  function initialize_field($field) {
    console.log($field);

    // Get SVG and Input
    const svgWrapper = document.querySelector('.svg_element_selector_file');
    const svgElement = svgWrapper.querySelector('svg');
    const svgInput = document.querySelector('.svg_element_selector_input');

    // Get field color settings
    const { colorSelected } = svgWrapper.dataset;
    const { colorDefault } = svgWrapper.dataset;

    // Get field value
    const fieldValue = svgInput.value;

    // Remove fill attribute from items for comparisons
    const fillAttr = new RegExp(/ fill=".*?"/);

    if (svgElement && svgInput) {
      // Get all elements inside
      const svgElementPaths = svgElement.querySelectorAll('circle, path');

      if (svgElementPaths) {
        svgElementPaths.forEach(function(path) {
          // Set the initial colour of each element
          if (path.outerHTML.replace(fillAttr, '') === fieldValue) {
            path.setAttribute('fill', colorSelected);
          } else {
            path.setAttribute('fill', colorDefault);
          }

          path.addEventListener('click', function(e) {
            // Don't bubble up through the SVG
            e.stopPropagation();

            // Get this field, without the fill attribute
            const clickedNoFill = e.target.outerHTML.replace(fillAttr, '');

            // Highlight this path
            // And de-colour the rest
            svgElementPaths.forEach(function(pathOnClick) {
              const pathOnClickNoFill = pathOnClick.outerHTML.replace(
                fillAttr,
                ''
              );

              if (pathOnClickNoFill === clickedNoFill) {
                pathOnClick.setAttribute('fill', colorSelected);
              } else {
                pathOnClick.setAttribute('fill', colorDefault);
              }
            });

            // Set this path as the field value, without the fill attribute
            svgInput.value = clickedNoFill;
          });
        });
      }
    } else {
      console.error('No uploaded image or input field');
    }
  }

  if (typeof acf.add_action !== 'undefined') {
    /*
     *  ready & append (ACF5)
     *
     *  These two events are called when a field element is ready for initizliation.
     *  - ready: on page load similar to $(document).ready()
     *  - append: on new DOM elements appended via repeater field or other AJAX calls
     *
     *  @param	n/a
     *  @return	n/a
     */

    acf.add_action('ready_field/type=svg_element_selector', initialize_field);
    acf.add_action('append_field/type=svg_element_selector', initialize_field);
  } else {
    /*
     *  acf/setup_fields (ACF4)
     *
     *  These single event is called when a field element is ready for initizliation.
     *
     *  @param	event		an event object. This can be ignored
     *  @param	element		An element which contains the new HTML
     *  @return	n/a
     */

    $(document).on('acf/setup_fields', function(e, postbox) {
      // find all relevant fields
      $(postbox)
        .find('.field[data-field_type="FIELD_NAME"]')
        .each(function() {
          // initialize
          initialize_field($(this));
        });
    });
  }
})(jQuery);
