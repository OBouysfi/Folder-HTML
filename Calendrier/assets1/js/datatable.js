// Page liste profile CVThèque
$(document).ready(function() {
    $('#datatables-tab').DataTable({
        "language": {
            "info": "Affichage de _START_ à _END_ résultats sur _TOTAL_",
            "infoEmpty": "Affichage de 0 à 0 sur 0 résultats",
            "infoFiltered": "(filtré de _MAX_ résultats au total)"
        }
    });
});

function toggleCheckboxes(source) {
    let checkboxes = document.querySelectorAll('.row-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.checked;
    }
}
$(document).ready(function () {
    $('#datatables-tab').DataTable();
});
// Votre code pour l'ajout ici
document.getElementById('btnAjouter').addEventListener('click', function (event) {
    event.preventDefault();
    window.location = '/backoffice/profiles/create';
});
// Votre code pour Favori ici
document.getElementById('btnFavori').addEventListener('click', function (event) {
    event.preventDefault();
    let icone = event.target;
    // Vérifier si l'élément est déjà favorisé
    if (icone.src.includes('favorie.svg')) {
        icone.src = '../assets/images/cvtheque/favorie_active.svg'; // Chemin vers l'icône active
    } else {
        icone.src = '../assets/images/cvtheque/favorie.svg';
    }
});
// Télécharge table au format XLS
document.getElementById('btnEnvoyer').addEventListener('click', function (event) {
    event.preventDefault();

    // Sélectionnez votre table
    var table = document.getElementById('datatables-tab');
    var wb = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });

    // Générez le fichier XLS
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    // Déclenchez le téléchargement
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'CVThèqueHumanJobs.xlsx');
});

// Cette fonction est nécessaire pour traiter le type de données correctement
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

//  pour Statistique 
document.getElementById('btnVoir').addEventListener('click', function (event) {
    event.preventDefault();
    window.location = 'statistique.html';
});
//  pour Imprimer 
document.getElementById('btnImprimer').addEventListener('click', function (event) {
    event.preventDefault();
    window.print();
});
