console.log("normal:"); 
for (var i = 0; i < 5; i++) {
      console.log(i); 
}


setTimeout(() => { 
  console.log("var:"); 
}, 1000); 
for (var i = 0; i < 5; i++) {
  setTimeout(() => { 
      console.log(i); 
  }, 1000); 
}
setTimeout(() => { 
  console.log("let:"); 
}, 1000); 
for (let i = 0; i < 5; i++) {
  setTimeout(() => { 
      console.log(i); 
  }, 1000); 
}

setTimeout(() => { 
  console.log("IIFE:"); 
}, 1000); 

for (var i = 0; i < 5; i++) {
  (function(i) {
      setTimeout(() => { 
          console.log(i); 
      }, 1000);
  })(i);
}