

$(document).ready(function() {
  $selectElement = $('#select2-mission').select2({
      placeholder: "Compétences utilisées",
      allowClear: true
  });

  var arbitraryValuesSlider = document.getElementById('slider-step');
  var arbitraryValuesForSlider = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

  var format = {
      to: function(value) {
          return arbitraryValuesForSlider[Math.round(value)];
      },
      from: function (value) {
          return arbitraryValuesForSlider.indexOf(value);
      }
  };

  noUiSlider.create(arbitraryValuesSlider, {
      // start values are parsed by 'format'
      start: 'Intermédiaire',
      connect: 'lower',
      range: { min: 0, max: arbitraryValuesForSlider.length - 1 },
      step: 1,
      tooltips: true,
      format: format,
      pips: { mode: 'steps', format: format, density: 50 },
  });



  var valuesSlider = document.getElementById('slider-step1');
  var valuesForSlider = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert']; // 16 values

  var format = {
      to: function(value) {
          return valuesForSlider[Math.round(value)];
      },
      from: function (value) {
          return valuesForSlider.indexOf(Number(value));
      }
  };

  /*noUiSlider.create(valuesSlider, {
      connect: true,
      start: ['Débutant'],
      // A linear range from 0 to 15 (16 values)
      range: { min: 0, max: valuesForSlider.length - 1 },
      // steps of 1
      step: 1,
      tooltips: true,
      format: format,
      pips: { mode: 'steps', format: format },
  });*/
  
  $("#close-date-Input").flatpickr({
      enableTime: false,
      minDate: "today",
      //time_24hr: true,
      altInput: true,
      //defaultDate: "2018-04-24 16:57"
  });

});
// the selector will match all input controls of type :checkbox
// and attach a click event handler
$("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }

    alert();
});
// Page Affectation  ( Détails profile )
$('.marker').hover(function() {
    $('#infoLabel').text($(this).data('info'));
  }, function() {
    $('#infoLabel').text('');
  });
  $(document).ready(function() {
    $('#affectationtable').DataTable();
});

// JS for Page Creation Offres 
function updateProgressBar(stepNumber) {
  var progressBar = document.querySelector(".progress-bar");
  var widthPercentage;

  // Deactivate all the step pills
  var allPills = document.querySelectorAll('.progress-bar-tab .nav-link');
  allPills.forEach(function(pill) {
      pill.classList.remove('active'); // Assuming 'active' is the class that highlights the pill
  });

  // Activate the current step pill
  // Make sure the value of data-progressbar in HTML matches 'custom-progress-bar-' + stepNumber
  var currentPill = document.querySelector('.progress-bar-tab .nav-link[data-progressbar="custom-progress-bar-' + stepNumber + '"]');
  if(currentPill) {
      currentPill.classList.add('active');
  } else {
      console.error('No pill found for step number:', stepNumber);
  }

  switch (stepNumber) {
      case 1:
          widthPercentage = "0%";
          break;
      case 2:
          widthPercentage = "33.33%";
          break;
      case 3:
          widthPercentage = "66.66%";
          break;
      case 4: // Ensure there is a step 4 if you are including this
          widthPercentage = "100%";
          break;
      default:
          widthPercentage = "0%";
          break;
  }
  progressBar.style.width = widthPercentage;
}


$( function() {
  $( "#start-date, #end-date" ).datepicker({
      showOtherMonths: true,
      selectOtherMonths: true
  });
});
