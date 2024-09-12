document.getElementById('voucher-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const quantity = parseInt(document.getElementById('voucher-quantity').value);
    const voucherCodesList = document.getElementById('voucher-codes');
    voucherCodesList.innerHTML = '';
    
    generateVouchers(cardNumber, quantity, voucherCodesList);
});

function generateVouchers(cardNumber, quantity, voucherCodesList) {
    const url = `https://api.teeg.cloud/vouchers/campaigns/VPBE5ZJ/cards/${cardNumber}?tz=MIDAB38D4F`;
    const headers = {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imp0X1htek9Od2NqTlg0VFhjTjRvMUhNM2k5aUtpczlpSGgxYTllcEdENGsiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiI2ZjcyYzI3NS01MWI5LTQ2M2ItODQxMS0zYjA0OTM2Y2UxODkiLCJpc3MiOiJodHRwczovL2lkZW50aXR5LnRlZWcuY2xvdWQvYWYyMWUwNTYtMGEyMS00ZDgzLWI1ZGQtNDRjNDM5ZmE4ZjMwL3YyLjAvIiwiZXhwIjoxNzIxMTQzMTA5LCJuYmYiOjE3MjExNDIyMDksImlwQWRkcmVzcyI6IjEwNC4yOC4yNDcuMTM1Iiwib2lkIjoiNjBhOTU1MzctNjNjNy00YmU2LTliYmEtNDk2MzRjNmM4Y2JkIiwic3ViIjoiNjBhOTU1MzctNjNjNy00YmU2LTliYmEtNDk2MzRjNmM4Y2JkIiwiZW1haWxzIjpbImFndXMud2l3ZWthNjVAZ21haWwuY29tIl0sInRpZCI6ImFmMjFlMDU2LTBhMjEtNGQ4My1iNWRkLTQ0YzQzOWZhOGYzMCIsIm5vbmNlIjoiZDRjNGM4MmMtNmIwNC00YTNjLWFkMDMtOGQ1NjIxZTg1MTliIiwic2NwIjoiYWxsLWFwaXMiLCJhenAiOiJjYTBlNDg2OC0xNzdiLTQ5ZDItOGM2My1mMTA0NGUzZWRjNjMiLCJ2ZXIiOiIxLjAiLCJpYXQiOjE3MjExNDIyMDl9.Xlq40jd91_7eguFwvyUJx_kTQKgRxFI9IWMet-Cic8QPmehxVnmR6EjRLc4GJPZLasysretBMeEO6fJfEo6qWj-V_BN52_CddbfnHnhKU1XMK97Rvpu6WSYiqYkpaH5rwlbcgTiOZGEZKoviw8w1Xg_5moZxBFb_gAMXA0s9s3uzUHIPpSqXOZhPdEoepZsNUlifTuqBYWE4_gBLZCYCv3H3HOz38m4JWj4YzcZCqKXdBFLR1hlbe4j3lBHOvrJ3qQpvvmYdVIi8qe8VfcHaz3rvrllwR1Nc-F3ELw6dn5_1Fzvu5Biloz_jfJmCovKN351A6daSRD39L49akF5G5A',
        'Content-Type': 'application/json'
    };

    for (let i = 0; i < quantity; i++) {
        fetch(url, { method: 'GET', headers: headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.voucherCode) {
                    const listItem = document.createElement('li');
                    listItem.innerText = data.voucherCode;
                    voucherCodesList.appendChild(listItem);
                    document.getElementById('voucher-result').classList.remove('hidden');
                } else {
                    throw new Error('Voucher code not found in response');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to generate voucher. Please try again.');
            });
    }
}
