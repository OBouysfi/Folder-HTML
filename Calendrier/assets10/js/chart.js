// ----------------- Chart js ( Page Statistique )-------------------------//
// -----------------Top 5 Métiers ---------------------------//
// Fonction pour charger le graphique
let loadChartTopMetier = function (labels, data) {
    $('#ChartTopMetier').remove(); // pour supprime l'élément <canvas> existant
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
            labels: labels,
            datasets: [{
                label: 'Top 5 Métiers',
                data: data,
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
// Fonction pour récupérer les données de l'API
let fetchDataTopMetier = function() {
    fetch(urlChartTopMetier)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la requête HTTP");
        }
        return response.json();
    })
    .then(apiData => {
        // Extraire les labels (noms des métiers) et les données (nombre de profils) de la réponse de l'API
        let labels = apiData.map(item => item.job_position.label);
        let data = apiData.map(item => item.count);
        // Pour Charger le graphique avec les données récupérées...
        loadChartTopMetier(labels, data);
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données de l'API :", error);
    });
}
// Appelez les fonctions pour charger les données et afficher le graphique
$( document ).ready(function() {
    fetchDataTopMetier();
    fetchDataSecteur();
});

// -----------Education / Experience ---------------//
function transformEducationDataToChartData(apiData) {
    // Ici, nous transformons les données pour les adapter à la structure requise par Chart.js
    var chartData = {
        datasets: apiData.series.map(serie => ({
            label: serie.name,
            data: serie.data.map((count, index) => ({
                x: index, // L'index sera remplacé par les labels de l'axe x dans les options
                y: count,
                r: Math.sqrt(count) * 5 // Calculez le rayon de la bulle basé sur la racine carrée du nombre de personnes
            })),
            backgroundColor: "#491478"
        }))
    };
    return chartData;
}

function loadEducationChart(chartData) {
    var ctx = document.getElementById('ChartEducationExperience').getContext('2d');
    new Chart(ctx, {
        type: 'bubble',
        data: chartData,
        options: {
            scales: {
                y: {
                    // ... vos options d'échelle pour l'axe y
                },
                x: {
                    // Remplacer les indices par des labels réels
                    type: 'category',
                    labels: ['0-3 ans', '3-5 ans', '5-10 ans', '>10 ans']
                }
            }
        }
    });
}

function fetchDataForEducationExperience() {
    var urlForEducationExperience = "http://127.0.0.1:8000/api/backoffice/formations/levels"; // Remplacez par l'URL réelle de l'API
    fetch(urlForEducationExperience)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la requête HTTP: " + response.statusText);
            }
            return response.json();
        })
        .then(apiData => {
            var chartData = transformEducationDataToChartData(apiData);
            loadEducationChart(chartData);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données de l'API :", error);
        });
}

$(document).ready(function() {
    fetchDataForEducationExperience();
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
// Fonction pour générer le graphique radar des secteurs
function generateSecteursChart(labels, values) {
    const ctx = document.getElementById('secteursChart').getContext('2d');

    const secteursData = {
        labels: labels, 
        datasets: [{
            label: 'Nombre de candidats',
            data: values,
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
// Fonction pour récupérer les données de l'API
function fetchDataSecteur() {
    fetch(urlForSecteur)
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Erreur avec la réponse: ${response.status} ${response.statusText}. Corps: ${text}`);
            });
        }
        return response.json();
    })
        .then(data => {
            //  si l'API renvoie un tableau d'objets comme { sector: 'Services', numberOfCandidates: 55 }
            const labels = data.map(item => item.sector);
            const values = data.map(item => item.numberOfCandidates);

            generateSecteursChart(labels, values);
        })
        .catch(error => {
            console.error("P roblème avec l'opération fetch:", error.message);
        });
}
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
