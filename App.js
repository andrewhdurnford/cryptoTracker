import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { getMarketData } from "./components";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const Item = ({ image, name, symbol, price, change }) => (
  <View className="flex flex-row justify-between mx-3 my-3 w-11/12 h-12">
    <View className="flex flex-row w-28 h-12">
      <Image className="h-12 w-12 mr-2" src={image} alt={symbol} />
      <View className="flex flex-col justify-around w-18 h-12">
        <Text className="text-lg font-normal">{name}</Text>
        <Text className="text-sm text-[#A9ABB1]">{symbol}</Text>
      </View>
    </View>
    <View className="flex flex-col justify-around h-12">
      <Text className="text-lg font-normal">{price}</Text>
      <Text className="text-sm text-right">{change}</Text>
    </View>
  </View>
);

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  return (
    <View className="flex-1 items-left bg-white">
      <Text className="ml-3 mt-20 text-2xl font-bold">Markets</Text>
      <View className="w-11/12 h-[1px] bg-[#A9ABB1] mx-auto mt-4 mb-3"></View>
      <StatusBar style="auto" />
      <ScrollView
        data={data}
        renderItem={({ item }) => (
          <Item
            image={item.image}
            symbol={item.symbol}
            name={item.name}
            price={item.price}
            change={item.change}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
