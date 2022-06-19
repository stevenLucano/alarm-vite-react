// worker.js

// let intervalTime = "";

const workerCode = () => {
  self.onmessage = function (e) {
    // intervalTime = "";

    console.log("Mensaje: " + e.data);
    let [mess, seg] = e.data.split(",");
    seg = parseInt(seg);
    if (mess == "Start") {
      // clearInterval(intervalTime);
      intervalTime = setInterval(() => {
        // console.log(seg);
        // console.log("Hello guys");
        seg--;
        self.postMessage(seg);
      }, 200);
    } else {
      try {
        clearInterval(intervalTime);
      } catch (error) {
        // console.log(error);
      }

      self.postMessage(seg);
    }
  };
};

let code = workerCode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
