import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { TransactionData } from '../services/transactions';

@Component({
  selector: 'app-fraud-finder',
  templateUrl: './fraud-finder.component.html',
  styleUrls: ['./fraud-finder.component.css']
})
export class FraudFinderComponent implements OnInit, OnDestroy {
  transactionId: String = '';
  confidenceLevel: Number = 1;
  filteredTransactions = null;
  transactionIdRegex = /^[0-9a-fA-F]+$/;

  displayedColumns: string[] = [
    'Transaction Id',
    'Connection Info',
    'Confidence Level',
    'Name',
    'Email',
    'Phone',
    'Age'
  ];
  public transactionSubscription: Subscription;
  public transactionByIdSubscription: Subscription;

  constructor(public transactionData: TransactionData) {}

  /**
   * Life cycle hooks - To get initial set of transactions from an API
   */
  ngOnInit() {
    this.transactionSubscription = this.transactionData.getTransactions().subscribe(
      data => {
        console.log(data);
        this.filteredTransactions = new MatTableDataSource(data['result']);
      },
      err => console.error(err)
    );
  }

  /**
   * To search transaction by either confidence level or trasanction id
   * @returns {void}
   */
  search() {
    try {
      if (this.transactionId === '') {
        // SearchByConfidenceLevel
        this.transactionSubscription = this.transactionData
          .getTransactions(this.confidenceLevel)
          .subscribe(data => {
            this.filteredTransactions = new MatTableDataSource(data['result']);
            this.transactionId = '';
          });
      }

      // Validate transaction id
      if (
        this.transactionId !== '' &&
        this.transactionIdRegex.test(this.transactionId.toString())
      ) {
        // Search By Transaction Id
        this.transactionByIdSubscription = this.transactionData
          .searchTransactionById(this.transactionId)
          .subscribe(data => {
            this.filteredTransactions = new MatTableDataSource([data['result']]);
          });
      } else {
        throw Error('Transaction Id is not valid!');
      }      
    } catch (error) {
      throw error;
    }
  }

  /**
   * Life cycle hook - to unsubscribe observables
   */
  ngOnDestroy() {
    if (this.transactionSubscription !== null) {
      this.transactionSubscription.unsubscribe();
    }
    if (this.transactionByIdSubscription !== null) {
      this.transactionByIdSubscription.unsubscribe();
    }
  }
}
