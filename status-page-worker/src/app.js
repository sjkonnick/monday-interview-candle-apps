const dotenv = require("dotenv");
const { createConnection } = require("net");
const axios = require("axios");
dotenv.config();

const statuspageInstance = axios.create({
  baseURL: "https://api.statuspage.io/v1",
  timeout: 3000,
  headers: { Authorization: `OAuth ${process.env.STATUSPAGE_API_KEY}` },
});

function checkTCP(host, port) {
  return new Promise((resolve, reject) => {
    const client = createConnection({ host, port }, () => {
      console.log(`TCP connection established on port ${port}`);
      client.end();
      resolve();
    });
    client.setTimeout(3000);
    client.on("timeout", (err) => {
      console.error(`TCP connection on port ${port} timed out`);
      client.destroy();
      reject(err);
    });
    client.on("error", (err) => {
      console.error(`Error trying to connect via TCP on port ${port}`);
      reject(err);
    });
  });
}

setInterval(() => {
  checkTCP("127.0.0.1", 8080)
    .then(() => {
      statuspageInstance
        .put("/pages/vbhk0rzfd8p1/components/ks36dsw9vb7s", {
          component: {
            description: "Candle Order Taker Application",
            status: "operational",
            name: "Candle Order Taker",
            only_show_if_degraded: false,
            start_date: new Date(),
          },
        })
        .then(() => {
          console.log("Candle Order Taker component status updated");
        })
        .catch(() => {
          console.error("Timeout updating Candle Order Taker component status");
        });
    })
    .catch(() => {
      statuspageInstance
        .put("/pages/vbhk0rzfd8p1/components/ks36dsw9vb7s", {
          component: {
            description: "Candle Order Taker Application",
            status: "major_outage",
            name: "Candle Order Taker",
            only_show_if_degraded: false,
            start_date: new Date(),
          },
        })
        .then(() => {
          console.log("Candle Order Taker component status updated");
        })
        .catch(() => {
          console.error("Timeout updating Candle Order Taker component status");
        });
    });

  checkTCP("127.0.0.1", 8000)
    .then(() => {
      statuspageInstance
        .put("/pages/vbhk0rzfd8p1/components/crhqzkrcnk8x", {
          component: {
            description: "Fragrance API",
            status: "operational",
            name: "Fragrance API",
            only_show_if_degraded: false,
            start_date: new Date(),
          },
        })
        .then(() => {
          console.log("Fragrance API component status updated");
        })
        .catch(() => {
          console.error("Timeout updating Fragrance API component status");
        });
    })
    .catch(() => {
      statuspageInstance
        .put("/pages/vbhk0rzfd8p1/components/crhqzkrcnk8x", {
          component: {
            description: "Fragrance API",
            status: "major_outage",
            name: "Fragrance API",
            only_show_if_degraded: false,
            start_date: new Date(),
          },
        })
        .then(() => {
          console.log("Fragrance API component status updated");
        })
        .catch(() => {
          console.error("Timeout updating Fragrance API component status");
        });
    });

  checkTCP("127.0.0.1", 3005)
    .then(() => {
      statuspageInstance
        .put("/pages/vbhk0rzfd8p1/components/gz5d15cq3g9s", {
          component: {
            description: "SQL Viewer Widget",
            status: "operational",
            name: "SQL Viewer",
            only_show_if_degraded: false,
            start_date: new Date(),
          },
        })
        .then(() => {
          console.log("SQL Viewer component status updated");
        })
        .catch(() => {
          console.error("Timeout updating SQL Viewer component status");
        });
    })
    .catch(() => {
      statuspageInstance
        .put("/pages/vbhk0rzfd8p1/components/gz5d15cq3g9s", {
          component: {
            description: "SQL Viewer Widget",
            status: "major_outage",
            name: "SQL Viewer",
            only_show_if_degraded: false,
            start_date: new Date(),
          },
        })
        .then(() => {
          console.log("SQL Viewer component status updated");
        })
        .catch(() => {
          console.error("Timeout updating SQL Viewer component status");
        });
    });
}, 20000);
