$(document).ready(function() {
    console.log('Document is ready');
    
    $.getScript('https://scripts.pay.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js')
    .done(function(script) {
        console.log('bKash script loaded successfully');

        bKash.init({
            paymentMode: 'checkout',
            paymentRequest: {
                amount: '100', 
                intent: 'sale'
            },

            createRequest: function(request) {
                console.log('Create request initialized');
                // Implement your logic here
            },

            executeRequestOnAuthorization: function() {
                console.log('Execute request initialized');
                // Implement your logic here
            },

            onClose: function() {
                alert('Payment was canceled.');
            }
        });

        $('#bKash_button').removeAttr('disabled');
        console.log('bKash button enabled');
    })
    .fail(function(jqxhr, settings, exception) {
        console.error('Failed to load bKash script:', exception);
    });
});
