module.exports = function($scope, $http){

    $(document).ready(function(){
        $("#myDate").datepicker({ minDate:'1d',format: 'dd/mm/yyyy',});
        $("#add").click(function () {
          var text=($("#hh").val())+" : "+($("#mm").val())+" "+($("#t").val());
      $('#res').append("<option value='"+text+"'>"+text+"</option>");
     });
    });

  var init = function(){
      $http.get('/myapi/movie').then(function (response) {
        $scope.movieData=response.data;
      });
      $http.get('/api/theatres').then(function (response) {
        $scope.theatreData=response.data;
      });
      $http.get('/mapapi/moviemapping').then(function (response) {
        $scope.mappingData=response.data;
      });
    };
    init();

  $scope.insertMapping = function(){
    var arr=[];
    var length = $('#res').children('option').length;
    for(var i=0;i<length;i++)
    {
      arr[i]=$('#res option').eq(i).val();
    }
    $scope.mapping.ShowTimings=arr;
    $scope.mapping.Date=$('#myDate').val();
    $http.post('/mapapi/newMapping', $scope.mapping).then(function (response) {
    });
    var val='true';
   $http.put('/myapi/updateMovie/' + $scope.mapping.Title+'/'+val).then(function (response) {
        console.log(response.data);
      });
      alert('Mapping Saved Successfully');
        window.location.reload();
    $scope.mapping='';
  };

  $scope.showMapping=function()
  {
    $http.get('/mapapi/selmovie/'+$scope.mapping1.Theatre).then(function (response) {
      $scope.searchmovieData=response.data;
    });
      window.location.reload();
  };

  $scope.deleteMapping = function(map){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/mapapi/deleteMapping/'+map._id).then(function (response) {
    });
//    $http.delete('/myapi/deleteMovie/'+map.Title).then(function (response) {
  //  });
    //$scope.showMapping();
    $http.get('/mapapi/moviemapping').then(function (response) {
      $scope.mappingData=response;
    });
    $http.get('/mapapi/selmoviename/'+map.Title).then(function (response) {
      len=response.data.length;
      //alert("len "+len);
      if(len==0)
      {
        var val='false';
   $http.put('/myapi/updateMovie/'+map.Title+'/'+val).then(function (response) {
           });
      }
      alert('Mapping removed Successfully');
    });
  }
    window.location.reload();
  };
};
