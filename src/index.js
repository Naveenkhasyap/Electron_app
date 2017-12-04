const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice =  document.getElementById('targetPrice')

const notification = {
title:'BTC alert'  ,
body:'BTC just beat your target',
icon:path.join(__dirname, '../assets/images/bitcoin.png')
}

function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')

        if(targetPrice.innerHTML!= '' && targetPriceVal < res.data.BTC.USD){
            const myNotification = new window.Notification(notification.title,notification.body)
        }
    })

}
getBTC();

setInterval(getBTC,30000)

notifyBtn.addEventListener('click',function(event){
    const modalPath   = path.join('file://',__dirname,'about.html')
    let win = new BrowserWindow({frame:false,transparent:true,alwaysOnTop:true,width:400,heigt:200})
    win.on('close',function(){win=null})
    win.loadURL(modalPath)
    win.show()
});

ipc.on('targetPriceVal',function(error,args){
    targetPriceVal = Number(args)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})
