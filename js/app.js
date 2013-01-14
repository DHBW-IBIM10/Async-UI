/**
 * Created with IntelliJ IDEA.
 * User: robert
 * Date: 12/10/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

// progress bars

var activity = "<div class=\"progress progress-striped active\"><div class=\"bar\" style=\"width: 99%;\"></div></div>";

// track state of form elements
var sels = ["#collapseOne", "#collapseTwo"];
var states = [1, 0];

$('#collapseOne').on('shown', function () {
    states[0] = 1;
});

$('#collapseTwo').on('shown', function () {
    states[1] = 1;
});

$('#collapseOne').on('hidden', function () {
    states[0] = 0;
});

$('#collapseTwo').on('hidden', function () {
    states[1] = 0;
});

function beantragen( ){
    if($('#policyForm').h5Validate('allValid')){
        // collapse form section
        $(sels[states.indexOf(1)]).collapse('toggle');

        infoAlert("#mh","Please wait…"," Your offer is being calculated.")
        setTimeout(function(){$(".alert").alert('close');},2000);
        showActivity('#mh');
        $.ajax({
            url: "/insurances",
            type: "POST",
          contentType: "application/json; charset=utf-8",
            data: JSON.stringify($("#policyForm").serializeArray()),
            success: function(response) {
                if(!$.isEmptyObject(response)) {
                    showError("#mh","Wrong input","Please fix the errors in the red fields.")
                    $(sels[states.indexOf(0)]).collapse('toggle')
                    setTimeout(function(){$(".alert").alert('close');},5000)
                    $.each(response,function(index, value) {
                        $(('*[name=]' + value.name)).h5Validate('markInvalid')
                    })
                } else {
                    showSuccess("#mh","You are insured now!")
                    setTimeout(function(){$(".alert").alert('close');},5000)
                }
            },
            error: function(response){
                showError("#mh","Error","")
                setTimeout(function(){$(".alert").alert('close');},5000)
            }
        });
    } else {
        showError("#mh","Wrong input","Please fix the errors in the red fields.")
        setTimeout(function(){$(".alert").alert('close');},5000)
    }
}
function showSuccess(sel,MSG) {
    var alertSuccess =
        "<div class=\"alert alert-success in\">" +
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
            "<strong>Success </strong>"+MSG+"</div>";
    $(sel).append(alertSuccess);
    $(".alert").alert();
}

function infoAlert(sel,T,MSG) {
    var alertInfo =
        "<div class=\"alert alert-info in\">" +
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>" +
            "<strong>"+T+"</strong>"+MSG+"</div>";
    $(sel).append(alertInfo);
    $(".alert").alert();
}

function showError(sel, T, MSG) {
    var alertError =
        "<div class='alert alert-error'>" +
            "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
            "<strong>"+T+"</strong>"+MSG+"</div>"
    $(sel).append(alertError);
    $(".alert").alert();
}

function showActivity(sel) {
    $(sel).append(activity);
}