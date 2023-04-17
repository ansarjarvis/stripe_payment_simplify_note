let yearlyButton = document.querySelector(".yearly-btn");
yearlyButton.addEventListener("click", () => {
  fetch("/create-checkout-session/yearly", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 1 },
        // { id: 2, quantity: 1 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
});

let monthlyButton = document.querySelector(".monthly-btn");
monthlyButton.addEventListener("click", () => {
  fetch("/create-checkout-session/monthly", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        // { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
});
