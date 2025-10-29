let arrSize , arrString , arr;
let steps = [];//stores some objects
//type -> "keyValue" , "compare" , "shifting" , "insertKey"
//indices -> array of indices involved in the operation
//array -> state of array at that step
//key -> key value being inserted (for "keyValue" type)
//highlightLine -> line number to highlight in code snippet (for code rendering)
let currentStep = 0;

//code lines
const codeSnippets = {
    c: [
        "void insertionSort(int arr[], int size) {",               //0
        "    for (int i = 1; i < size; i++) {",
        "        int key = arr[i];",                                //2
        "        int j = i - 1;",                                   //3
        "        while (j >= 0 && arr[j] > key) {",                //4
        "            arr[j + 1] = arr[j];",                         //5
        "            j--;",
        "        }",
        "        arr[j + 1] = key;",                                //8
        "    }",
        "}"
    ],
    javascript: [
        "function insertionSort(arr) {",                            //0
        "  for (let i = 1; i < arr.length; i++) {",
        "    let key = arr[i];",                                    //2
        "    let j = i - 1;",                                       //3
        "    while (j >= 0 && arr[j] > key) {",                    //4
        "      arr[j + 1] = arr[j];",                               //5
        "      j--;",
        "    }",
        "    arr[j + 1] = key;",                                    //8
        "  }",
        "}"
    ],
    python: [
        "def insertion_sort(arr):",                                 //0
        "    for i in range(1, len(arr)):",
        "        key = arr[i]",                                     //2
        "        j = i - 1",                                        //3
        "        while j >= 0 and arr[j] > key:",                  //4
        "            arr[j + 1] = arr[j]",                          //5
        "            j -= 1",
        "        arr[j + 1] = key",                                 //8
        "    return arr"
    ],
    java: [
        "public class InsertionSort {",                             //0
        "    public static void insertionSort(int[] arr) {",
        "        for (int i = 1; i < arr.length; i++) {",
        "            int key = arr[i];",                            //2
        "            int j = i - 1;",                               //3
        "            while (j >= 0 && arr[j] > key) {",            //4
        "                arr[j + 1] = arr[j];",                     //5
        "                j--;",
        "            }",
        "            arr[j + 1] = key;",                            //8
        "        }",
        "    }",
        "}"
    ],
    cpp: [
        "void insertionSort(int arr[], int size) {",               //0
        "    for (int i = 1; i < size; i++) {",
        "        int key = arr[i];",                                //2
        "        int j = i - 1;",                                   //3
        "        while (j >= 0 && arr[j] > key) {",                //4
        "            arr[j + 1] = arr[j];",                         //5
        "            j--;",
        "        }",
        "        arr[j + 1] = key;",                                //8
        "    }",
        "}"
    ]
};

let currentLanguage = "c";

//highlight lines for specific type operation
const highLightMap = {
    c: {
        keyValue: 2,
        compare: 4,
        shifting: 5,
        insertKey: 8
    },
    javascript: {
        keyValue: 2,
        compare: 4,
        shifting: 5,
        insertKey: 8
    },
    python: {
        keyValue: 2,
        compare: 4,
        shifting: 5,
        insertKey: 8
    },
    java: {
        keyValue: 2,
        compare: 4,
        shifting: 5,
        insertKey: 8
    },
    cpp: {
        keyValue: 2,
        compare: 4,
        shifting: 5,
        insertKey: 8
    }
}

//get the language selected from dropdown
document.getElementById("language-btn").addEventListener("click" , ()=>{
    currentLanguage = document.getElementById("languageSelect").value;
    renderCodeSnippet();
});

function renderCodeSnippet(highlightLine = -1){
    const codeBox = document.getElementById("codeSnippet");
    codeBox.innerHTML = "";
    codeSnippets[currentLanguage].forEach((line, idx) => {
        const lineElement = document.createElement("div");
        lineElement.textContent = line;
        if (idx === highlightLine) {
            lineElement.style.backgroundColor = "yellow";
            lineElement.style.fontWeight = "bold";
            lineElement.style.color = "black";
        }
        codeBox.appendChild(lineElement);
    });
}


//taking the values
document.getElementById("generateArray").addEventListener("click", () => {
    arrSize = parseInt(document.getElementById("arraySize").value , 10);
    arrString = document.getElementById("arrayElements").value;
    arr = arrString.split(",").map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));

    //generate random values if required no of values did't get
    if(arr.length !== arrSize){
        let elementsNeeded = arrSize - arr.length;
        for(let i = 0; i < elementsNeeded; i++){
            arr.push(Math.floor(Math.random() * 100));
        }
    }

    createBoxes();
});

function createBoxes(){
    const container = document.getElementById("arrayVisualization");
    container.innerHTML = "";
    arr.forEach((value) => {
        const box = document.createElement("div");
        box.className = "box";
        box.textContent = value;
        container.appendChild(box);
    });
}

