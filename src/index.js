import axios from "axios";

addEventListener("DOMContentLoaded", () => {
  const tattooForm = document.querySelector("#tattooForm");

  tattooForm.onsubmit = async function (e) {
    e.preventDefault();
    swapButtons();
    let description = e.target.description.value;
    let style = e.target["style-type"].value;
    let color = e.target["color-preference"].value;
    console.log(color);

    try {
      const response = await axios.post("http://localhost:3000/submit-form", {
        description: description,
        style: style,
        color: color,
      });
      console.log("Server Response:", response.data.result);

      if (response.status === 200) {
        let img = document.querySelector("#toChange");
        img.src = response.data.result;

        setTimeout(() => {
          swapButtons();
        }, "1000");
      } else {
        console.error("Server responded with an error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
});

function swapButtons() {
  const btnLoading = document.querySelector("#btn-loading");
  const btnSubmit = document.querySelector("#btn-submit");

  btnLoading.classList.toggle("hidden");
  btnSubmit.classList.toggle("hidden");
}
