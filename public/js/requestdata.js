let graphDistance = Morris.Bar({
    element: 'morris-bar-distance',
    data: [{
        name:'null',
        distance: 0
    }],
    xkey: 'name',
    ykeys: ['distance'],
    labels: ['Average Distance'],
    hideHover: 'auto',
    resize: true
});

let graphInfra = Morris.Bar({
    element: 'morris-bar-infra',
    data: [{
        name:'null',
        infra: 0
    }],
    xkey: 'name',
    ykeys: ['infra'],
    labels: ['State Of Infrastructure'],
    hideHover: 'auto',
    resize: true
});

let graphClean = Morris.Bar({
    element: 'morris-bar-clean',
    data: [{
        name:'null',
        clean: 0
    }],
    xkey: 'name',
    ykeys: ['clean'],
    labels: ['Average Cleanliness'],
    hideHover: 'auto',
    resize: true
});

let graphStaff = Morris.Bar({
    element: 'morris-bar-staff',
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

let graphRoom = Morris.Bar({
    element: 'morris-bar-room',
    data: [{
        name:'null',
        mess: 0
    }],
    xkey: 'name',
    ykeys: ['room'],
    labels: ['Average Room Size'],
    hideHover: 'auto',
    resize: true
});

let graphLift = Morris.Bar({
    element: 'morris-bar-lift',
    data: [{
        name:'null',
        lift: 0
    }],
    xkey: 'name',
    ykeys: ['lift'],
    labels: ['No of lift'],
    hideHover: 'auto',
    resize: true
});

let graphExp = Morris.Bar({
    element: 'morris-bar-exp',
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


const xhr = new XMLHttpRequest;
const url = "https://vitapprove.herokuapp.com/graphData";
xhr.responseType = 'json';
let graphdata;

xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        graphdata = xhr.response;
        if (graphdata.length > 0) {
            if (graphDistance !== undefined) {
                let data = [];
                for (let i = 0; i< graphdata.length; i++) {
                    data[i] = {name: graphdata[i].name, distance: graphdata[i].distance};    
                }
                graphDistance.setData(data);
            }
            if (graphInfra !== undefined) {
                let data = [];
                for (let i = 0; i< graphdata.length; i++) {
                    data[i] = {name: graphdata[i].name, infra: graphdata[i].infra};    
                }
                graphInfra.setData(data);
            }
            if (graphClean !== undefined) {
                let data = [];
                for (let i = 0; i< graphdata.length; i++) {
                    data[i] = {name: graphdata[i].name, clean: graphdata[i].clean};    
                }
                graphClean.setData(data);
            }
            if (graphStaff !== undefined) {
                let data = [];
                for (let i = 0; i< graphdata.length; i++) {
                    data[i] = {name: graphdata[i].name, staff: graphdata[i].staff};    
                }
                graphStaff.setData(data);
            }
            if (graphRoom !== undefined) {
                let data = [];
                for (let i = 0; i< graphdata.length; i++) {
                    data[i] = {name: graphdata[i].name, room: graphdata[i].room};    
                }
                graphRoom.setData(data);
            }
            if (graphLift !== undefined) {
                let data = [];
                for (let i = 0; i< graphdata.length; i++) {
                    data[i] = {name: graphdata[i].name, lift: graphdata[i].lift};    
                }
                graphLift.setData(data);
            }
            if (graphExp !== undefined) {
                let data = [];
                for (let i = 0; i< graphdata.length; i++) {
                    data[i] = {name: graphdata[i].name, exp: graphdata[i].exp};    
                }
                graphExp.setData(data);
            }
        }
    }
}
xhr.open('GET', url);
xhr.send();
