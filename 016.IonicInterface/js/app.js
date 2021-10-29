let btn = document.getElementById('btn');
let input = document.getElementById('input');

function presentAlertConfirm(input) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Confirm!';
    alert.message = input;
    alert.buttons = [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
            console.log('Confirm Cancel: blah');
        }
    }, {
        text: 'Okay',
        handler: () => {
            console.log('Confirm Okay')
        }
    }];

    document.body.appendChild(alert);
    return alert.present();
}


btn.addEventListener('click', () => {
    presentAlertConfirm(input.value);
});