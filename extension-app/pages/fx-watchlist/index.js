import React, { useState } from 'react';
import {
    Text, Card, Box, Button, DecisionDropdown
} from 'symphony-bdk-ui-toolkit';

const FxWatchlist = () => {
    const [ newCurrency, setNewCurrency ] = useState();
    const [ watchlistData, setWatchlistData ] = useState([]);

    const addToList = () => {
        const { base, value: currency } = newCurrency;
        if (!watchlistData.some(i => i.base === base && i.currency === currency)) {
            setWatchlistData(previous => [ ...previous, { base, currency } ]);
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
            { watchlistData.map((item, index) => <Box key={index}>{item.base}/{item.currency}</Box>) }
        </React.Fragment>
    );
};

export default FxWatchlist;
