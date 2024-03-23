import { useState, useEffect } from 'react';
import { api } from "../api/api";
import { useIsFocused } from '@react-navigation/native';
import { storeData, getData } from '../utils/storage'; 
import { UserDataManager } from '../services/userDataManager';
import { updateCoins } from '../state-management/coinSlice';
import { store } from '../state-management/reduxStore';

export const useCoin = () => {
    const [coin, setCoin] = useState({ coins: 0 });
    const isFocused = useIsFocused();

    useEffect(() => {
        let isMounted = true;

        const fetchCoin = async () => {
            if (isFocused && isMounted) {
                try {
                    const coin_result = await api("GET", "/coin", undefined, await UserDataManager.getToken());
                    if (!coin_result.coins) coin_result.coins = 0;
                    if (isMounted) {
                        setCoin(coin_result);
                        store.dispatch(updateCoins(coin_result.coins));
                        await storeData('coin', coin_result);
                    }
                } catch (error) {
                    const storedCoin = await getData('coin');
                    if (storedCoin && isMounted) {
                        setCoin(storedCoin);
                        store.dispatch(updateCoins(storedCoin.coins));
                    }
                    console.error("Failed to fetch coin:", error);
                }
            }
        };

        fetchCoin();

        return () => { isMounted = false; };
    }, [isFocused]);

    return coin;
};
