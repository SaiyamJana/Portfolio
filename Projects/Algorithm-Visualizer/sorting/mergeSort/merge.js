let arrSize , arrString , arr;
let steps = [];//stores some objects
//type -> "divide" , "merge" , "compare" , "merged"
//indices-> (i , j , k , l) -> for divide i-j for left and k-> l for right
//remaining -> for merge (i,j,k,l) ->similar
//compare -> two indices
//base -> (i , j) -> cant be divided further
//merged -> (i,j) -> indices of merged subarray(start to end)
//array -> current state of array
//highlightLine -> line number to be highlighted

let currentStep = 0;

const codeSnippets = {
    c: [
        "void merge(int arr[], int left, int mid, int right) {",
        "    int n1 = mid - left + 1;",
        "    int n2 = right - mid;",
        "    int* leftArr = (int*)malloc(n1 * sizeof(int));",
        "    int* rightArr = (int*)malloc(n2 * sizeof(int));",
        "    for (int i = 0; i < n1; i++)",
        "        leftArr[i] = arr[left + i];",
        "    for (int j = 0; j < n2; j++)",
        "        rightArr[j] = arr[mid + 1 + j];",
        "    int i = 0, j = 0, k = left;",
        "    while (i < n1 && j < n2) {",
        "        if (leftArr[i] <= rightArr[j]) {",
        "            arr[k] = leftArr[i];",
        "            i++;",
        "        } else {",
        "            arr[k] = rightArr[j];",
        "            j++;",
        "        }",
        "        k++;",
        "    }",
        "    while (i < n1) {", 
        "        arr[k] = leftArr[i];",
        "        i++;",
        "        k++;",
        "    }",
        "    while (j < n2) {",
        "        arr[k] = rightArr[j];",
        "        j++;",
        "        k++;",
        "    }",
        "    free(leftArr);",
        "    free(rightArr);",
        "}",
        "void mergeSort(int arr[], int left, int right) {",
        "    if (left < right) {",
        "        int mid = left + (right - left) / 2;",
        "        mergeSort(arr, left, mid);",
        "        mergeSort(arr, mid + 1, right);",
        "        merge(arr, left, mid, right);",
        "    }",
        "}"
    ],
    javascript: [
        "function merge(arr, left, mid, right) {",
        "    const leftArr = arr.slice(left, mid + 1);",
        "    const rightArr = arr.slice(mid + 1, right + 1);",
        "    let i = 0, j = 0, k = left;",
        "    while (i < leftArr.length && j < rightArr.length) {",
        "        if (leftArr[i] <= rightArr[j]) {",
        "            arr[k] = leftArr[i];",
        "            i++;",
        "        } else {",
        "            arr[k] = rightArr[j];",
        "            j++;",
        "        }",
        "        k++;",
        "    }",
        "    while (i < leftArr.length) {",
        "        arr[k] = leftArr[i];",
        "        i++;",
        "        k++;",
        "    }",
        "    while (j < rightArr.length) {",
        "        arr[k] = rightArr[j];",
        "        j++;",
        "        k++;",
        "    }",
        "}",
        "function mergeSort(arr, left, right) {",
        "    if (left < right) {",
        "        const mid = Math.floor((left + right) / 2);",
        "        mergeSort(arr, left, mid);",
        "        mergeSort(arr, mid + 1, right);",
        "        merge(arr, left, mid, right);",
        "    }",
        "}"
    ],
    python: [
        "def merge(arr, left, mid, right):",
        "    leftArr = arr[left:mid + 1]",
        "    rightArr = arr[mid + 1:right + 1]",
        "    i = j = 0",
        "    k = left",
        "    while i < len(leftArr) and j < len(rightArr):",
        "        if leftArr[i] <= rightArr[j]:",
        "            arr[k] = leftArr[i]",
        "            i += 1",
        "        else:",
        "            arr[k] = rightArr[j]",
        "            j += 1",
        "        k += 1",
        "    while i < len(leftArr):",
        "        arr[k] = leftArr[i]",
        "        i += 1",
        "        k += 1",
        "    while j < len(rightArr):",
        "        arr[k] = rightArr[j]",
        "        j += 1",
        "        k += 1",
        "def mergeSort(arr, left, right):",
        "    if left < right:",
        "        mid = (left + right) // 2",
        "        mergeSort(arr, left, mid)",
        "        mergeSort(arr, mid + 1, right)",
        "        merge(arr, left, mid, right)"
    ],
    java: [
        "public class MergeSort {",
        "    public static void merge(int[] arr, int left, int mid, int right) {",
        "        int n1 = mid - left + 1;",
        "        int n2 = right - mid;",
        "        int[] leftArr = new int[n1];",
        "        int[] rightArr = new int[n2];",
        "        for (int i = 0; i < n1; i++)",
        "            leftArr[i] = arr[left + i];",
        "        for (int j = 0; j < n2; j++)",
        "            rightArr[j] = arr[mid + 1 + j];",
        "        int i = 0, j = 0, k = left;",
        "        while (i < n1 && j < n2) {",
        "            if (leftArr[i] <= rightArr[j]) {",
        "                arr[k] = leftArr[i];",
        "                i++;",
        "            } else {",
        "                arr[k] = rightArr[j];",
        "                j++;",
        "            }",
        "            k++;",
        "        }",
        "        while (i < n1) {",
        "            arr[k] = leftArr[i];",
        "            i++;",
        "            k++;",
        "        }",
        "        while (j < n2) {",
        "            arr[k] = rightArr[j];",
        "            j++;",
        "            k++;",
        "        }",
        "    }",
        "    public static void mergeSort(int[] arr, int left, int right) {",
        "        if (left < right) {",
        "            int mid = left + (right - left) / 2;",
        "            mergeSort(arr, left, mid);",
        "            mergeSort(arr, mid + 1, right);",
        "            merge(arr, left, mid, right);",
        "        }",
        "    }",
        "}"
    ],
    cpp: [
        "void merge(vector<int>& arr, int left, int mid, int right) {",
        "    int n1 = mid - left + 1;",
        "    int n2 = right - mid;",
        "    vector<int> leftArr(n1);",
        "    vector<int> rightArr(n2);",
        "    for (int i = 0; i < n1; i++)",
        "        leftArr[i] = arr[left + i];",
        "    for (int j = 0; j < n2; j++)",
        "        rightArr[j] = arr[mid + 1 + j];",
        "    int i = 0, j = 0, k = left;",
        "    while (i < n1 && j < n2) {",
        "        if (leftArr[i] <= rightArr[j]) {",
        "            arr[k] = leftArr[i];",
        "            i++;",
        "        } else {",
        "            arr[k] = rightArr[j];",
        "            j++;",
        "        }",
        "        k++;",
        "    }",
        "    while (i < n1) {",
        "        arr[k] = leftArr[i];",
        "        i++;",
        "        k++;",
        "    }",
        "    while (j < n2) {",
        "        arr[k] = rightArr[j];",
        "        j++;",
        "        k++;",
        "    }",
        "}",
        "void mergeSort(vector<int>& arr, int left, int right) {",
        "    if (left < right) {",
        "        int mid = left + (right - left) / 2;",
        "        mergeSort(arr, left, mid);",
        "        mergeSort(arr, mid + 1, right);",
        "        merge(arr, left, mid, right);",
        "    }",
        "}"
    ]
};

