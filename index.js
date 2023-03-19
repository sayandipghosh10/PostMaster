


let contentTypeContainer = document.getElementById("contentTypeContainer");
contentTypeContainer.style.display = "none";
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";
let requestJsonBox = document.getElementById("requestJsonBox");
requestJsonBox.style.display = "none";


function addPrarams(str) {
    let newParamDiv = document.createElement('div');
    newParamDiv.innerHTML = str;
    return newParamDiv;
}

let getRadioBtn = document.getElementById("get");
getRadioBtn.addEventListener("click", () => {
    contentTypeContainer = document.getElementById("contentTypeContainer");
    contentTypeContainer.style.display = "none";
    parametersBox = document.getElementById("parametersBox");
    parametersBox.style.display = "none";
    requestJsonBox = document.getElementById("requestJsonBox");
    requestJsonBox.style.display = "none";

    let jsonRadio = document.getElementById("jsonRadio");
    let paramsRadio = document.getElementById("paramsRadio");
    if (jsonRadio.checked === true) {
        jsonRadio.checked = false;
    }
    if (paramsRadio.checked === true) {
        paramsRadio.checked = false;
    }


});

let postRadioBtn = document.getElementById("post");
postRadioBtn.addEventListener("click", () => {
    contentTypeContainer = document.getElementById("contentTypeContainer");
    contentTypeContainer.style.display = "block";
});


let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    requestJsonBox = document.getElementById("requestJsonBox");
    requestJsonBox.style.display = "block";
    parametersBox = document.getElementById("parametersBox");
    parametersBox.style.display = "none";
});

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    parametersBox = document.getElementById("parametersBox");
    parametersBox.style.display = "block";
    requestJsonBox = document.getElementById("requestJsonBox");
    requestJsonBox.style.display = "none";

});


// Add parameters using add button

let addParamBtn = document.getElementById("addParam");
let paramNums=0;
addParamBtn.addEventListener("click", () => {
    
    let addParamHTML = ` <div class="form-row my-2 addedParam commonParam">
                            <label for="url" class="col-sm-2 col-form-label">Parameter</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${paramNums+2}" placeholder="Enter Parameter Key">
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterValue${paramNums+2}" placeholder="Enter Parameter Value">
                            </div>
                            <button class="btn btn-primary deleteParam">-</button>
                        </div>`

    let newAddedParam = addPrarams(addParamHTML);
    document.getElementById("parametersBox").appendChild(newAddedParam);

    // Delete parameters using del button
    let deleteParam = document.getElementsByClassName('deleteParam');

    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        });
    }
    paramNums++;
});





let submit=document.getElementById("submit");
submit.addEventListener("click",()=>{

    let urlValue=document.getElementById("url").value;
    let requestTypeValue = document.querySelector("input[name='requestType']:checked").value;
    // console.log(requestTypeValue);
    let contentTypeValue;
    if(requestTypeValue==="POST"){
        contentTypeValue = document.querySelector("input[name='contentType']:checked").value;
    } 
    let data = {};
    if(contentTypeValue === "params"){
        let allParams =Array.from(document.getElementsByClassName("commonParam"));
        for (let i = 0; i < allParams.length; i++) {
                let key =allParams[i].children[1].children[0].value;
                let value =allParams[i].children[2].children[0].value;
                data[key]=value;
            
        }
        data = JSON.stringify(data);
    }
    else{
        data=document.getElementById("requestJsonText").value;
    }

    if(requestTypeValue === "GET"){
        
        fetch(urlValue,{
            method:"GET"
        })
        .then((response)=>{
           return response.text();
            
        })
        .then((text)=>{       
           return document.getElementById("responseJsonText").innerHTML=text;
        //    return document.getElementById('responsePrism').innerHTML = text;
        //    Prism.highlightAll();
        });

    }
    else{
        fetch(urlValue, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responseJsonText').value = text;
            // document.getElementById('responsePrism').innerHTML = text;
            // Prism.highlightAll();
        });

    }
    

});

