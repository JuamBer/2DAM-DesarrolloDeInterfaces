const {
    app,
    BrowserWindow,
    dialog
} = require('electron')
require('@electron/remote/main').initialize()
const electron = require("electron");


let SobrePrograma;
let SobreJuego;

function createMenus(){
    const Menu = electron.Menu;
    const template = [{
        label: "Más Información",
        submenu: [
            {
                label: "Sobre El Programa",
                click: ()=>{
                    SobrePrograma();
                }
            },
            {
                label: "Sobre El Juego",
                click: () => {
                    SobreJuego();
                }
            }
        ]
    }];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
function createWindow() {
    const masInfo = new BrowserWindow({
        title:'Hundir La Flota',
        width:1600,
        height:800
    });
    const sobrePrograma = new BrowserWindow({
        title: 'Sobre El Programa',
        parent: masInfo,
        show: false,
        modal: true
    });
    SobrePrograma = ()=>{
        sobrePrograma.loadFile('pages/sobrePrograma.html');
        sobrePrograma.show();
    };
    SobreJuego = () => {
        electron.shell.openExternal("https://es.wikipedia.org/wiki/Batalla_naval_(juego)");
    };

    require("@electron/remote/main").enable(masInfo.webContents)
    // y carga el index.html de la aplicación.
    masInfo.loadFile('pages/index.html')
    //win.setMenu(null) 
    //para mostrar en la ventana la herramientas de desarrollo de chrome:
    masInfo.webContents.openDevTools();
}
function createApp(){
    createWindow();
    createMenus();
}

//cuando la aplicación electron está lista (todos los procesos generados)
//mediante app.on llamamos a la función que se va ha encargar de lanzar las
//ventanas:
app.on('ready', createApp);


