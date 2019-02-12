const DATA_SOURCES = [{
    id: '0',
    description: 'Population graph',
    url: 'http://api.population.io/1.0/population/1980/aged/18/',
    dataKey: '',
    yAxis: ['females', 'males', 'total'],
    xAxis: 'country',
}, {
    id: '1',
    description: 'Intraday',
    url: 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo',
    dataKey: 'Time Series (5min)',
    yAxis: ['1. open', '2. high', '3. low', '4. close'],
    xAxis: 'xAxis',
}
];

export default DATA_SOURCES;
