function fetchData(state) {
  return new Promise((resolve, reject) => {
      if (state) {
          resolve("success");
      } else {
          reject("error");
      }
  });
}

Promise.all([fetchData(true), fetchData(false)])
  .then((data) => console.log(data))   // 這行不會執行，因為有一個 Promise 失敗
  .catch((error) => console.log(error)); // 這行會執行

//print====>error

  
