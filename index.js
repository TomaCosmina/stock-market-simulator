setTimeout(function() {
    $('#loading').addClass('hidden');
}, 2000);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //ianuarie=0
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

var timeset = new Date();
var time = timeset.getHours() + ":" + timeset.getMinutes() + ":" + timeset.getSeconds();

document.getElementById("today").innerHTML = today;
document.getElementById("time").innerHTML = time;



symb = "";
time = "";

const form = document.querySelector("#SearchForm");
const deletebutton = document.querySelector("#delete");


form.addEventListener("submit", function(e) {
    e.preventDefault();
    symb = form.elements.resp.value.toLocaleUpperCase();
    time = form.elements.respo.value.toLocaleUpperCase();


    function stockMarket() {
        $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_" + time + "&symbol=" + symb +
            "&outputsize=full&apikey=UKOEC25JWL0ZFLQ3",
            function(data) {
                console.log(data);
                //DAILY
                if (time === "DAILY") {

                    const dates = Object.keys(data["Time Series (Daily)"]);
                    const dataentries = Object.entries(data["Time Series (Daily)"]);

                    //openprice
                    const openprices = [];
                    const openprice = dataentries.forEach(elem => {
                        const open = elem[1]["1. open"];
                        openprices.push(open); //ask
                    });
                    const reverseopenprices = openprices.reverse();
                    const revopen = reverseopenprices[openprices.length - 1];
                    console.log(revopen);
                    //close price
                    const closeprices = [];
                    const closeprice = dataentries.forEach(elem => {
                        const close = elem[1]["4. close"];
                        closeprices.push(close);
                    });
                    const reversecloseprices = closeprices.reverse();
                    const revclose = reversecloseprices[closeprices.length - 1];

                    //low price
                    const lowprices = [];
                    const lowprice = dataentries.forEach(elem => {
                        const low = elem[1]["3. low"];
                        lowprices.push(low);
                    });
                    const reverselowprices = lowprices.reverse();
                    const revlow = reverselowprices[lowprices.length - 1];

                    //high price
                    const highprices = [];
                    const highprice = dataentries.forEach(elem => {
                        const high = elem[1]["2. high"];
                        highprices.push(high);
                    });
                    const reversehighprices = highprices.reverse();
                    const revhigh = reversehighprices[highprices.length - 1];

                    //volume
                    const volumeprices = [];
                    const volumeprice = dataentries.forEach(elem => {
                        const volume = elem[1]["5. volume"];
                        volumeprices.push(volume);
                    });
                    const reversevolumeprices = volumeprices.reverse();
                    const revvolume = reversevolumeprices[volumeprices.length - 1];


                    function ChartMk() {

                        //x
                        const xlabels = [];
                        const labelx = dataentries.forEach(elem => {
                            const closeprice = elem[1]["4. close"];

                            xlabels.push(closeprice);
                        });
                        const lessxlabels = xlabels.slice(Math.max(xlabels.length - 2500, 0));

                        //y
                        const ylabels = [];
                        const labely = dates.forEach(el => {
                            ylabels.push(el);
                        });

                        const lesslabels = ylabels.slice(Math.max(ylabels.length - 2500, 0));
                        //ch
                        var ctx = document.getElementById('MkChart').getContext('2d');
                        var MkChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: lesslabels,
                                datasets: [{
                                    label: 'Pretul de Inchidere',
                                    data: lessxlabels,
                                    backgroundColor: ['rgba(1, 121, 111,0.5)'],
                                    borderColor: ['rgb(0,66,66)'],
                                }]
                            },

                            options: {
                                plugins: {
                                    legend: {
                                        title: {
                                            display: true,
                                            text: 'Activitatea pe ultimii 10 ani',
                                        },
                                    }
                                },
                                color: ["rgb(0,66,66)"],
                                fill: true,
                            }
                        });
                    }
                    ChartMk();

                    function ChartMk2() {

                        //openprice
                        const openprices = [];
                        const openprice = dataentries.forEach(elem => {
                            const open = elem[1]["1. open"];
                            openprices.push(open);
                        });
                        const reverseopenprices = openprices.reverse();
                        const revopen = reverseopenprices[openprices.length - 1];
                        const lessopenlabels = openprices.slice(Math.max(openprices.length - 240, 0));
                        //x
                        const xlabels = [];
                        const labelx = dataentries.forEach(elem => {
                            const closeprice = elem[1]["4. close"];

                            xlabels.push(closeprice);
                        });
                        const reversexlab = xlabels.reverse();
                        const lessxlabels = xlabels.slice(Math.max(xlabels.length - 240, 0));



                        //y
                        const ylabels = [];
                        const labely = dates.forEach(el => {
                            ylabels.push(el);
                        });

                        const reverseylab = ylabels.reverse();
                        const lesslabels = ylabels.slice(Math.max(ylabels.length - 240, 0));
                        console.log(lesslabels);
                        //ch
                        var ctx = document.getElementById('MkChart2').getContext('2d');
                        var MkChart2 = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: lesslabels,
                                datasets: [{
                                        label: 'Pretul de Inchidere',
                                        data: lessxlabels,
                                        backgroundColor: ['rgb(185,78,72,0.5)'],
                                        borderColor: ['rgb(185,78,72)'],
                                        borderDash: [5, 5],
                                    },
                                    {
                                        label: 'Pretul de Deschidere',
                                        data: lessopenlabels,
                                        backgroundColor: ['rgba(1, 121, 111,0.7)'],
                                        borderColor: ['rgb(0,66,66)'],
                                    },
                                ]
                            },


                            options: {
                                plugins: {
                                    legend: {
                                        title: {
                                            display: true,
                                            text: 'Activitatea in ultimul an',
                                        },
                                    }
                                },
                                color: ["rgb(1, 121, 111)"],
                                fill: false,
                            }
                        });
                    }
                    ChartMk2();


                    function getinfo() {
                        const symbol = Object.values(data["Meta Data"])[1];
                        document.getElementById("Symbol").innerHTML = symbol;
                        document.getElementById("open").innerHTML = revopen;
                        document.getElementById("close").innerHTML = revclose;
                        document.getElementById("high").innerHTML = revhigh;
                        document.getElementById("low").innerHTML = revlow;
                        document.getElementById("volume").innerHTML = revvolume;

                    }

                    getinfo();

                } else if (time === "WEEKLY") {
                    const dates = Object.keys(data["Weekly Time Series"]);
                    const dataentries = Object.entries(data["Weekly Time Series"]);
                    //openprice
                    const openprices = [];
                    const openprice = dataentries.forEach(elem => {
                        const open = elem[1]["1. open"];
                        openprices.push(open);
                    });
                    const reverseopenprices = openprices.reverse();
                    const revopen = reverseopenprices[openprices.length - 1];

                    //close price
                    const closeprices = [];
                    const closeprice = dataentries.forEach(elem => {
                        const close = elem[1]["4. close"];
                        closeprices.push(close);
                    });
                    const reversecloseprices = closeprices.reverse();
                    const revclose = reversecloseprices[closeprices.length - 1];

                    //low price
                    const lowprices = [];
                    const lowprice = dataentries.forEach(elem => {
                        const low = elem[1]["3. low"];
                        lowprices.push(low);
                    });
                    const reverselowprices = lowprices.reverse();
                    const revlow = reverselowprices[lowprices.length - 1];

                    //high price
                    const highprices = [];
                    const highprice = dataentries.forEach(elem => {
                        const high = elem[1]["2. high"];
                        highprices.push(high);
                    });
                    const reversehighprices = highprices.reverse();
                    const revhigh = reversehighprices[highprices.length - 1];

                    //volume
                    const volumeprices = [];
                    const volumeprice = dataentries.forEach(elem => {
                        const volume = elem[1]["5. volume"];
                        volumeprices.push(volume);
                    });
                    const reversevolumeprices = volumeprices.reverse();
                    const revvolume = reversevolumeprices[volumeprices.length - 1];




                    function ChartMk() {

                        //x
                        const xlabels = [];
                        const labelx = dataentries.forEach(elem => {
                            const closeprice = elem[1]["4. close"];

                            xlabels.push(closeprice);
                        });
                        const reversexlab = xlabels.reverse();
                        const lessxlabels = xlabels.slice(Math.max(xlabels.length - 520, 0));



                        //y
                        const ylabels = [];
                        const labely = dates.forEach(el => {
                            ylabels.push(el);
                        });

                        const reverseylab = ylabels.reverse();
                        const lesslabels = ylabels.slice(Math.max(ylabels.length - 520, 0));
                        //ch
                        var ctx = document.getElementById('MkChart').getContext('2d');
                        var MkChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: lesslabels,
                                datasets: [{
                                    label: 'Pretul de Inchidere',
                                    data: lessxlabels,
                                    backgroundColor: ['rgba(1, 121, 111,0.5)'],
                                    borderColor: ['rgb(0,66,66)'],
                                }]
                            },

                            options: {
                                plugins: {
                                    legend: {
                                        title: {
                                            display: true,
                                            text: 'Activitatea pe ultimii 10 ani',
                                        },
                                    }
                                },
                                color: ["rgb(0,66,66)"],
                                fill: true,
                            }
                        });
                    }
                    ChartMk();

                    function ChartMk2() {

                        //openprice
                        const openprices = [];
                        const openprice = dataentries.forEach(elem => {
                            const open = elem[1]["1. open"];
                            openprices.push(open);
                        });
                        const reverseopenprices = openprices.reverse();
                        const revopen = reverseopenprices[openprices.length - 1];
                        const lessopenlabels = openprices.slice(Math.max(openprices.length - 50, 0));
                        //x
                        const xlabels = [];
                        const labelx = dataentries.forEach(elem => {
                            const closeprice = elem[1]["4. close"];

                            xlabels.push(closeprice);
                        });
                        const reversexlab = xlabels.reverse();
                        const lessxlabels = xlabels.slice(Math.max(xlabels.length - 50, 0));



                        //y
                        const ylabels = [];
                        const labely = dates.forEach(el => {
                            ylabels.push(el);
                        });

                        const reverseylab = ylabels.reverse();
                        const lesslabels = ylabels.slice(Math.max(ylabels.length - 50, 0));

                        //ch
                        var ctx = document.getElementById('MkChart2').getContext('2d');
                        var MkChart2 = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: lesslabels,
                                datasets: [{
                                        label: 'Pretul de Inchidere',
                                        data: lessxlabels,
                                        backgroundColor: ['rgb(185,78,72,0.5)'],
                                        borderColor: ['rgb(185,78,72)'],
                                        borderDash: [5, 5],
                                    },
                                    {
                                        label: 'Pretul de Deschidere',
                                        data: lessopenlabels,
                                        backgroundColor: ['rgba(1, 121, 111,0.7)'],
                                        borderColor: ['rgb(0,66,66)'],
                                    },
                                ]
                            },


                            options: {
                                plugins: {
                                    legend: {
                                        title: {
                                            display: true,
                                            text: 'Activitatea in ultimul an',
                                        },
                                    }
                                },
                                color: ["rgb(1, 121, 111)"],
                                fill: false,
                            }
                        });
                    }
                    ChartMk2();


                    function getinfo() {
                        const symbol = Object.values(data["Meta Data"])[1];
                        document.getElementById("Symbol").innerHTML = symbol;
                        document.getElementById("open").innerHTML = revopen;
                        document.getElementById("close").innerHTML = revclose;
                        document.getElementById("high").innerHTML = revhigh;
                        document.getElementById("low").innerHTML = revlow;
                        document.getElementById("volume").innerHTML = revvolume;

                    }
                    getinfo();

                } else if (time === "MONTHLY") {
                    const dates = Object.keys(data["Monthly Time Series"]);
                    const dataentries = Object.entries(data["Monthly Time Series"]);
                    //openprice
                    const openprices = [];
                    const openprice = dataentries.forEach(elem => {
                        const open = elem[1]["1. open"];
                        openprices.push(open);
                    });
                    const reverseopenprices = openprices.reverse();
                    const revopen = reverseopenprices[openprices.length - 1];

                    //close price
                    const closeprices = [];
                    const closeprice = dataentries.forEach(elem => {
                        const close = elem[1]["4. close"];
                        closeprices.push(close);
                    });
                    const reversecloseprices = closeprices.reverse();
                    const revclose = reversecloseprices[closeprices.length - 1];

                    //low price
                    const lowprices = [];
                    const lowprice = dataentries.forEach(elem => {
                        const low = elem[1]["3. low"];
                        lowprices.push(low);
                    });
                    const reverselowprices = lowprices.reverse();
                    const revlow = reverselowprices[lowprices.length - 1];

                    //high price
                    const highprices = [];
                    const highprice = dataentries.forEach(elem => {
                        const high = elem[1]["2. high"];
                        highprices.push(high);
                    });
                    const reversehighprices = highprices.reverse();
                    const revhigh = reversehighprices[highprices.length - 1];

                    //volume
                    const volumeprices = [];
                    const volumeprice = dataentries.forEach(elem => {
                        const volume = elem[1]["5. volume"];
                        volumeprices.push(volume);
                    });
                    const reversevolumeprices = volumeprices.reverse();
                    const revvolume = reversevolumeprices[volumeprices.length - 1];


                    function ChartMk() {

                        //x
                        const xlabels = [];
                        const labelx = dataentries.forEach(elem => {
                            const closeprice = elem[1]["4. close"];

                            xlabels.push(closeprice);
                        });
                        const reversexlab = xlabels.reverse();
                        const lessxlabels = xlabels.slice(Math.max(xlabels.length - 120, 0));



                        //y
                        const ylabels = [];
                        const labely = dates.forEach(el => {
                            ylabels.push(el);
                        });

                        const reverseylab = ylabels.reverse();
                        const lesslabels = ylabels.slice(Math.max(ylabels.length - 120, 0));

                        //ch
                        var ctx = document.getElementById('MkChart').getContext('2d');
                        var MkChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: lesslabels,
                                datasets: [{
                                    label: 'Pretul de Inchidere',
                                    data: lessxlabels,
                                    backgroundColor: ['rgba(1, 121, 111,0.7)'],
                                    borderColor: ['rgb(0,66,66)'],
                                }]
                            },

                            options: {
                                plugins: {
                                    legend: {
                                        title: {
                                            display: true,
                                            text: 'Activitatea pe ultimii 10 ani',
                                        },
                                    }
                                },
                                color: ["rgb(1, 121, 111)"],
                                fill: true,
                            }
                        });
                    }
                    ChartMk();

                    function ChartMk2() {

                        //openprice
                        const openprices = [];
                        const openprice = dataentries.forEach(elem => {
                            const open = elem[1]["1. open"];
                            openprices.push(open);
                        });
                        const reverseopenprices = openprices.reverse();
                        const revopen = reverseopenprices[openprices.length - 1];
                        const lessopenlabels = openprices.slice(Math.max(openprices.length - 13, 0));
                        //x
                        const xlabels = [];
                        const labelx = dataentries.forEach(elem => {
                            const closeprice = elem[1]["4. close"];

                            xlabels.push(closeprice);
                        });
                        const reversexlab = xlabels.reverse();
                        const lessxlabels = xlabels.slice(Math.max(xlabels.length - 13, 0));

                        //y
                        const ylabels = [];
                        const labely = dates.forEach(el => {
                            ylabels.push(el);
                        });

                        const reverseylab = ylabels.reverse();
                        const lesslabels = ylabels.slice(Math.max(ylabels.length - 13, 0));

                        //ch
                        var ctx = document.getElementById('MkChart2').getContext('2d');
                        var MkChart2 = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: lesslabels,
                                datasets: [{
                                        label: 'Pretul de Inchidere',
                                        data: lessxlabels,
                                        backgroundColor: ['rgb(185,78,72,0.5)'],
                                        borderColor: ['rgb(185,78,72)'],
                                        borderDash: [5, 5],
                                    },
                                    {
                                        label: 'Pretul de Deschidere',
                                        data: lessopenlabels,
                                        backgroundColor: ['rgba(1, 121, 111,0.7)'],
                                        borderColor: ['rgb(0,66,66)'],
                                    },
                                ]
                            },


                            options: {
                                plugins: {
                                    legend: {
                                        title: {
                                            display: true,
                                            text: 'Activitatea in ultimul an',
                                        },
                                    }
                                },
                                color: ["rgb(1, 121, 111)"],
                                fill: false,
                            }
                        });
                    }
                    ChartMk2();



                    function getinfo() {
                        const symbol = Object.values(data["Meta Data"])[1];
                        document.getElementById("Symbol").innerHTML = symbol;
                        document.getElementById("open").innerHTML = revopen;
                        document.getElementById("close").innerHTML = revclose;
                        document.getElementById("high").innerHTML = revhigh;
                        document.getElementById("low").innerHTML = revlow;
                        document.getElementById("volume").innerHTML = revvolume;

                    }

                    getinfo();
                }
                $.getJSON("https://api.polygon.io/v1/meta/symbols/" + symb + "/company?&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW", function(data) {
                    document.getElementById("NameComp").innerHTML = data.name;
                    document.getElementById("about").innerHTML = data.description;
                })

            })

        $.getJSON("https://api.polygon.io/v2/reference/financials/" + symb + "?limit=5&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW", function(data) {

            document.getElementById("grossmargin").innerHTML = data.results[0].EBITDAMargin;
            document.getElementById("per").innerHTML = data.results[0].priceToEarningsRatio;
            document.getElementById("p/s").innerHTML = data.results[0].priceToSalesRatio;
            document.getElementById("grossprofit").innerHTML = data.results[0].grossProfit;
            document.getElementById("eps").innerHTML = data.results[0].earningsPerBasicShare;
            document.getElementById("divy").innerHTML = data.results[0].dividendYield;
            document.getElementById("profitmargin").innerHTML = data.results[0].profitMargin;
            document.getElementById("p/bv").innerHTML = data.results[0].priceToBookValue;
            document.getElementById("ebitda").innerHTML = data.results[0].earningsBeforeInterestTaxesDepreciationAmortization;
            document.getElementById("ebit").innerHTML = data.results[0].earningBeforeInterestTaxes;
            document.getElementById("ebt").innerHTML = data.results[0].earningsBeforeTax;
            document.getElementById("cf").innerHTML = data.results[0].freeCashFlow;

        })

        $.getJSON("https://api.polygon.io/v2/reference/news?limit=10&order=descending&sort=published_utc&ticker=" + symb +
            "&published_utc.gte=" + today + "&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW",
            function(data) {
                const title1 = document.getElementById("title1");
                title1.innerHTML = data.results[0].title;
                const link_result1 = document.getElementById("link_result1");
                link_result1.innerHTML = `<a href="${data.results[0].article_url}"><img src="${data.results[0].image_url}"/></a>`
                const description1 = document.getElementById("description1");
                description1.innerHTML = data.results[0].description;

                const title2 = document.getElementById("title2");
                title2.innerHTML = data.results[1].title;
                const link_result2 = document.getElementById("link_result2");
                link_result2.innerHTML = `<a href="${data.results[1].article_url}"><img src="${data.results[1].image_url}"/></a>`
                const description2 = document.getElementById("description2");
                description2.innerHTML = data.results[1].description;

                const title3 = document.getElementById("title3");
                title3.innerHTML = data.results[2].title;
                const link_result3 = document.getElementById("link_result3");
                link_result3.innerHTML = `<a href="${data.results[2].article_url}"><img src="${data.results[2].image_url}"/></a>`
                const description3 = document.getElementById("description3");
                description3.innerHTML = data.results[2].description;

            })
    }

    stockMarket();
})