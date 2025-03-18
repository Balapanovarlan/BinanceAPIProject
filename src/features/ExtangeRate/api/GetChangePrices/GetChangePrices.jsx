import axios from "axios";
import { BINANCE_URL } from "../../../../constants/api";
import { tokenList } from "../ExchangeRate.data";

export const getChangePricesApi = async ()=>{
    const res  = await axios.get(`${BINANCE_URL}/api/v3/ticker/24hr?symbols=${JSON.stringify(tokenList)}`)   
    return res.data;
}
