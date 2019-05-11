import { Injectable } from '@angular/core';
import { RootObject } from '../models/transaction';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionData {
  public api_endpoint: String = `http://localhost:3000/api`;
  transactions = [
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
    }
  ];
  constructor(public http: HttpClient) {}

  /**
   * To filter transactions by confidence level
   * @param confidence_level Transaction Confidence level
   */
  getTransactions(confidence_level?: Number) {
    try {
      if (confidence_level === undefined) {
        return this.http.get(`${this.api_endpoint}/transaction`);
      }
      return this.http.get(`${this.api_endpoint}/transaction?confidence_level=${confidence_level}`);

      // const url =
      //   confidence_level < 1
      //     ? `${this.api_endpoint}/transaction/${confidence_level}`
      //     : `${this.api_endpoint}/transaction`;
      // return this.http.get(`${this.api_endpoint}/transaction`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * To filter transactions by transaction id
   * @param id Transaction Id
   */
  searchTransactionById(id) {
    try {
      const params = new HttpParams();
      params.set('id', id);
      return this.http.get(`${this.api_endpoint}/transaction/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
