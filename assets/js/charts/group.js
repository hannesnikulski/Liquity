if (document.getElementById("group-charts") != null) {
    let url = document.getElementById("group-charts").getAttribute("url")

    fetch(url).then(response => {
        return response.json()
    }).then(json => {
        let series = []
        let max = 5

        for (const entry of json.data.data) {
            entry.drinks.reduce((_, current) => {
                max = Math.max(max, current.count)
            })

            series.push({
                name: entry.name,
                data: entry.drinks.map(({ _, date, count }) => ([new Date(date), count]))
            })
        }

        // Chart 1
        {
            var options = {
                series: series,
                title: {
                    text: "Drinks",
                    align: "left",
                },
                subtitle: {
                    text: "just Drinks",
                    align: "left",
                },
                chart: {
                    fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                    id: 'area-datetime',
                    type: 'area',
                    height: 350,
                    zoom: {
                        autoScaleYaxis: true
                    }
                },
                stroke: {
                    curve: 'straight'
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                yaxis: {
                    min: 0,
                    max: max + 1,
                    tickAmount: max,
                },
                xaxis: {
                    type: 'datetime',
                    tickAmount: 10,
                },
                tooltip: {
                    x: {
                        format: 'dd.MM.yy - HH:mm'
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                },
            };

            var chart = new ApexCharts(document.querySelector("#groupChart"), options);
            chart.render();
        }
        // Chart 2
        {
            var options = {
                series: series,
                chart: {
                    fontFamily: 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                    type: 'bar',
                    height: 350,
                    zoom: {
                        autoScaleYaxis: true
                    }
                },
                title: {
                    text: "Drinks",
                    align: "left",
                },
                subtitle: {
                    text: "by Type",
                    align: "left",
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    },
                },
                dataLabels: {
                    enabled: false
                },
                yaxis: {
                    min: 0,
                    max: max + 1,
                    tickAmount: max,
                },
                xaxis: {
                    type: 'datetime',
                    tickAmount: 10,
                },
                theme: {
                    mode: 'light',
                    palette: 'palette4',
                    monochrome: {
                        enabled: false,
                        color: '#255aee',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    },
                },
                tooltip: {
                    x: {
                        format: 'dd.MM.yy - HH:mm'
                    },
                }
            };

            var chart = new ApexCharts(document.querySelector("#bar-chart"), options);
            chart.render();
        }
    })

}