function renderStep(stepIndex){
    const boxes = document.querySelectorAll(".box");
    const step = steps[stepIndex];
    if(!step) return;// safety check
    //reset all boxes to default
    boxes.forEach(box => {
        box.style.backgroundColor = "#90caf9";
        box.style.color = "#0d47a1";
        box.style.fontWeight = "normal";
        box.style.border = "0.2rem solid #1565c0";
    });
    //step logic
    step.array.forEach((val, i) => { 
        boxes[i].textContent = val; 
    });

    let comment = "";
    if(step.type === "keyValue"){
        comment = `Key value to insert: ${step.key}`;
        step.indices.forEach(idx => {
            boxes[idx].style.backgroundColor = "#ffeb3b"; // Yellow for key
            boxes[idx].style.color = "black";
            boxes[idx].style.fontWeight = "bold";
            boxes[idx].style.border = "0.2rem solid #fbc02d";
        });
    }
    else if(step.type === "affected"){
        comment = `Elements from index 0 to ${step.indices[0]} are considered for insertion of key ${step.key}`;
        step.indices.forEach(idx => {
            boxes[idx].style.backgroundColor = "#2be612ff"; // Light Blue for affected
            boxes[idx].style.color = "black";
            boxes[idx].style.fontWeight = "bold";
            boxes[idx].style.border = "0.2rem solid #07f0e0ff";
        });
        boxes[key].style.backgroundColor = "#ffeb3b"; // Yellow for key
        boxes[key].style.color = "black";
        boxes[key].style.fontWeight = "bold";
        boxes[key].style.border = "0.2rem solid #fbc02d";
    }
    else if(step.type === "compare"){
        comment = `Comparing key ${step.key} with element at index ${step.indices[0]} (value: ${step.array[step.indices[0]]})`;
        step.indices.forEach(idx => {
            boxes[idx].style.backgroundColor = "#ff9800"; // Orange for comparison
            boxes[idx].style.color = "white";
            boxes[idx].style.fontWeight = "bold";
            boxes[idx].style.border = "0.2rem solid #f57c00";
        });
    }
    else if(step.type === "shifting"){
        comment = `Shifting element at index ${step.indices[0]} (value: ${step.array[step.indices[0]]}) to index ${step.indices[1]}`;
        step.indices.forEach(idx => {
            boxes[idx].style.backgroundColor = "#f44336"; // Red for shifting
            boxes[idx].style.color = "white";
            boxes[idx].style.fontWeight = "bold";
            boxes[idx].style.border = "0.2rem solid #d32f2f";
        });
    }
    else if(step.type === "insertKey"){
        comment = `Inserting key ${step.key} at index ${step.indices[0]}`;
        step.indices.forEach(idx => {
            boxes[idx].style.backgroundColor = "#4caf50"; // Green for insertion
            boxes[idx].style.color = "white";
            boxes[idx].style.fontWeight = "bold";
            boxes[idx].style.border = "0.2rem solid #388e3c";
        });
    }
    let commentDiv = document.getElementById("stepComment");
    if(commentDiv){
        commentDiv.innerHTML = comment;
    }
    renderCodeSnippet(step.highlightLine);//highlight code line
    const visualizationArea = document.getElementById("arrayVisualization");
    visualizationArea.scrollTo(0 , 0);//scroll to top of visualization
}

function insertionSort(){
    steps = [];
    const size = arr.length;    
    let tempArr = [...arr]; // Create a copy of the original array to avoid modifying it directly
    for (let i = 1; i < size; i++) {
        let key = tempArr[i];
        steps.push({type : "keyValue" , indices : [i] , array : [...tempArr] , key : key , highlightLine : highLightMap[currentLanguage].keyValue});
        let j = i - 1;  // declare outside
        //indices from j to 0 is affected
        let affectedIndices = [];
        for(let k = j; k >= 0; k--){
            affectedIndices.push(k);
        }
        steps.push({type : "affected" , indices : [...affectedIndices] , array : [...tempArr] , key : i , highlightLine : -1});//no line to highlight
        while (j >= 0 && tempArr[j] > key) {
            steps.push({type : "compare" , indices : [j , i] , array : [...tempArr] ,key : key , highlightLine : highLightMap[currentLanguage].compare});
            tempArr[j + 1] = tempArr[j];
            steps.push({type : "shifting" , indices : [j , j + 1] , array : [...tempArr] ,key : key, highlightLine : highLightMap[currentLanguage].shifting});
            j--;
        }
        tempArr[j + 1] = key;
        steps.push({type : "insertKey" , indices : [j + 1] , array : [...tempArr] , key : key , highlightLine : highLightMap[currentLanguage].insertKey});
    }
renderStep(0);//render the first step
}

//prev step button and next step button
document.getElementById("prevStep").addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
    }else{
        alert("This is the first step");
    }
});

document.getElementById("nextStep").addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
    }else{
        alert("This is the last step");
    }
});

//sort button
document.getElementById("sortButton").addEventListener("click", () => {
    if(!arr || arr.length === 0){
        alert("Please generate the array first.");
        return;
    }
    currentStep = 0;
    insertionSort();
});