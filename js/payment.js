document.addEventListener('DOMContentLoaded', function () {
    var paymentID;

    // Step 1: Generate the Access Token
    function generateAccessToken() {
        return fetch('https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'username': '01619754538',  // Your live username
                'password': 'your_password', // Your live password
                'app_key': 'Pc0yKAFRbzf6N3yk9msFYs8Ttc', // Your live app key
                'app_secret': 'LNHbzWWQiD4uLxzvSRNHFNFFUrleCTptabBuNIPtA1fDKVEbK0c' // Your live app secret
            }
        })
        .then(response => response.json())
        .then(data => data.id_token)
        .catch(error => console.error('Error generating access token:', error));
    }

    // Step 2: Initialize bKash
    function initBkash() {
        bKash.init({
            paymentMode: 'checkout',
            paymentRequest: {
                amount: '100', // Your transaction amount
                intent: 'sale'
            },

            createRequest: function (request) {
                generateAccessToken().then(function (token) {
                    fetch('https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(request)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.paymentID != null) {
                            paymentID = data.paymentID;
                            bKash.create().onSuccess(data); // Pass the paymentID to bKash
                        } else {
                            bKash.create().onError(); // Run cleanup on error
                            alert('Failed to create payment. Please try again.');
                        }
                    })
                    .catch(error => {
                        bKash.create().onError(); // Run cleanup on error
                        console.error('Error creating payment:', error);
                    });
                });
            },

            executeRequestOnAuthorization: function () {
                fetch('https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ paymentID: paymentID })
                })
                .then(response => response.json())
                .then(data => {
                    if (data && data.paymentID != null) {
                        // Payment was successful, redirect to a success page
                        window.location.href = '/success_page.html';
                    } else {
                        bKash.execute().onError(); // Run cleanup on error
                        alert('Failed to execute payment. Please try again.');
                    }
                })
                .catch(error => {
                    bKash.execute().onError(); // Run cleanup on error
                    console.error('Error executing payment:', error);
                });
            },

            onClose: function () {
                alert('Payment was canceled.');
            }
        });

        // Enable the bKash button after initialization
        document.getElementById('bKash_button').removeAttribute('disabled');
    }

    // Step 3: Load bKash script and initialize
    $.getScript('https://scripts.pay.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js')
    .done(function(script) {
        console.log('bKash script loaded.');
        initBkash(); // Initialize bKash after script is loaded
    });
});
