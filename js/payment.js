$(document).ready(function() {
    var accessToken = '';  // This will store the access token

    // Step 1: Generate the Access Token using CORS proxy
    function generateAccessToken() {
        console.log('Attempting to generate access token...');
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                app_key: '0vWQuCRGiUX7EPVjQDr0EUAYtc',  // Your App Key
                app_secret: 'jcUNPBgbcqEDedNKdvE4GIcAK7D3hCjmJccNPZZBq96QlxxwA'  // Your App Secret
            }),
            success: function(response) {
                console.log('Access token generated successfully:', response);
                accessToken = response.id_token;
                console.log('Access Token:', accessToken);

                // Enable the bKash button after generating the token
                $('#bKash_button').removeAttr('disabled');
            },
            error: function(xhr, status, error) {
                console.error('Error generating access token:', xhr.status, xhr.statusText, xhr.responseText);
                if (xhr.status === 403) {
                    alert('403 Forbidden: Please check your API credentials or contact bKash support.');
                } else if (xhr.status === 401) {
                    alert('401 Unauthorized: Your API key and secret might be incorrect.');
                } else {
                    alert('Error: ' + xhr.status + ' - ' + xhr.statusText);
                }
            }
        });
    }

    // Initialize bKash when the script is loaded
    $.getScript('https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js')
        .done(function(script){
            console.log('bKash script loaded.');
            generateAccessToken();  // Generate access token first
        });

    // Trigger the payment process on button click
    $('#bKash_button').click(function() {
        console.log('bKash button clicked.');
        bKash.requestPermission();
    });
});
