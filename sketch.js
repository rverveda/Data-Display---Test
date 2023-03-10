console.log("fetching the file now!");

// fetchImg().then(console.log("yay")).catch(console.error());
plotData();

async function fetchData() {
  // Fetch the data
  let Response = await fetch("ZonAnn.Ts+dSST.csv");
  let fileInText = await Response.text();
  // Store the data
  fileInText = fileInText.split("\n").slice(1);
  // Change the data to a usable format
  let tempfile = [];
  let years = [];
  let avgTemp = [];
  for (let i = 0; i < fileInText.length; i++) {
    let rows = fileInText[i].split(",");
    years.push(rows[0]);
    avgTemp.push(rows[1]);
    tempfile.push([rows[0], rows[1]]);
  }
  fileInText.all = tempfile;
  fileInText.years = years;
  fileInText.avgTemp = avgTemp;
  // Return the useful data
  return fileInText;
}

// Display the data
async function plotData() {
  // Fetch obtain the data using async function to insure data is ready before continuing
  data = await fetchData();

  // Get the HTML element that the data is going to display on
  const ctx = document.getElementById("chart");
  ctx.width = ctx.clientWidth;
  ctx.height = ctx.clientHeight / 2.5;

  // Use chart.js to display the data nicely
  dataChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.years,
      datasets: [
        {
          label: "Avg Temp",
          data: data.avgTemp,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          alignToPixels: true,
        },
      },
    },
  });
  dataChart.options.plugins.legend = true;
}