let currentLanguage = "";

const highLightMap = {
    c: {},
    javascript: {},
    python: {},
    java: {},
    cpp: {}
}

//get the current language
document.getElementById("language-btn").addEventListener("click", () => {
    currentLanguage = document.getElementById("languageSelect").ariaValueMax;
    renderCodeSnippet();
})

function renderCodeSnippet(highlightLine = -1){

}

//taking the values from user
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
    if(!step) return;//safety check

    //reset all boxes
    boxes.forEach(box => {
        box.style.marginLeft = "0px";
        box.style.marginRight = "0px";
        box.style.backgroundColor = "#90caf9";
        box.style.color = "#0d47a1";
        box.style.fontWeight = "normal";
        box.style.border = "0.2rem solid #1565c0";
    });

    //value updation for that step
    step.array.forEach((value, index) => {
        boxes[index].textContent = value;
    });

    let comment = "";
    if(step.type == "divide"){
        comment = `Dividing array from index ${step.indices[0]} to ${step.indices[1]} and ${step.indices[2]} to ${step.indices[3]}`;
        // Left subarray highlight (green shades)
        for (let i = step.indices[0]; i <= step.indices[1]; i++) {
            boxes[i].style.backgroundColor = "#a5d6a7";   // light green
            boxes[i].style.color = "#1b5e20";             // dark green text
            boxes[i].style.fontWeight = "bold";
            boxes[i].style.border = "0.2rem solid #2e7d32"; // medium green border
            
        }

        // Right subarray highlight (orange shades)
        for (let j = step.indices[2]; j <= step.indices[3]; j++) {
            boxes[j].style.backgroundColor = "#ffcc80";   // light orange
            boxes[j].style.color = "#e65100";             // dark orange text
            boxes[j].style.fontWeight = "bold";
            boxes[j].style.border = "0.2rem solid #ef6c00"; // medium orange border
        }
        boxes[step.indices[2]].style.marginLeft = "10px";
    }
    else if(step.type == "merge"){
        comment = `Merging arrays from index ${step.indices[0]} to ${step.indices[1]} and ${step.indices[2]} to ${step.indices[3]}`;
        // Merged array highlight (teal shades)
        // Left subarray values being merged (light yellow)
        for (let i = step.indices[0]; i <= step.indices[1]; i++) {
            boxes[i].style.backgroundColor = "#fff59d";   // light yellow
            boxes[i].style.color = "#f57f17";             // dark golden text
            boxes[i].style.fontWeight = "bold";
            boxes[i].style.border = "0.2rem solid #fbc02d"; // golden border
        }

        // Right subarray values being merged (amber yellow-orange)
        for (let j = step.indices[2]; j <= step.indices[3]; j++) {
            boxes[j].style.backgroundColor = "#ffe082";   // amber yellow
            boxes[j].style.color = "#e65100";             // deep orange text
            boxes[j].style.fontWeight = "bold";
            boxes[j].style.border = "0.2rem solid #ff8f00"; // amber border
        }
        boxes[step.indices[2]].style.marginLeft = "0px";
    }
    else if(step.type == "compare"){
        comment = `Comparing elements at index ${step.indices[0]} and ${step.indices[1]}`;  
        boxes[step.indices[0]].style.backgroundColor = "#f48fb1"; // light pink
        boxes[step.indices[0]].style.color = "#880e4f"; // dark pink text
        boxes[step.indices[0]].style.fontWeight = "bold";
        boxes[step.indices[0]].style.border = "0.2rem solid #ad1457"; // medium pink border
        boxes[step.indices[1]].style.backgroundColor = "#f48fb1"; // light pink
        boxes[step.indices[1]].style.color = "#880e4f"; // dark pink text
        boxes[step.indices[1]].style.fontWeight = "bold";
        boxes[step.indices[1]].style.border = "0.2rem solid #ad1457"; // medium pink border
    }
    else if(step.type == "remaining"){
        comment = `Adding remaining elements from index ${step.indices[0]} to ${step.indices[1]} and ${step.indices[2]} to ${step.indices[3]}`;
        for (let i = step.indices[0]; i <= step.indices[1]; i++) {
            boxes[i].style.backgroundColor = "#ce93d8";   // light purple
            boxes[i].style.color = "#4a148c";             // dark purple text
            boxes[i].style.fontWeight = "bold";
            boxes[i].style.border = "0.2rem solid #6a1b9a"; // medium purple border
        }
        for (let j = step.indices[2]; j <= step.indices[3]; j++) {
            boxes[j].style.backgroundColor = "#82518bff";   // light purple
            boxes[j].style.color = "#2c055cff";             // dark purple text
            boxes[j].style.fontWeight = "bold";
            boxes[j].style.border = "0.2rem solid #450f66ff"; // medium purple border
        }
    }
    else if(step.type == "base"){
        comment = `Base case reached for indices ${step.indices[0]} to ${step.indices[1]}`;
        boxes[step.indices[0]].style.backgroundColor = "#b0bec5"; // light grey
        boxes[step.indices[0]].style.color = "#263238"; // dark grey text
        boxes[step.indices[0]].style.fontWeight = "bold";
        boxes[step.indices[0]].style.border = "0.2rem solid #37474f"; // medium grey border
        if(step.indices[0] !== step.indices[1]){
            boxes[step.indices[1]].style.backgroundColor = "#b0bec5"; // light grey
            boxes[step.indices[1]].style.color = "#263238"; // dark grey text
            boxes[step.indices[1]].style.fontWeight = "bold";
            boxes[step.indices[1]].style.border = "0.2rem solid #37474f"; // medium grey border
        }
    }
    else if(step.type == "merged"){
        comment = `Merged array from index ${step.indices[0]} to ${step.indices[1]}`;
        //black tone
        for(let i = step.indices[0]; i <= step.indices[1]; i++){
            boxes[i].style.backgroundColor = "#212121"; // dark black-grey
            boxes[i].style.color = "#ffffff";           // white text
            boxes[i].style.fontWeight = "bold";
            boxes[i].style.border = "0.2rem solid #000000"; // pure black border
        }
    }
    let commentDiv = document.getElementById("stepComment");
    if(commentDiv){
        commentDiv.textContent = comment;
    }
    renderCodeSnippet(step.highlightLine);
    const visualizationArea = document.getElementById("arrayVisualization");
    visualizationArea.scrollTo(0 , 0);//scroll to top
}


