import React from 'react'
import TradesChart from '../../features/Trades/TradesChart/TradesChart'
import ExchangeRateTable from '../../features/ExtangeRate/components/ExchangeRateTable/ExchangeRateTable'

const Home = () => {
    return (
        <div>
            <TradesChart />
            <ExchangeRateTable />
        </div>
    )
}

export default Home