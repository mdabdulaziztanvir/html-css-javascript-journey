import { IPINFO_TOken } from "../../exports/config.js";
const other_ip_details_ul = document.getElementById("other-ip-details-ul");

function ipinfo_api(ipValue) {
  return `https://api.ipinfo.io/lite/${ipValue}?token=${IPINFO_TOken}`;
}
const ip_flash_button = document.getElementById("ip-flash-button");
ip_flash_button.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(ipinfo_api("me"), {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (!res.ok) {
      console.error("request failed from response");
    }

    const result = await res.json();
    // show the data to frontend
    const ipinfo_ip = document.getElementById("ipinfo_ip");

    ipinfo_ip.textContent = "Your IP is : " + result.ip;
    localStorage.setItem("ipinfo_ip_result", result.ip);
    other_ip_details_ul.innerHTML = "";

    const results_fields = [
      `ISP number: ${result.asn}`,
      `ISP name: ${result.as_name}`,
      `domain: ${result.as_domain}`,
      `country: ${result.country}`,
      `country code:${result.country_code}`,
      `continent: ${result.continent}`,
    ];
    const strng_c = JSON.stringify(results_fields);
    localStorage.setItem("strng_c", strng_c);
    // other_ip_details_ul.innerHTML = "";

    results_fields.forEach((result_field) => {
      const li = document.createElement("li");

      li.textContent = result_field;
      li.classList.add("font-bold");
      other_ip_details_ul.append(li);
    });
  } catch (error) {
    console.error("Ip me error : " + error.message);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const prev_me_ip_datas = localStorage.getItem("strng_c");
  const parsedJsons = JSON.parse(prev_me_ip_datas);

  const ipinfo_ip_result = localStorage.getItem("ipinfo_ip_result");

  if (!ipinfo_ip_result) {
    ipinfo_ip.textContent = "First click upper button";
  } else {
    ipinfo_ip.textContent = "Your IP is : " + ipinfo_ip_result;
  }
  // console.log(ipinfo_ip);
  if (parsedJsons) {
    parsedJsons.forEach((prev_me_ip_data) => {
      // console.log(prev_me_ip_data);
      const li = document.createElement("li");
      li.textContent = prev_me_ip_data;
      li.classList.add("font-bold");
      other_ip_details_ul.append(li);
    });
  }

  // console.log(parsedJsons);
});

const manual_ip_value = document.getElementById("manual-ip-input");

const manual_ip_submit = document.getElementsByClassName("manual-ip-submit");
// console.log(manual_ip_submit);

// left side manual ip description
manual_ip_submit[0].addEventListener("click", async (e) => {
  try {
    const res = await fetch(ipinfo_api(manual_ip_value.value), {
      method: "GET",
    });
    if (!res.ok) {
      console.error("something wrong from manual ip input");
    }
    const result = await res.json();
    const manual_ip_input = document.getElementById("manual-ip-output");
    if (result.error) {
      // console.log(result.error);
      if (
        result.error.includes(
          "Endpoint not found. Did you mean /lite/me or /lite/8.8.8.8?",
        )
      ) {
        manual_ip_input.innerHTML = "";

        manual_ip_input.textContent = "type somethign like 1.1.1.1 or 9.9.9.9";
      } else {
        manual_ip_input.innerHTML = "";

        manual_ip_input.textContent = result.error;
      }
    } else {
      manual_ip_input.innerHTML = "";
      for (const [key, value] of Object.entries(result)) {
        manual_ip_input.textContent += `${key}:${value}\n`;
      }
    }
  } catch (error) {
    console.error("manual ip error :" + error.message);
  }
});
