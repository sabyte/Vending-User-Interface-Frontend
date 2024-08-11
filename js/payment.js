$(document).ready(function() {
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
                // Your create request logic here
                console.log('Create request initialized');
                // Make sure to handle this
            },

            executeRequestOnAuthorization: function() {
                // Your execute request logic here
                console.log('Execute request initialized');
                // Make sure to handle this
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
