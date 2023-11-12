(function ($) {
    "use strict";
  Drupal.settings.analitycs = {
    showcheckboxDashboard : function () {
      var checkboxes = document.getElementById("checkboxesmodal");
      if (checkboxes.style.display == "block") {
        checkboxes.style.display = "none";
      } else {
        checkboxes.style.display = "block";
      }
    },
    showcheckbox2Dashboard : function () {
      var checkboxes = document.getElementById("checkboxesmodal2");
      if (checkboxes.style.display == "block") {
        checkboxes.style.display = "none";
      } else {
        checkboxes.style.display = "block";
      }
    },
    showcheckbox3Dashboard : function () {
      var checkboxes = document.getElementById("checkboxesmodal3");
      if (checkboxes.style.display == "block") {
        checkboxes.style.display = "none";
      } else {
        checkboxes.style.display = "block";
      }
    },
    showcheckbox4Dashboard : function () {
      var checkboxes = document.getElementById("checkboxesmodal4");
      if (checkboxes.style.display == "block") {
        checkboxes.style.display = "none";
      } else {
        checkboxes.style.display = "block";
      }
    },
    showcheckbox5Dashboard : function () {
      var checkboxes = document.getElementById("checkboxesmodal5");
      if (checkboxes.style.display == "block") {
        checkboxes.style.display = "none";
      } else {
        checkboxes.style.display = "block";
      }
    },
    //---------------------- Chart -------------------------//
    loadChartTopMetier : function (chartdata){
      $('#ChartTopMetier').remove(); // this is my <canvas> element
      $('#canva_top_Metier').append('<canvas id="ChartTopMetier"><canvas>');
      Chart.defaults.color = '#491478';
      const ctx = document.getElementById('ChartTopMetier');
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: '',
            data: [],
            borderWidth: 1,
            borderColor: "#491478",
            backgroundColor: "#491478",
            barPercentage: 10,
            barThickness: 10
          }]
        }
      });
      var optionschart =  {
        responsive: true,
          title: {
          display: false,
        },
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            display : false
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              labelColor: function(context) {
                return {
                  borderColor: '#491478',
                  backgroundColor: '#491478',
                  borderWidth: 2,
                  borderRadius: 2,
                };
              },
              labelTextColor: function(context) {
                return '#fff';
              },
              label: function(context) {
                let label = context.dataset.label || '';

                if (label) {
                  label += '<br/>';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y+' '+'Profils';
                }
                return label;
              }
            }
          }
        }
      };
      var getData = function(label,counter) {
       // console.log(item);
        myChart.data.labels.push(label);
        myChart.data.datasets[0].data.push(counter);
        myChart.options = optionschart;
        myChart.update();
      };

      var timesRun = 0;
      var interval = setInterval(function(){
        if(timesRun === 4){
          clearInterval(interval);
        }
        getData(chartdata[timesRun]['name'],chartdata[timesRun]['count']);
        timesRun += 1;
      }, 1000);

    },
    loadChartEducationExperience : function (chartdata){
      $('#ChartEducationExperience').remove(); // this is my <canvas> element
      $('#canva_top_education_experience').append('<canvas id="ChartEducationExperience"><canvas>');
      Chart.defaults.color = '#491478';

      //yLabels
      $.ajax({
        url: '/profil_json_get_education_experience',
        cache: true,
        type: 'GET',
        data: {
          data_education: JSON.stringify(chartdata)
        }

      }).done(function (dataajax) {
        let jsonData = JSON.parse(dataajax);
        const ctx = document.getElementById('ChartEducationExperience');
        var yLabels = {
          0:'',1:"< Bac",2:"Bac",3:"Bac +2",4:"Bac +3",5:"Bac +4",6:"Bac +5",7:"DEA",8:"Doctorat"
        };
        var xLabels = {
          0:'',1 : '0-3 ans',2:'3-5 ans', 3:'5-10 ans',4:'>10 ans',5:''
        };
        var myChart2 = new Chart(ctx, {
          type: 'bubble',
          Labels:[],
          data: {
            datasets: [{
              label: '',
              data: [],
              borderWidth: 1,
              borderColor: "#491478",
              backgroundColor: "#491478",
              barPercentage: 10,
              barThickness: 10,

            }],
          },

        });
        var optionschart = {
          scales: {
            y: {
              ticks:{
                callback: function(value, index, ticks) {
                  return yLabels[value];
                }
              }
            },
            x: {
              ticks:{
                callback: function(value, index, ticks) {
                  return xLabels[value];
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                labelColor: function(context) {
                  return {
                    borderColor: '#491478',
                    backgroundColor: '#491478',
                    borderWidth: 2,
                    borderRadius: 2,
                  };
                },
                labelTextColor: function(context) {
                  return '#fff';
                },
                label: function(context) {
                  if (context.parsed.y !== null) {
                    var cr = context.dataset.data[context.dataIndex];
                    var label = yLabels[context.parsed.y] +' / '+xLabels[context.parsed.x];
                    label += ' ('+(cr.cr)+' Profils)';
                  }
                  return label;
                }
              }
            }
          }
        }
       var getData = function(xlabel,ylable,counter) {
          // console.log(item);
          //myChart2.data.labels.push(label);
         var newcounter = counter;
         if(counter > 15){
           newcounter = 15;
         }
          myChart2.data.datasets[0].data.push({x:xlabel,y:ylable,r:newcounter,cr:counter});
          myChart2.options = optionschart;
          myChart2.update();
        };

        var item = 0;
        var interval = setInterval(function(){
          if(item === (jsonData.length-1)){
            clearInterval(interval);
          }
          getData(0,0,0);
          getData(5,0,0);
          getData(1,jsonData[item]['name'],jsonData[item][1]);
          getData(2,jsonData[item]['name'],jsonData[item][2]);
          getData(3,jsonData[item]['name'],jsonData[item][3]);
          getData(4,jsonData[item]['name'],jsonData[item][4]);
          item += 1;
        }, 1000);
        //console.log(jsonData);

      });


    },
    loadChartsecteur : function (chartdata){
      $('#ChartSecteurs').remove(); // this is my <canvas> element
      $('#canva_top_secteurs').append('<canvas id="ChartSecteurs"><canvas>');
      Chart.defaults.color = '#491478';
      const ctx = document.getElementById('ChartSecteurs');
      var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [],
          datasets: [{
            label: '',
            data: [],
            borderWidth: 1,
            borderColor: "#491478",
            backgroundColor: "#7a5897",
          }]
        }
      });
      var optionschart =  {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        scales: {
          y: {
            display: false
          },
          x: {
            display : false
          },
          r: {
            pointLabels: {
              display: false // Hides the labels around the radar chart
            },
            ticks: {
              display: false // Hides the labels in the middel (numbers)
            }
          }

        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              labelColor: function(context) {
                return {
                  borderColor: '#491478',
                  backgroundColor: '#491478',
                  borderWidth: 2,
                  borderRadius: 2,
                };
              },
              labelTextColor: function(context) {
                return '#fff';
              },
              label: function(context) {
                return context.parsed.r+' Profils';
              }
            }
          }
        }
      };
      var getData = function(label,counter) {
        // console.log(item);
        myChart.data.labels.push(label);
        myChart.data.datasets[0].data.push(counter);
        myChart.options = optionschart;
        myChart.update();
      };

      var timesRun = 0;
      var interval = setInterval(function(){
        if(timesRun === (chartdata.length -1)){
          clearInterval(interval);
        }
        getData(chartdata[timesRun]['name'],chartdata[timesRun]['count']);
        timesRun += 1;
      }, 1000);


    },
    loadChartPretentionMatching : function (chartdata){
      $('#ChartPretentionMatching').remove(); // this is my <canvas> element
      $('#canva_top_PretentionMatching').append('<canvas id="ChartPretentionMatching" style="height: 303px"><canvas>');
      Chart.defaults.color = '#491478';
      const ctx = document.getElementById('ChartPretentionMatching');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['100%','>99%','>98%','>97%','95%-97%','90%-95%','<90%'],
          datasets: [
            {
              label: 'Min',
              data: [],
              borderWidth: 0,
              borderColor: "#491478",
              backgroundColor: "#491478",
              fill: false,
              radius: 0,
              barPercentage: 0.01,
            },
            {
              label: 'Max',
              data: [],
              borderWidth: 1,
              borderColor: "#491478",
              backgroundColor: "#491478",
              fill: "1",
              line: true,
              radius: 0,
            }
          ]
        }
      });
      const optionschart = {
        tooltips: {
          mode: 'index',
          intersect: false,
          displayColors: false,
        },
        responsive: true,
        title: {
          display: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: "value"
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              labelColor: function(context) {
                return {
                  borderColor: '#491478',
                  backgroundColor: '#491478',
                  borderWidth: 2,
                  borderRadius: 2,
                };
              },
              labelTextColor: function(context) {
                return '#fff';
              },
              label: function(context) {
                return 'salaire '+context.parsed._stacks.y[0]+' - '+context.parsed._stacks.y[1]  ;
              }
            }
          }
        }
      };
      $.ajax({
        url: '/profil_json_get_pretention_matching',
        cache: true,
        type: 'GET',

      }).done(function (dataajax) {
        let jsonData = JSON.parse(dataajax);

        var getData = function(min,max) {
          myChart.data.datasets[0].data.push(min);
          myChart.data.datasets[1].data.push(max);
          myChart.options = optionschart;
          myChart.update();
        };

        var item = 0;
        var interval = setInterval(function(){
          if(item === (jsonData.length-1)){
            clearInterval(interval);
          }
          getData(jsonData[item]['min'],jsonData[item]['max']);
          item += 1;
        }, 10);
      });
    },
    loadChartExperienceSexe : function (chartdata){
      $('#ChartExperienceSexe').remove(); // this is my <canvas> element
      $('#canva_top_ExperienceSexe').append('<canvas id="ChartExperienceSexe" style="height: 503px"><canvas>');
      Chart.defaults.color = '#491478';
      const ctx = document.getElementById('ChartExperienceSexe');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['21+ ans',"20 ans","19 ans","18 ans","17 ans","16 ans","15 ans","14 ans","13 ans","12 ans","11 ans","10 ans","9 ans","8 ans","7 ans","6 ans","5 ans","4 ans","3 ans","2 ans","1 an"],
          datasets: [
            {
              label: 'Hommes',
              data: [],
              borderWidth: 0,
              borderColor: "#491478",
              backgroundColor: "#491478",
              fill: false,
              radius: 0,
            },
            {
              label: 'Femmes',
              data: [],
              borderWidth: 1,
              borderColor: "#9B4CE2",
              backgroundColor: "#9B4CE2",
              fill: "1",
              line: true,
              radius: 0,
            }
          ]
        },
        options: {
          responsive: true,
          indexAxis: 'y',
        }
      });
      const optionschart = {
        tooltips: {
          mode: 'index',
          intersect: false,
          displayColors: false,
        },
        responsive: true,
        indexAxis: 'y',
        title: {
          display: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: "value"
            }
          }
        },
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              labelColor: function(context) {
                return {
                  borderColor: '#491478',
                  backgroundColor: '#491478',
                  borderWidth: 2,
                  borderRadius: 2,
                };
              },
              labelTextColor: function(context) {
                return '#fff';
              },
              label: function(context) {
                console.log(context.parsed);
                return (context.parsed._stacks.x[0]+context.parsed._stacks.x[1])+' Profils'+'('+context.parsed._stacks.x[0]+'H/'+context.parsed._stacks.x[1]+'F)';
              }
            }
          }
        }
      };
      $.ajax({
        url: '/profil_json_get_experience_sexe',
        cache: true,
        type: 'GET',

      }).done(function (dataajax) {
        let jsonData = JSON.parse(dataajax);

        var getData = function(min,max) {
          myChart.data.datasets[0].data.push(min);
          myChart.data.datasets[1].data.push(max);
          myChart.options = optionschart;
          myChart.update();
        };

        var item = 1;
        var interval = setInterval(function(){
          if(item === (jsonData['male'].length)){
            clearInterval(interval);
          }
          getData(jsonData['male'][item],jsonData['female'][item]);
          item += 1;
        }, 10);
      });
    },
    loadChartMaps : function (chartdata){
      (async () => {

        const topology = await fetch(
          '/sites/all/themes/hj_recruteur/assets/js/MapsJson/regions-maroc.json'
        ).then(response => response.json());

        const Ville_region = await fetch(
          '/sites/all/themes/hj_recruteur/assets/js/MapsJson/maroc.json'
        ).then(response => response.json());
        const data1 = [];
        for(var region in Ville_region[0]){
          data1.push([region,0]);
        }
        var globalcounter = 0;
        for (var item in chartdata) {
          globalcounter +=chartdata[item]['count'];
          for(var region in Ville_region[0]){
            for (var ville in Ville_region[0][region] ){
              if(chartdata[item]['name'] == Ville_region[0][region][ville]){
                for (var dataitem in  data1){
                  if(data1[dataitem][0] == region){
                    data1[dataitem][1]=data1[dataitem][1]+chartdata[item]['count'];
                  }
                }
              }
            }
          }
        }
        for (var item in chartdata) {
          var purcentage = (chartdata[item]['count']/globalcounter)*100;
          if(purcentage < 1){
            purcentage = 1;
          }
          $('#vill-info').append('<tr><td>'+chartdata[item]['name']+'</td><td>'+chartdata[item]['count']+'</td><td>'+parseInt(purcentage)+'%</td></tr>')
        }
        // Prepare demo data. The data is joined to map using value of 'hc-key'
        // property by default. See API docs for 'joinBy' for more info on linking
        // data and map.


        // Create the chart
        Highcharts.mapChart('ChartMaps', {
          chart: {
            map: topology,
            backgroundColor: '#cdc6d9'
          },

          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          mapNavigation: {
            enabled: false,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },

          colorAxis: {
            min: 0
          },
          tooltip: {
            formatter: function() {
              return this.key+'<br/>'+this.point.options.z+' Profils';
            },
            style: {
              color: '#fff',
            },
            backgroundColor: '#491478'
          },
          series: [
            {
              name: 'Countries',
              color: '#491478',
              enableMouseTracking: false
            },
            {
              data: data1,
              type: 'mapbubble',
              name: 'Random data',
              states: {
                hover: {
                  color: '#A35EE1'
                }
              },
              dataLabels: {
                enabled: false,
                format: '{point.name}'
              }
            }]
        });

      })();
    }
  }
  $(document).ready(function () {
    //alert('es');
    $("#example").DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/fr-FR.json',
      },
      order: [[0, 'desc']],
    });
    //------------------page CVthèque ---------------//
    if($('#page_cvtheque').length > 0){
        "use strict";
     var table = $("#example2").DataTable({
        dom: 'Bfrtip',
       lengthMenu: [
         [ 10, 25, 50 ],
         [ '10 par page', '25 par page', '50 par page']
       ],
        buttons: [
          'pageLength',
          {
            text: '',
            tag: 'img',
            attr: {
              src: '/sites/all/themes/hj_recruteur/assets/images/icon-hj/ajouter.svg'
            },
            className: 'img-btn-option',
            action: function ( e, dt, node, config ) {
              alert( 'Button ajouter' );
            }
          },
          {
            text: '',
            tag: 'img',
            attr: {
              src: '/sites/all/themes/hj_recruteur/assets/images/icon-hj/favorie.svg'
            },
            className: 'img-btn-option',
            action: function ( e, dt, node, config ) {
              alert( 'Button favori' );
            }
          },
          {
            extend: 'excel',
            text: '',
            tag: 'img',
            attr: {
              src: '/sites/all/themes/hj_recruteur/assets/images/icon-hj/envoyer.svg'
            },
            className: 'img-btn-option'
          },
          {
            extend: 'print',
            text: '',
            tag: 'img',
            attr: {
              src: '/sites/all/themes/hj_recruteur/assets/images/icon-hj/imprimer.svg'
            },
            className: 'img-btn-option'
          },
          {
            text: '',
            tag: 'img',
            attr: {
              src: '/sites/all/themes/hj_recruteur/assets/images/icon-hj/vue-graphique.svg',

            },
            className: 'img-btn-option vue-graphe',
            action: function ( e, dt, node, config ) {
              Drupal.settings.analitycs.loadChartTopMetier(window.data_json.facetData.profile_candidat_field_metier);
              Drupal.settings.analitycs.loadChartEducationExperience(window.data_json.facetData.profile_candidat_field_niveau_d_tude);
              Drupal.settings.analitycs.loadChartsecteur(window.data_json.facetData.profile_candidat_field_secteur);
              Drupal.settings.analitycs.loadChartPretentionMatching(window.data_json.facetData.profile_candidat_field_secteur);
              Drupal.settings.analitycs.loadChartExperienceSexe(window.data_json.facetData.profile_candidat_field_secteur);
              Drupal.settings.analitycs.loadChartMaps(window.data_json.facetData.field_villes);
              document.getElementById("example2").style.display = "none";
              document.getElementById("example2_info").style.display = "none";
              document.getElementById("example2_paginate").style.display = "none";
              document.getElementById("style-modal-stats").style.display = "block";
              $('.vue-table').attr('style','display: initial');
              $('.vue-graphe').attr('style','display: none');
            }
          },
          {
            text: '',
            tag: 'img',
            attr: {
              src: '/sites/all/themes/hj_recruteur/assets/images/icon-hj/vue-table.svg',

            },
            className: 'img-btn-option vue-table',
            action: function ( e, dt, node, config ) {
              document.getElementById("example2").style.display = "block";
              document.getElementById("example2_info").style.display = "block";
              document.getElementById("example2_paginate").style.display = "block";
              document.getElementById("style-modal-stats").style.display = "none";
              $('.vue-table').attr('style','display: none');
              $('.vue-graphe').attr('style','display: initial');
            }
          },
        ],
        language: {
          searchPlaceholder: "Rechercher",
          url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/fr-FR.json',
          "rechercher": '',
        },
        order: [[1, 'desc']],
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
          'url':'/profil_json_get',
          data: {filter_data : function(){
            var fulldata = [];
            var formation = [];
            var experience = [];
            var poste = [];
            var region = [];
            var favoris = [];
              $( ".formation-checkbox" ).each(function( index ) {
                if(($(this).is(':checked'))){
                  formation.push($(this).val());
                }
              });
              $( ".experience-checkbox" ).each(function( index ) {
                if(($(this).is(':checked'))){
                  experience.push($(this).val());
                }
              });
              $( ".poste-checkbox" ).each(function( index ) {
                if(($(this).is(':checked'))){
                  poste.push($(this).val());
                }
              });
              $( ".region-checkbox" ).each(function( index ) {
                if(($(this).is(':checked'))){
                  region.push($(this).val());
                }
              });
              $( ".favoris-checkbox" ).each(function( index ) {
                if(($(this).is(':checked'))){
                  favoris.push($(this).val());
                }
              });
              fulldata.push({'formation':formation},{'experience':experience},{'poste':poste},{'region':region},{'favoris':favoris});
              return JSON.stringify(fulldata);
            }}
        },
        'columns': [
          { data: 'th1' },
          { data: 'uid' },
          { data: 'field_first_name' },
          { data: 'profile_candidat-field_niveau_d_tude' },
          { data: 'profile_candidat-field_experience' },
          { data: 'profile_candidat-field_metier' },
          { data: 'field_villes' },
          { data: 'profile_candidat-changed' },
          { data: 'th9' }
        ],
        "fnDrawCallback": function( oSettings ) {
          $('<tr><td colspan="9" style="height: 0px;padding: 0;border-image: radial-gradient(#fff, transparent) 10;border-bottom: 2px solid !important;"></td></tr>').insertAfter($('tbody tr'));
          var api = this.api();
           window.data_json = api.ajax.json();
          $('.show-profil-detail').on('click',function(){
            var item = $(this).attr('data-get');
            var itemeval = $(this).attr('data-eval');
            var itemehst = $(this).attr('data-hst');
            var itmanonym = $(this).attr('data-anonym');
            var cvtheq = $('#cvtheque').val();
            $.ajax({
              url: '/profil-detail',
              cache: true,
              type: 'GET',
              data: {
                itemvalue: item, itemeval: itemeval, itemehst: itemehst, is_cvtheq: cvtheq, dataanonym: itmanonym
              }

            }).done(function (data) {
              //$('#evalueted_totale_loader').addClass('hidden');
              $('.offcanvas-profil .offcanvas-body').html(data);
              //$('#evalueted_totale').removeClass('hidden');
            });
          });
        },
       /*preDrawCallback: function(oSettings){
         //$('#example2_filter label').html($('#example2_filter input'));
       }*/
      });
      $('#submit-filter').on('click',function(e){
        e.preventDefault();
        table.ajax.reload();
        Drupal.settings.analitycs.loadChartTopMetier(window.data_json.facetData.profile_candidat_field_metier);
        Drupal.settings.analitycs.loadChartEducationExperience(window.data_json.facetData.profile_candidat_field_niveau_d_tude);
        Drupal.settings.analitycs.loadChartsecteur(window.data_json.facetData.profile_candidat_field_secteur);
        Drupal.settings.analitycs.loadChartPretentionMatching(window.data_json.facetData.profile_candidat_field_secteur);
        Drupal.settings.analitycs.loadChartExperienceSexe(window.data_json.facetData.profile_candidat_field_secteur);
        Drupal.settings.analitycs.loadChartMaps(window.data_json.facetData.field_villes);
      })
    }
  });
})(jQuery);

