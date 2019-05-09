import { Response, Request } from 'express';
import { RootObject, Children } from './../models/transaction';

const transactions = [
  {
    id: '5c8657845d3dc63c6d5bb643',
    index: 0,
    age: 36,
    name: 'Christa Murray',
    email: 'christamurray@equicom.com',
    phone: '(989) 478-3521',
    connectionInfo: {
      type: 'sameGeoInfo',
      confidence: 1
    },
    geoInfo: {
      latitude: 43.903515,
      longitude: 35.924001
    },
    childrens: [
      {
        id: '5c86578486f3aa844adf8bba',
        index: 0,
        age: 28,
        name: 'Frazier Conrad',
        email: 'christamurray@equicom.com',
        phone: '(948) 443-3884',
        connectionInfo: {
          type: 'sameEmail',
          confidence: 1
        },
        geoInfo: {
          latitude: 80.58013,
          longitude: 41.759403
        }
      }
    ]
  },
  {
    id: '5cc467dafd89756999147600',
    index: 1,
    age: 28,
    name: 'John San',
    email: 'johns@equicom.com',
    phone: '(977) 478-3687',
    connectionInfo: {
      type: 'sameGeoInfo',
      confidence: 0.7
    },
    geoInfo: {
      latitude: 43.903515,
      longitude: 35.924001
    },
    childrens: [
      {
        id: '5cc46845fd89756999147601',
        index: 0,
        age: 30,
        name: 'Cuz Conrad',
        email: 'cuzcrad@equicom.com',
        phone: '(948) 443-7784',
        connectionInfo: {
          type: 'sameEmail',
          confidence: 0.5
        },
        geoInfo: {
          latitude: 80.58013,
          longitude: 41.759403
        }
      }
    ]
  }
];

/**
 * To get transaction by id
 * @param req HTTP Request
 * @param res HTTP Response
 */
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('Transaction Id is mandatory!');
    }
    let result: any = [];
    flattenTransactions(transactions, result);
    const transactionItem: Children = result.find((transaction: Children) => transaction.id === id);
    return res.json({ result: transactionItem }).status(200);
  } catch (error) {
    res.json({ error: error.message }).status(400);
  }
};

/**
 * To get transaction by confidence level
 * @param req HTTP Request
 * @param res HTTP Response
 */
export const getTransactions = async (req: Request, res: Response) => {
  try {
    let confidence_level = req.query.confidence_level;
    let results: any = [],
      filteredResults: any = [];
    flattenTransactions(transactions, results);
    if (confidence_level !== undefined) {
      confidence_level = +confidence_level;
      // search by confidence level
      filteredResults = results.filter(
        (item: any) => item.connectionInfo.confidence <= confidence_level
      );
      res.json({ result: filteredResults }).status(200);
    } else {
      res.json({ result: results }).status(200);
    }
  } catch (error) {
    res.json({ error: error.message }).status(400);
  }
};

/**
 * To get flattened transactions
 * @param transactions Transactions Object Array
 * @param result Flattened transactions (Call by reference)
 */
const flattenTransactions = (transactions: any, result: [Children]): void => {
  try {
    for (const item of transactions) {
      const temp: RootObject = Object.assign({}, item);
      if (temp !== null && temp !== undefined) {
        if (temp.hasOwnProperty('childrens') && temp.childrens.length > 0) {
          const childrens: any = temp.childrens;
          result.push(Object.assign({}, temp, { childrens: undefined }));
          flattenTransactions(childrens, result);
        } else {
          result.push(temp);
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
