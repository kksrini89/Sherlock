import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionData {
  public api_endpoint: String = `http://localhost:3000/api`;
  
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
