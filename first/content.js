let div = document.createElement("div");
div.id = "suggestion-div";
div.style.display="none";
let input = document.getElementsByTagName('input');

function addParaInDiv(value,afterElement){
  let insideDiv = document.createElement("div");
  insideDiv.textContent = value;
  div.append(insideDiv);
  insideDiv.addEventListener("click",function(){
    afterElement.value = insideDiv.textContent;
  })
}
if(input){
  for(let i in input)
  {
    if(input[i].type == "text")
    {
    input[i].addEventListener("click", function(){
      // console.log(div);
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      this.after(div);
      div.style.display="block";
      chrome.storage.sync.get(['value'], function(e) {
        // console.log(e);
        let suggestions = JSON.parse(e.value);
        suggestions.map((items)=>{
          // console.log(items);
          addParaInDiv(items,input[i]);
        });
      });
    })
  }
}
}
//hide div on clicking somewhere else
//     document.onclick = function(e){
//       console.log(e);
//        if(e.target.id != 'suggestion-div'){
//           // if(div.style.display == "block")
//           //   {div.style.display = 'none'}
//           // else {
//           //   console.log(div.style.display);
//           // }
//     console.log("!==");
//        }
// else       console.log("==");
//     };

// console.log(input);
function saveChanges(theValue) { //new item copied

  // Check that there's some code there.
  if (!theValue) {
    console.log('Error: No value specified');
    return;
  }

  //to delete previous values in div
    chrome.storage.sync.get(['value'], function(e) {
    let prev = e.value?JSON.parse(e.value):[];
    // console.log(prev);

    prev.push(theValue);
    // console.log(prev);
    chrome.storage.sync.set({'value': JSON.stringify(prev)}, function() {
      // Notify that we saved.
      console.log('Data saved');
    });
  });
}



// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   // console.log(changes);
//       for (var key in changes) {
//         var storageChange = changes[key];
//         let new = JSON.parse(storageChange.newValue).slice(-1);
//         if(new)
//           {
//             let p = document.createElement("p");
//             p.textContent = items;
//             div.append(p);
//             p.addEventListener("click",function(){
//               afterElement.value = p.textContent;
//             })
//           }
//       }
//     });


//
document.addEventListener("copy",function(e){
  let copied = window.getSelection().toString();
  // console.log(copied);

  copied?saveChanges(copied.trim()):console.log("copy invalid");
  });
// console.log(div);
