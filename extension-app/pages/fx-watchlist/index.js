import React, { useState } from 'react';
import {
    Text, Card, Box, Button, DecisionDropdown, Table, CandleStickChart, Loader
} from 'symphony-bdk-ui-toolkit';

const FxWatchlist = () => {
    const [ newCurrency, setNewCurrency ] = useState();
    const [ watchlistData, setWatchlistData ] = useState([]);
    const [ chartData, setChartData ] = useState({ loading: false });

    const handleRemove = (item) => {
        const { base, currency } = item.row.original;
        setWatchlistData(
            previous => previous.filter(i => !(i.base === base && i.currency == currency))
        );
    };

    const handleChart = (item) => {
        const { base, currency } = item.row.original;
        const apiUrl = `http://localhost:8080/fxbot/fx-rate/${base}/${currency}`;

        setChartData({ loading: true });

        fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                const formattedData = json.map(entry => ({ ...entry, date: new Date(entry.date) }));
                setChartData({
                    loading: false,
                    title: `${base}/${currency}`,
                    data: formattedData
                });
            });
    };

    const actionsMenu = [
        { label: 'Chart', callback: handleChart, type: 'info' },
        { label: 'Remove', callback: handleRemove, type: 'error' }
    ];

    const addToList = () => {
        const { base, value: currency } = newCurrency;
        if (!watchlistData.some(i => i.base === base && i.currency === currency)) {
            setWatchlistData(previous => [ ...previous, { base, currency, actionsMenu } ]);
        }
        setNewCurrency();
    };

    const fxRefData = [{
        suboptions: [
            {
                label: 'USD Base',
                options: [
                    { label: 'USD/CAD', value: 'CAD', base: 'USD' },
                    { label: 'USD/JPY', value: 'JPY', base: 'USD' }
                ]
            },
            {
                label: 'EUR Base',
                options: [
                    { label: 'EUR/CHF', value: 'CHF', base: 'EUR' },
                    { label: 'EUR/GBP', value: 'GBP', base: 'EUR' }
                ]
            }
        ]
    }];

    const tableColumns = [
        { accessor: 'base', header: 'Base' },
        { accessor: 'currency', header: 'Currency' },
        {
            id: 'actions',
            sortable: false,
            width: 100,
            hasActions: true
        }
    ];

    const priceChart = (
        <Box style={{ width: '100%', height: '500px', marginTop: '50px' }}>
            <CandleStickChart
                tickSizeX={10}
                loading={chartData.loading}
                data={chartData.data}
                title={chartData.title}
                hasGrid
                hasCrossHair
                hasOHLCTooltip
                hasTooltip
                hasZoom
                hasEdgeIndicator
            />
        </Box>
    );

    return (
        <React.Fragment>
            <Text size="large" type="primary">Your Watchlist</Text>
            <Card>
                <b>Insert New Currency</b>
                <Box horizontal>
                    <DecisionDropdown onChange={setNewCurrency} value={newCurrency} data={fxRefData} />
                    <Button size="large" onClick={addToList}>Add to List</Button>
                </Box>
            </Card>
            <Table columns={tableColumns} data={watchlistData} />
            { chartData.loading ? <Loader size="large" /> : chartData.data && priceChart }
        </React.Fragment>
    );
};

export default FxWatchlist;
