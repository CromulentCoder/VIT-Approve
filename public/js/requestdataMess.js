let graphQuality = Morris.Bar({
    element: 'morris-bar-quality',
    data: [{
        name:'null',
        quality: 0
    }],
    xkey: 'name',
    ykeys: ['quality'],
    labels: ['Average Quality'],
    hideHover: 'auto',
    resize: true
});

let graphUtensils = Morris.Bar({
    element: 'morris-bar-utensils',
    data: [{
        name:'null',
        utensils: 0
    }],
    xkey: 'name',
    ykeys: ['utensils'],
    labels: ['Cleanliness Of Utensils'],
    hideHover: 'auto',
    resize: true
});

let graphVariety = Morris.Bar({
    element: 'morris-bar-variety',
    data: [{
        name:'null',
        variety: 0
    }],
    xkey: 'name',
    ykeys: ['variety'],
    labels: ['Variety Of Food'],
    hideHover: 'auto',
    resize: true
});

let graphStaffMess = Morris.Bar({
    element: 'morris-bar-staff-mess',
    data: [{
        name:'null',
        staff: 0
    }],
    xkey: 'name',
    ykeys: ['staff'],
    labels: ['Staff Attitude'],
    hideHover: 'auto',
    resize: true
});

let graphExpMess = Morris.Bar({
    element: 'morris-bar-exp-mess',
    data: [{
        name:'null',
        exp: 0
    }],
    xkey: 'name',
    ykeys: ['exp'],
    labels: ['Overall Exp'],
    hideHover: 'auto',
    resize: true
});

const xhrMess = new XMLHttpRequest;
const urlMess = "https://vitapprove.herokuapp.com/graphMessData";
xhrMess.responseType = 'json';
let graphdataMess;

xhrMess.onreadystatechange = () => {
    if (xhrMess.readyState === XMLHttpRequest.DONE) {
        graphdataMess = xhrMess.response;
        if (graphdataMess.length > 0) {
            if (graphQuality !== undefined) {
                let data = [];
                for (let i = 0; i< graphdataMess.length; i++) {
                    data[i] = {name: graphdataMess[i].name, quality: graphdataMess[i].quality};    
                }
                graphQuality.setData(data);
            }
            if (graphUtensils !== undefined) {
                let data = [];
                for (let i = 0; i< graphdataMess.length; i++) {
                    data[i] = {name: graphdataMess[i].name, utensils: graphdataMess[i].utensils};    
                }
                graphUtensils.setData(data);
            }
            if (graphVariety !== undefined) {
                let data = [];
                for (let i = 0; i< graphdataMess.length; i++) {
                    data[i] = {name: graphdataMess[i].name, variety: graphdataMess[i].variety};    
                }
                graphVariety.setData(data);
            }
            if (graphStaffMess !== undefined) {
                let data = [];
                for (let i = 0; i< graphdataMess.length; i++) {
                    data[i] = {name: graphdataMess[i].name, staff: graphdataMess[i].staff};    
                }
                graphStaffMess.setData(data);
            }
            if (graphExpMess !== undefined) {
                let data = [];
                for (let i = 0; i< graphdataMess.length; i++) {
                    data[i] = {name: graphdataMess[i].name, exp: graphdataMess[i].exp};    
                }
                graphExpMess.setData(data);
            }
        }
    }
}
xhrMess.open('GET', urlMess);
xhrMess.send();