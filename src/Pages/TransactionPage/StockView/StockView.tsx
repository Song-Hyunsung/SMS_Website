import React, { useState } from "react";
import "../TransactionPage.scss";
import { Grid, Button } from "@material-ui/core";
import StockViewHeader from "./StockViewHeader";
import StockGraph from "../../../Components/StockGraph/stockGraph";
import StockViewFooter from "./StockViewFooter";
import './StockView.scss'
import BuyModalv2 from "../../../Components/BuyModalv2/BuyModalv2";
import SellModalv2 from "../../../Components/SellModalv2/SellModalv2";
import { useSelector } from "react-redux";

function StockView() {
  const selectedStock = useSelector((state: any) => state.selectedStockData);
  const allStockData = useSelector((state: any) => state.stockData);
  
  if (selectedStock.hasData == null){
    return (<div></div>);
  }

  let stockData = allStockData[selectedStock.symbol];

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="stretch"
    >
      <StockViewHeader price={stockData.data.price} sector={stockData.data.sector} symbol={selectedStock.symbol} name={stockData.data.name}></StockViewHeader>
      <Grid container direction="row" justify="center" alignItems="center" className="bottomBorder" >
        <StockGraph domain={stockData.domain} data={stockData.history}  width={1000} height={500}></StockGraph>
      </Grid>

      <StockViewFooter></StockViewFooter>

      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        style={{ paddingRight: 25, paddingBottom: 25, paddingTop: 25 }}>
        <BuyModalv2/>
        <div style={{ paddingLeft: 10 }}>
          <SellModalv2/>
        </div>
      </Grid>
    </Grid>
  );
}

export default StockView;
