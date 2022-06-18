// worker.js

let intervalTime = "";

const workerCode = () => {
  self.onmessage = function (e) {
    console.log("Mensaje: " + e.data);
    let [mess, seg] = e.data.split(",");
    if (mess == "Start") {
      intervalTime = setInterval(() => {
        // console.log("Hello guys");
        seg--;
        self.postMessage(seg);
      }, 1000);
    } else {
      clearInterval(intervalTime);
      self.postMessage(seg);
    }
  };
};

let code = workerCode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
