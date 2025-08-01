import { getApiKey, HOST_URL_GOLD } from '@config/api';
import { SjcResponse } from '@config/type';
import axios from 'axios';
import moment from 'moment';

interface GoldPriceData {
  sjc: SjcResponse[];
}

export const goldApi = {
  getGoldPrices: async () => {
    try {
      const apiKey = await getApiKey();
      if (!apiKey) {
        throw new Error('Failed to retrieve API key');
      }

      const endpoints = [
        '/api/v2/gold/sjc',
        '/api/v2/gold/doji',
        '/api/v2/gold/pnj',
      ];

      const requests = endpoints.map(endpoint =>
        axios.get(`${HOST_URL_GOLD}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }),
      );

      const responses = await Promise.all(requests);

      return {
        sjc: responses[0].data,
        doji: responses[1].data,
        pnj: responses[2].data,
      };
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      throw error;
    }
  },

  getGoldPricesByTime: async (from: number, to: number): Promise<GoldPriceData> => {
    try {
      const apiKey = await getApiKey();
      if (!apiKey) {
        throw new Error('Failed to retrieve API key');
      }

      const response = await axios.get(`${HOST_URL_GOLD}/api/v2/gold/sjc?date_from=${from}&date_to=${to}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      return {
        sjc: response.data.results,
      };
    } catch (error) {
      console.error('Error fetching SJC gold prices:', error);
      throw error;
    }
  },

  
};
