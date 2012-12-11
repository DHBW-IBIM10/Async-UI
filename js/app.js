/**
 * Created with IntelliJ IDEA.
 * User: robert
 * Date: 12/10/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

// alerts HTML

var alertInfo =
    "<div class=\"alert alert-info in\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button><strong>Bitte warten…</strong> Ihr Angebot wird jetzt berechnet.</div>";

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
    // collapse form section
    $(sels[states.indexOf(1)]).collapse('toggle');

    infoAlert("#mh");
    setTimeout(function(){$(".alert").alert('close');},1000);
    showActivity('#mh');
}

function infoAlert(sel) {
    $(sel).append(alertInfo);
    $(".alert").alert();
}

function showActivity(sel) {
    $(sel).append(activity);
}