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
// ----------------- Chart js ( Page Statistique )-------------------------//
// -----------------Top 5 Métiers ---------------------------//
let loadChartTopMetier = function (labels, data) {
    $('#ChartTopMetier').remove(); // supprime l'élément <canvas> existant
    $('#canva_top_Metier').append('<canvas id="ChartTopMetier"><canvas>'); // ajoute un nouvel élément <canvas>

    Chart.defaults.color = '#491478';
    const ctx = document.getElementById('ChartTopMetier').getContext('2d');

    var optionschart = {
        responsive: true,
        title: {
            display: false,
        },
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    labelColor: function (context) {
                        return {
                            borderColor: '#491478',
                            backgroundColor: '#491478',
                            borderWidth: 2,
                            borderRadius: 2,
                        };
                    },
                    labelTextColor: function (context) {
                        return '#fff';
                    },
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += '<br/>';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' ' + 'Profils';
                        }
                        return label;
                    }
                }
            }
        }
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Métier 1", "Métier 2", "Métier 3", "Métier 4", "Métier 5"],
            datasets: [{
                label: 'Top 5 Métiers',
                data: [50, 40, 30, 20, 10],  // cinq valeurs pour les cinq métiers
                borderWidth: 1,
                borderColor: "#6F4795",
                backgroundColor: "#6F4795",
                barPercentage: 0.5,
                barThickness: 10
            }]
        },
        options: optionschart
    });

}

// Exemple d'utilisation :
let labels = ["Métier 1", "Métier 2", "Métier 3", "Métier 4", "Métier 5"]; // Mettez vos labels ici
let data = [50, 40, 30]; // Mettez vos données ici
loadChartTopMetier(labels, data);
// -----------Education / Experience ---------------//
var ctx = document.getElementById('ChartEducationExperience').getContext('2d');

var chartData = {
    datasets: [{
        label: 'Doctorat',
        data: [{
            x: '3-5 ans',
            y: 'Doctorat',
            r: 10
        }],
        backgroundColor: "#8c54fe"
    },{
        label: 'Bac+5',
        data: [{
            x: '3-5 ans',
            y: 'Bac+5',
            r: 15
        }, {
            x: '5-10 ans',
            y: 'Bac+5',
            r: 20
        }],
        backgroundColor: "#491478"
    } 
    // Ajoutez d'autres datasets pour Bac+3, Bac+2, etc.
    ],
};

var options = {
    scales: {
        y: {
            type: 'category',
            labels: ['Bac', 'Bac+3', 'Bac+4', 'Bac+5', 'Doctorat']
        },
        x: {
            type: 'category',
            labels: ['0-3 ans', '3-5 ans', '5-10 ans', '>10 ans']
        }
    }
};

new Chart(ctx, {
    type: 'bubble',
    data: chartData,
    options: options
});


//-----------Experience / Sexe -----------------------//
document.addEventListener("DOMContentLoaded", function() {
    // Données pour le graphique
    var options = {
        series: [{
            name: 'Hommes',
            data: [10, 20,60,80,100]
        }, {
            name: 'Femmes',
            data: [30]
        }],
        chart: {
            type: 'bar',
            height: 400
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#000']
            }
        },
        xaxis: {
            categories: ['1 an', '2 ans', '3 ans', '4 ans', '5 ans', '6 ans', '7 ans', '8 ans', '9 ans', '10 ans', '11 ans', '12 ans', '13 ans', '14 ans', '15 ans', '16 ans', '17 ans', '18 ans', '19 ans', '20 ans', '21+ ans']
        },
        colors: ['#491478', '#9B4CE2'] // 7f5e9b pour les hommes, .. pour les femmes
    };

    // Création du graphique
    var chart = new ApexCharts(document.querySelector("#canva_top_ExperienceSexe"), options);
    chart.render();
});


//-----------Secteurs Chart -----------------------//
// Fonction pour générer le graphique radar des secteurs
function generateSecteursChart() {
    const ctx = document.getElementById('secteursChart').getContext('2d');

    const secteursData = {
        labels: ['Services', 'Industrie', 'Banques', 'Agriculture', 'Administration'],
        datasets: [{
            label: 'Nombre de candidats',
            data: [55, 66, 32, 12, 18],
            backgroundColor: 'rgba(73, 20, 120, 0.2)',  // couleur de fond transparente
            borderColor: '#491478',  // couleur de la bordure
            borderWidth: 2,
            pointBackgroundColor: '#491478', // couleur des points
        }]
    };

    const options = {
        scales: {
            r: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                    backdropColor: 'transparent',  // rendre le fond des étiquettes transparent
                },
                grid: {
                    color: 'rgba(120, 120, 120, 0.2)' // couleur des grilles
                },
                pointLabels: {
                    font: {
                        size: 14,
                        color: '#491478'  // couleur des étiquettes de point (labels)
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#491478'  // couleur du texte de la légende
                }
            }
        }
    };

    new Chart(ctx, {
        type: 'radar',
        data: secteursData,
        options: options
    });
}
// Appeler la fonction pour générer le graphique
generateSecteursChart();

//-----------Prétentions / Matching Chart -----------------------//
function generatePretentionsChart() {
    const ctx = document.getElementById('pretentionsChart').getContext('2d');

    const pretentionsData = {
        labels: ["<50%", "50%-60%", "60%-70%", "70%-80%", "80%-90%", "90%-100%"],
        datasets: [{
            label: 'Salaire',
            data: [2000, 4000, 6000, 8000, 10000, 12000], // Ces valeurs sont des exemples, vous devrez les remplacer par vos données réelles
            backgroundColor: 'rgba(73, 20, 120, 0.2)',
            borderColor: '#491478',
            borderWidth: 2
        }]
    };

    const pretentionsOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const pretentionsChart = new Chart(ctx, {
        type: 'bar',
        data: pretentionsData,
        options: pretentionsOptions
    });
}

generatePretentionsChart();
//-------- Map ------//
// ----------------- End Chart js ( Page Statistique )-------------------------//
