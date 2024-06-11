const my_palette = [
  "#0A9F9D", "#CEB175", "#E54E21", "#6C8645", "#C18748",
  "#FBA72A", "#D3D4D8", "#CB7A5C", "#5785C1", "#0A9F9D", 
  "#CEB175"
];

const ai = [
  {
    sector: "Computer and mathematical",
    risk: "High exposure, high automation",
    exposure: 0.75,
    unions: 0.04,
    emp: 5221569.078
  },
  {
    sector: "Office and administrative support",
    risk: "High exposure, high automation",
    exposure: 0.6,
    unions: 0.1,
    emp: 19200282.74
  },
  {
    sector: "Business and financial operations",
    risk: "High exposure, high automation",
    exposure: 0.52,
    unions: 0.05,
    emp: 9698798.117
  },
  {
    sector: "Architecture and engineering",
    risk: "High exposure, high augmentation, low automation",
    exposure: 0.49,
    unions: 0.07,
    emp: 2556397.783
  },
  {
    sector: "Legal",
    risk: "High exposure, high automation",
    exposure: 0.49,
    unions: 0.07,
    emp: 1193988.848
  },
  {
    sector: "Management",
    risk: "High exposure, high augmentation, low automation",
    exposure: 0.46,
    unions: 0.05,
    emp: 10534089.93
  },
  {
    sector: "Sales and related",
    risk: "High exposure, high automation",
    exposure: 0.46,
    unions: 0.04,
    emp: 13447898.88
  },
  {
    sector: "Arts, design, entertainment, sports, and media",
    risk: "High exposure, high augmentation, low automation",
    exposure: 0.46,
    unions: 0.09,
    emp: 2190407.783
  },
  {
    sector: "Life, physical, and social science",
    risk: "High exposure, high augmentation, low automation",
    exposure: 0.46,
    unions: 0.12,
    emp: 1426628.109
  },
  {
    sector: "Educational instruction and library",
    risk: "Medium exposure, high augmentation",
    exposure: 0.39,
    unions: 0.37,
    emp: 7398745.027
  },
  {
    sector: "Healthcare practitioners and technical",
    risk: "Medium exposure, high augmentation",
    exposure: 0.34,
    unions: 0.13,
    emp: 8944555.784
  }
];

// Create a mapping from sector to color
const sectorColorMap = {};
ai.forEach((data, index) => {
  sectorColorMap[data.sector] = my_palette[index % my_palette.length];
});

// Calculate the regression line
const unions = ai.map(data => data.unions);
const exposure = ai.map(data => data.exposure);

const sumX = unions.reduce((sum, x) => sum + x, 0);
const sumY = exposure.reduce((sum, y) => sum + y, 0);
const sumXY = unions.reduce((sum, x, i) => sum + x * exposure[i], 0);
const sumX2 = unions.reduce((sum, x) => sum + x * x, 0);

const n = unions.length;
const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
const intercept = (sumY - slope * sumX) / n;

// Find the maximum marker size
const maxMarkerSize = Math.max(...ai.map(data => Math.max(5, Math.min(20, data.emp / 1000000))));

const traces = ai.map((data, index) => ({
  x: [data.unions],
  y: [data.exposure],
  mode: 'markers',
  marker: {
    size: [(Math.max(5, Math.min(20, data.emp / 1000000))) * (30 / maxMarkerSize)], // Adjust marker size range
    color: sectorColorMap[data.sector],
    opacity: 0.7,
  },
  text: `<b><span style="color:${sectorColorMap[data.sector]}; font-size:13px">${data.sector}</span></b><br><b>Union representation:</b> ${Math.round(data.unions * 100)}%<br><b>AI exposure:</b> ${Math.round(data.exposure * 100)}%`,
  type: 'scatter',
  hoverinfo: 'text', // Show text only on hover
  name: data.sector,
  showlegend: true,
}));

// Define the range for the trendline based on the union values
const trendlineRange = [Math.min(...unions), Math.max(...unions)];

const trendline = {
  x: trendlineRange,
  y: trendlineRange.map(x => slope * x + intercept),
  mode: 'lines',
  line: {
    color: '#2b2b2b',
    width: 1,
  },
  type: 'scatter',
  showlegend: false, // Remove legend for trendline
};

const layout = {
  xaxis: {
    title: '<b>Union Representation (%)</b>',
    tickformat: ',.0%',
    gridcolor: '#eeeeee', // Lighter grey grid color
    linecolor: '#a0a0a0', // Darker line color
  },
  yaxis: {
    title: '<b>AI Exposure (%)</b>',
    tickformat: ',.0%',
    gridcolor: '#eeeeee', // Lighter grey grid color
    linecolor: '#a0a0a0', // Darker line color
  },
  autosize: true,
  paper_bgcolor: 'rgba(255, 255, 255, 0.05)',
  legend: {
    itemsizing: 'constant',
    itemsize: 20,
    title: 'Sector',
  },
  font: {
    family: 'Roboto',
    size: 12,
    color: '#032B30',
  },
  showlegend: true, // Show legend
  hovermode: 'closest', // Display only the hover label of the closest point
  hoverlabel: {
    bgcolor: 'rgba(255, 255, 255, 0.05)', // Transparent background
    bordercolor: 'rgba(255, 255, 255, 0)', // Transparent border
    font: { // Font settings for hover labels
      family: 'Roboto',
      size: 12,
      color: '#032B30',
    },
  },
};

const data = [...traces, trendline]; // Include all sector traces and the trendline trace

Plotly.newPlot('graph', data, layout, {displayModeBar: false});
