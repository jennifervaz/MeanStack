module.exports = function($scope, $http,$rootScope,$location)
{
$rootScope.movieAmount=0;



var init=function()
{
  var m=sessionStorage.getItem('movieName');
  $scope.movieName=m;
  var t=sessionStorage.getItem('movieTheatre');
  $scope.movieTheatre=t;
  var s=sessionStorage.getItem('movieShow');
  $scope.movieShow=s;
  var d=sessionStorage.getItem('movieDate');
  $scope.movieDate=d;
  $http.get('/conapi/bookedseats/'+m+'/'+t+'/'+s+'/'+d).then(function (response) {

    for(i=0;i<response.data.length;i++)
    {
      for(j=0;j<response.data[i].SeatNo.length;j++)
      {
          $('#'+response.data[i].SeatNo[j]).addClass('red');
          console.log("made red");
      }
    }
  });
};
init();

$(document).ready(function()
{

  $('#Seatclass').change(function()
  {
     sel=$('#Seatclass').find(":selected").text();
    console.log(sel+ "selected");
  //  window.location.reload(false);
/*    if(sel=="GOLD")
    {
      $('#silver tr>td>div').addClass('grey');
      $('#gold tr>td>div').removeClass('grey');

    }

    if(sel=="SILVER")
    {
      $('#gold tr>td>div').addClass('grey');
      $('#silver tr>td>div').removeClass('grey');
    }
*/
    $('#noofseats').change(function()
    {



      if(sel=="GOLD")
      {
        $('#silver tr>td>div').addClass('grey');
        $('#gold tr>td>div').removeClass('grey');

      $('#gold tr>td>div').removeClass('green');
       $('#gold tr>td>div').addClass('style1');
      }

      if(sel=="SILVER")
      {
        $('#gold tr>td>div').addClass('grey');
        $('#silver tr>td>div').removeClass('grey');
        $('#silver tr>td>div').removeClass('green');
      $('#silver tr>td>div').addClass('style1');
      }




      countdiv=[];

      no = $('#noofseats').find(":selected").text();

      document.getElementById("sno").innerHTML= no;
      document.getElementById("seatno").innerHTML='';
      document.getElementById("amount").innerHTML='';


          console.log("change event occured");
          console.log(no);
          console.log(countdiv.length);
          console.log(countdiv);

});
    $('.style1').click(function()
      {
        if(!($(this).hasClass('grey')||$(this).hasClass('red')))
        {
          console.log("after click of seat");

          console.log(countdiv.length+"<"+no);
          //console.log(no);
          console.log(countdiv);



            if(countdiv.length < no)
              {

                $(this).toggleClass('green');
                console.log("toggle");
                var id=$(this).attr('id');
                var cn=$(this).hasClass('green');
                console.log("if it is green"+cn);

                  if(cn)
                  {
                      countdiv.push(id);
                      document.getElementById("seatno").innerHTML=countdiv;
                      $rootScope.movieSeats=JSON.stringify(countdiv);
                      sessionStorage.setItem('movieSeats',$rootScope.movieSeats);
                      console.log("if");
                      console.log(no );
                      console.log(countdiv.length);
                      console.log(countdiv);
                      if(sel== "SILVER")
                      {
                        document.getElementById("amount").innerHTML=countdiv.length*200;
                      }
                      else
                      {
                        document.getElementById("amount").innerHTML=countdiv.length*280;
                      }
                  }

              else
                    {

                      var ind=countdiv.indexOf(id);
                      countdiv.splice(ind,1);
                      document.getElementById("seatno").innerHTML=countdiv;
                      $rootScope.movieSeats=JSON.stringify(countdiv);
                      sessionStorage.setItem('movieSeats',$rootScope.movieSeats);


                        console.log("else");
                        console.log(no);
                        console.log(countdiv.length);
                        console.log(countdiv);
                        if(sel== "SILVER")
                        {
                          document.getElementById("amount").innerHTML=countdiv.length*200;
                        }
                        else
                        {
                          document.getElementById("amount").innerHTML=countdiv.length*280;
                        }
                   }




            }
          else
            {
                var id=$(this).attr('id');

                  if( countdiv.indexOf(id) == -1 )
                  alert("Request you to  book only " + no +" seats");
                  else {

                        countdiv.splice(countdiv.indexOf(id),1);
                        $rootScope.movieSeats=JSON.stringify(countdiv);
                        sessionStorage.setItem('movieSeats',$rootScope.movieSeats);
                        document.getElementById("seatno").innerHTML=countdiv;
                        $(this).removeClass("green");
                        $(this).addClass("style1");
                      console.log("big else");
                      console.log(no);
                      console.log(countdiv.length);
                      console.log(countdiv);
                      if(sel== "SILVER")
                      {
                        document.getElementById("amount").innerHTML=countdiv.length*200;
                      }
                      else
                      {
                        document.getElementById("amount").innerHTML=countdiv.length*280;
                      }
                      }
                  }
                }


          });












      //    else
        //  {
          //            countdiv.splice(countdiv.indexOf(id),1);
            //          console.log( "array of seats(big else) "+countdiv );
              //        console.log("array length "+countdiv.length);
                //      $rootScope.movieSeats=JSON.stringify(countdiv);
                  //    sessionStorage.setItem('movieSeats',$rootScope.movieSeats);
                    //  document.getElementById("seatno").innerHTML=countdiv;
                  //    $(this).removeClass("green");
                  //    $(this).addClass("style1");



$scope.setPrice=function(a)
{
  $rootScope.movieAmount=document.getElementById("amount").innerHTML;
  sessionStorage.setItem('movieAmount',$rootScope.movieAmount);
  $rootScope.movieSeats1=countdiv;
  sessionStorage.setItem('movieSeats1',$rootScope.movieSeats1);
  $rootScope.movieSeatsNo=no;
  sessionStorage.setItem('movieSeatsNo',$rootScope.movieSeatsNo);

var s_no=no;
var count=0;
$(".green").each(function()
{
  count++;
});

if(count==s_no)
$location.path("/payment");
else
  alert('ERROR : Incorrect number of seats selected .');
};



});

});
};
