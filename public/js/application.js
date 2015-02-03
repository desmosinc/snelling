$(function() {

    // Cache some DOM references
    var previewImage = $('#preview-image')[0];
    var $calculatorElt = $('#calculator');
    var $loading = $('.loading');
    var $recordIcon = $('#record-icon');
    var $desmosURL = $('#desmos-url');
    var $importForm = $('#import-form');
    var $intervalSelect = $('#interval-select');
    var $widthInput = $('#width-input');
    var $heightInput = $('#height-input');
    var $saveButton = $('#save-button');
    var $saveIcon = $('#save-icon');
    var $inputElements = $('input');

    // Initialize some variables
    var thumbFrames = [];
    var fullFrames = [];
    var recording = false;
    var oldState = '';
    var interval = 0.1;
    var fullWidth = 200;
    var fullHeight = 200;

    // Toggle the recording state
    // If we're starting, reset everything...otherwise we're done, so make the GIF 
    var setRecordingState = function() {
        recording = !recording;
        if (recording) {
            reset();
            $inputElements.prop('disabled', true);
            $intervalSelect.prop('disabled', true);
        } else {
            createGIF();             
            $inputElements.prop('disabled', false);
            $intervalSelect.prop('disabled', false);
        }
        $recordIcon.toggleClass('glyphicon-record').toggleClass('glyphicon-stop');
    };

    // Use the wonderful GifShot library to create the animated image
    // http://yahoo.github.io/gifshot/
    var createGIF = function() {
        if (!thumbFrames.length) return;
        gifshot.createGIF({
            'images': thumbFrames,
            'interval': interval
        }, function(obj) {
            if (!obj.error) {
                previewImage.src = obj.image;
            }
        });
        gifshot.createGIF({
            'images': fullFrames,
            'interval': interval,
            'gifWidth': fullWidth,
            'gifHeight': fullHeight
        }, function(obj) {
            if (!obj.error) {
                $saveButton[0].href = obj.image;
                $saveButton.removeClass('disabled');
                $saveIcon.removeClass('glyphicon-floppy-disk').addClass('glyphicon-floppy-save');
            }
        });
    };

    // Reset all the variables to their initial states
    var reset = function() {
        oldState = JSON.stringify(calc.getState());
        thumbFrames = [];
        fullFrames = [];
        oldState = '';
        previewImage.src = '';
        $saveButton.addClass('disabled');
        $saveIcon.removeClass('glyphicon-floppy-save').addClass('glyphicon-floppy-disk');
    };

    // Alert the user when they try to import a bad URL
    var alertBadUrl = function() {
        $('.alert-danger').remove();
        var $alertDiv = $("<div class='alert alert-danger fade in'><a class='close' href='#' data-dismiss='alert' role='alert')>&times;</a><strong>Whoops!</strong> ¯\\_(ツ)_/¯ Looks like there isn\'t a graph there...check your URL.</div>");
        $importForm.after($alertDiv);
        $alertDiv.fadeIn();
    };

    // Import a saved Desmos graph from a URL
    var importGraph = function() {
        var url = $desmosURL.val();
        if (!url) return;
        $.getJSON(url).done(function(res) {
            calc.setState(JSON.stringify(res.state));
            $desmosURL.val('');
            $('.alert-danger').remove();
        }).fail(function() {
            alertBadUrl();
        });
    };

    // Continually query the graph state...
    // If it's changed since the last check, push a new frame into the both frame arrays
    var poll = function() {
        if (recording) {
            var newState = JSON.stringify(calc.getState());
            if (newState !== oldState) {
                thumbFrames.push(calc.screenshot({width: 200, height: 200}));
                fullFrames.push(calc.screenshot({width: fullWidth, height: fullHeight}));
                oldState = newState;
            }              
        }
        requestAnimationFrame(poll);
    };

    // Attach event handlers
    $('#record-button').click(setRecordingState);
    $('.import-button').click(importGraph);
    $importForm.submit(function(e) {
        e.preventDefault();
        importGraph();
        $desmosURL.blur();
    });
    $intervalSelect.change(function() {
        interval = parseFloat($(this).val());
        createGIF();
    });
    $widthInput.change(function() {
        fullWidth = parseInt($(this).val(), 10);
    });
    $heightInput.change(function() {
        fullHeight = parseInt($(this).val(), 10);
    });

    // Add tooltips to some UI elements
    $('[data-toggle="tooltip"]').tooltip({container: 'body'});

    // Add the Calculator instance to the page
    var calc = Desmos.Calculator($calculatorElt[0]);
    $loading.remove();

    // Start polling
    poll();

});