function mergeSort(left , right){
    if(left >= right) {
        steps.push({
            type : "base" , 
            indices : [left , right] , 
            array : [...arr] , 
            highlightLine : 0
        })
        return;
    }
    let mid = Math.floor((left + right) / 2);
    steps.push({
        type : "divide",
        indices : [left , mid , mid + 1 , right],
        array : [...arr],
        highlightLine : 0
    })
    mergeSort(left , mid);
    mergeSort(mid + 1 , right);
    steps.push({
        type : "merge" ,
        indices : [left , mid , mid + 1 , right],
        array : [...arr],
        highlightLine : 0
    })
    merge(left , mid , right);
    steps.push({
        type : "merged" ,
        indices : [left , right],
        array : [...arr],
        highlightLine : 0
    })
}

function merge(left , mid , right){
    let leftArr = [];
    let rightArr = [];
    for(let i = left; i <= mid; i++){
        leftArr.push(arr[i]);
    }
    for(let j = mid + 1; j <= right; j++){
        rightArr.push(arr[j]);
    }
    let i = 0 , j = 0 , k = left;
    while(i < leftArr.length && j < rightArr.length){
        steps.push({
            type : "compare" ,
            indices : [left + i , mid + 1 + j],
            array : [...arr],
            highlightLine : 0
        })
        if(leftArr[i] <= rightArr[j]){
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    steps.push({
        type : "remaining" ,
        indices : [left + i , mid , mid + 1 + j , right],
        array : [...arr],
        highlightLine : 0
    })
    while(i < leftArr.length){
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    while(j < rightArr.length){
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

document.getElementById("prevStep").addEventListener("click" , () =>{
    if(currentStep > 0){
        currentStep--;
        renderStep(currentStep);
    }else{
        alert("This is the first step");
    }
});

document.getElementById("nextStep").addEventListener("click" , () =>{
    if(currentStep < steps.length - 1){
        currentStep++;
        renderStep(currentStep);
    }else{
        alert("This is the last step");
    }
});

//sortButton
document.getElementById("sortButton").addEventListener("click" , () =>{
    if(!arr || arr.length === 0){
        alert("Please generate the array first");
        return;
    }
    currentStep = 0;
    mergeSort(0 , arr.length - 1);
    renderStep(0);
})