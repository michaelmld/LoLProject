/**
 * Created by michael.dang on 4/12/17.
 */

$(document).ready(function() {
    $("#NA").click(function(){
        $("#regionDropdown").html('NA <span class="caret">')
        $("#hiddenRegion").val("NA");
    })

    $("#EU").click(function(){
        $("#regionDropdown").html('EUW <span class="caret">')
        $("#hiddenRegion").val("EUW");
    })

    $("#NA2").click(function(){
        $("#regionDropdown2").html('NA <span class="caret">')
        $("#hiddenRegion2").val("NA");
    })

    $("#EU2").click(function(){
        $("#regionDropdown2").html('EUW <span class="caret">')
        $("#hiddenRegion2").val("EUW");
    })

});