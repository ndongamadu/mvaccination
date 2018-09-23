 
  $("#province").on('change', function(e){
     var province = e.target.value; 
     $('#district').empty();
     $('#district').append('<option value=all>Select-district</option>'); 
     $.get('ajax-district?province=' + province, function(data){
         $.each(data, function(index, districtObj){
           $('#district').append('<option value="'+districtObj.district+'">'+districtObj.district+'</option>');
         });
  });
 }); 

  $("#district").on('change', function(e){
  	 var district = e.target.value;
  	 var province = $('#province').val(); 
     $('#facility').empty(); 
     $('#facility').append('<option value=all>Select-facility</option>'); 
     $.get('ajax-facility?province='+province+'&district='+district, function(data){ 
        $.each(data, function(index, facilityObj){
           $('#facility').append('<option value="'+facilityObj.health_facility+'">'+facilityObj.health_facility+'</option>');
        });
  });
 }); 

 $("#facility").on('change', function(e){
  	 var facility = e.target.value;
  	 var province = $('#province').val(); 
  	 var district = $('#district').val(); 
     $('#zone').empty(); 
     $('#zone').append('<option value=all>Select-zone</option>'); 
     $.get('ajax-zone?province='+province+'&district='+district+'&facility='+facility, function(data){ 
        $.each(data, function(index, zoneObj){ 
           $('#zone').append('<option value="'+zoneObj.zone+'">'+zoneObj.zone+'</option>');
        });
  });
 }); 