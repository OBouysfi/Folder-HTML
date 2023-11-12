$(document).ready(function () {
    // Initialize select2 component
    $('#select2-mission').select2({
        placeholder: "Compétences utilisées",
        allowClear: true
    });
    // Initialize flatpickr component
    $("#close-date-Input").flatpickr({
        enableTime: false,
        minDate: "today",
        altInput: true,
    });
    //Fonction pour Mettre à jour l'étiquette correspondante
    initSlider('slider-step', 'niveauTechnique', arbitraryValuesForSlider.indexOf('Intermédiaire'));
    initSlider('slider-step1', 'niveauPersonnelles', arbitraryValuesForSlider.indexOf('Intermédiaire'));
    initSlider('niveau-technique', 'niveauTechniqueLabel', arbitraryValuesForSlider.indexOf('Expert'), true);
    initSlider('niveau-personnelles', 'niveauPersonnelles', arbitraryValuesForSlider.indexOf('Expert'), true);
    initSlider('niveau-technique1', 'niveauTechnique', arbitraryValuesForSlider.indexOf('Intermédiaire'));
    initSlider('niveau-personnelles1', 'niveauPersonnelles', arbitraryValuesForSlider.indexOf('Intermédiaire'));
    initSlider('personal-level', 'personalLevel', arbitraryValuesForSlider.indexOf('Intermédiaire'));
    initSlider('niveau-langue', 'niveauTechniqueLabel', arbitraryValuesForSlider.indexOf('Expert'), true);
    initSlider('slider-langue', 'niveauLangue', arbitraryValuesForSlider.indexOf('Intermédiaire'));
});
// Slider configurations pour tout sliders
var arbitraryValuesForSlider = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

function initSlider(sliderId, labelId, startIndex, isDisabled) {
    var format = {
        to: function (value) {
            return arbitraryValuesForSlider[Math.round(value)];
        },
        from: function (value) {
            return arbitraryValuesForSlider.indexOf(value);
        }
    };
    var sliderOptions = {
        connect: 'lower',
        range: {min: 0, max: arbitraryValuesForSlider.length - 1},
        step: 1,
        tooltips: true,
        format: format,
        pips: {mode: 'steps', format: format, density: 50}
    };
    var sliderElement = document.getElementById(sliderId);
    if (sliderElement != null) {
        noUiSlider.create(sliderElement, Object.assign({}, sliderOptions, {
            start: startIndex
        }));
        if (isDisabled) {
            sliderElement.setAttribute('disabled', true);
        }
        sliderElement.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];
            var labelElement = document.getElementById(labelId);
            if (labelElement) {
                labelElement.innerHTML = value;
            }
            let levelId = 0;
            let level = arbitraryValuesForSlider.indexOf(value);
            if (level == 0) {
                levelId = 1;
            } else if (level == 1) {
                levelId = 2;
            } else if (level == 2) {
                levelId = 3;
            } else if (level == 3) {
                levelId = 4;
            }
            $('#' + sliderId).prev('div').prev('input[type=hidden]').val(levelId);
        });
    }
}

// the selector will match all input controls of type :checkbox
// and attach a click event handler
$("input:checkbox").on('click', function () {
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

});

//----------------- Page liste profile CVThèque-----------------------//
function toggleCheckboxes(source) {
    let checkboxes = document.querySelectorAll('.row-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.checked;
    }
}

//----------------------- Code img pour l'ajout ici --------------------//
let btnAdd = document.getElementById('btnAjouter');
if (btnAdd != null) {
    btnAdd.addEventListener('click', function (event) {
        event.preventDefault();
        window.location = '/backoffice/profiles/create';
    });
}
//-----------------------  Code img pour Favori ici -------------------//
let btnFavorite = document.getElementById('btnFavori');
if (btnFavorite != null) {
    btnFavorite.addEventListener('click', function (event) {
        event.preventDefault();
        let icone = event.target;
        // Vérifier si l'élément est déjà favorisé
        if (icone.src.includes('favorie.svg')) {
            icone.src = '../assets/images/cvtheque/favorie_active.svg'; // Chemin vers l'icône active
        } else {
            icone.src = '../assets/images/cvtheque/favorie.svg';
        }
    });
}
//--------------------Télécharge table au format XLS------------------------//
let btnSend = document.getElementById('btnEnvoyer');
if (btnSend != null) {
    btnSend.addEventListener('click', function (event) {
        event.preventDefault();

        // Sélectionnez votre table
        var table = document.getElementById('datatables-tab');
        var wb = XLSX.utils.table_to_book(table, {sheet: "Sheet 1"});

        // Générez le fichier XLS
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});

        // Déclenchez le téléchargement
        saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), 'CVThèqueHumanJobs.xlsx');
    });
}

// Cette fonction est nécessaire pour traiter le type de données correctement
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

//--------------------pour Voir Statistique ---------------------------//
let btnView = document.getElementById('btnVoir');
if (btnView != null) {
    btnView.addEventListener('click', function (event) {
        event.preventDefault();
        window.location = 'statistique.html';
    });
}
//---------------- js pour Imprimer ------------------------//
let btnPrint = document.getElementById('btnImprimer');
if (btnPrint != null) {
    btnPrint.addEventListener('click', function (event) {
        event.preventDefault();
        window.print();
    });
}
// ---------- Page Affectation  ( Détails profile ) -------------------//
$('.marker').hover(function () {
    $('#infoLabel').text($(this).data('info'));
}, function () {
    $('#infoLabel').text('');
});
$(document).ready(function () {
    $('#affectationtable').DataTable();
});
//----------------- End js page Affectation ----------------------------//
// JS for Page Creation Offres
function updateProgressBar(stepNumber) {
    var progressBar = document.querySelector(".progress-bar");
    var widthPercentage;
    // Deactivate all the step pills
    var allPills = document.querySelectorAll('.progress-bar-tab .nav-link');
    allPills.forEach(function (pill) {
        pill.classList.remove('active');
    });
    // Activate the current step pill
    var currentPill = document.querySelector('.progress-bar-tab .nav-link[data-progressbar="custom-progress-bar-' + stepNumber + '"]');
    if (currentPill) {
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
        case 4:
            widthPercentage = "100%";
            break;
        default:
            widthPercentage = "0%";
            break;
    }
    progressBar.style.width = widthPercentage;
}
