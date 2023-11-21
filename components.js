import axios from "axios";

const formatMarketData = (data) => {
  let formattedData = [];
  let coin = {};
  for (let i = 0; i < data.length; i++) {
    coin = {
      name: data[i]["name"],
      symbol: data[i]["symbol"].toUpperCase(),
      image: data[i]["image"],
      price: "$" + data[i]["current_price"],
      change: data[i]["price_change_percentage_24h"].toFixed(2),
    };
    formattedData.push(coin);
    coin = {};
  }

  return formattedData;
};

export const getMarketData = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=bitcoin%2Cethereum%2Ctether%2Cbinancecoin%2Ccardano%2Cmatic-network&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&locale=en&precision=2&x_cg_demo_api_key=CG-fUhJFzJzSECGzYTDCw5QzFxZ"
    );
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (error) {
    console.log(error.message);
  }
};
