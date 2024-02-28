/*
Plugin Name: News Reader
Plugin URI: https://jayr42.sg-host.com/
Description: Retrieves latest articles from Google News given a search term via AJAX
Version: 1.0
Author: Jay Rosen
Author URI: https://jayrosen.design/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// $('#getDataBtn').click(function () {
function getData(){
  
    $('.timeline').empty();
        $('#err').empty();
           var title, link;
           var searchTerm = document.getElementById("searchTerm").value; 
       
       //Replace empty input for select all
       if(searchTerm === null || searchTerm.match(/^ *$/) !== null)
       {
           searchTerm = '*'
       }
       
           var newUrl = "https://news.google.com/rss/search?q=" +searchTerm + "&hl=en-US&gl=US&ceid=US:en";
           
           
           //Create a hidden iframe to load XML data without CORS problem
           const iframe = document.createElement("iframe");
           iframe.setAttribute("id", "iframe");
           iframe.style.display = "none";
           iframe.src = newUrl;
           document.body.appendChild(iframe);
          
           $.ajax({
               url: newUrl,
               dataType: "xml",
                   beforeSend: function () {  //display spinner on ajax call
               $('#loader').removeClass('hidden')
                   },
               success: function(data){
                   data = $(data).find('channel item').slice(0, 12);
                   data.each(function(){
                       title = $(this).find('title').text();
                       link = $(this).find('link').text();

                       $('.timeline').append(
                           "<ul class='col-md-4'>"+
                                "<li class='thumbnail thumb-text rss' >" +
                           
                                    "<a style='text-decoration:none;' href=" + link + " target='_blank'><p class='rss-text'>" + title + "</p></a>" +

                                "</li>" +
                            "</ul>"
                       );
                   });
               },
               error: function(){
               $('#err').empty();
                   $('#err').append("<div class='alert alert-danger'><i class='fa fa-exclamation-triangle'></i> Failed to get feeds.</div>");
               },
           complete: function () { // hide spinner
               $('#loader').addClass('hidden')
           },
       });
   }
