 $.getJSON("{{ route('pie_overview_json') }}", function(data) { 
     alert('ok');
  }); 
 $(function (){
  'use strict';
 
  var pieData = {
    labels: [
      'No fully',
      'Fully' 
    ],
    datasets: [{
      data: [30, 70],
      backgroundColor: [
        '#FF6384',
        '#4f6785'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#4f6785' 
      ]
    }]
  };
  var ctx = document.getElementById('canvas-34');
  var chart = new Chart(ctx, {
    type: 'pie',
    data: pieData,
    options: {
      responsive: true
    }
  });  
}); 