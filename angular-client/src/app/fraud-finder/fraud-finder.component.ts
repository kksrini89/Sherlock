import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

import { TransactionData } from '../services/transactions';
import { RootObject, Children } from '../models/transaction';

@Component({
  selector: 'app-fraud-finder',
  templateUrl: './fraud-finder.component.html',
  styleUrls: ['./fraud-finder.component.css']
})
export class FraudFinderComponent implements OnInit, OnDestroy {
  transactionId: String = '';
  confidenceLevel: Number = 1;
  filteredTransactions = null;
  isIdValid: Boolean = false;
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

  ngOnInit() {
    this.transactionSubscription = this.transactionData.getTransactions().subscribe(
      data => {
        console.log(data);
        this.filteredTransactions = new MatTableDataSource(data['result']);
      },
      err => console.error(err)
    );
  }

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
      if (
        this.transactionId !== '' &&
        this.transactionIdRegex.test(this.transactionId.toString())
      ) {
        this.transactionByIdSubscription = this.transactionData
          .searchTransactionById(this.transactionId)
          .subscribe(data => {
            this.filteredTransactions = new MatTableDataSource([data['result']]);
          });
      } else {
        throw Error('Transaction Id is not valid!');
      }
      // if (this.transactionId === '' && this.confidenceLevel === 1) {
      //   this.transactionSubscription = this.transactionData.getTransactions().subscribe(data => {
      //     this.filteredTransactions = new MatTableDataSource(data['result']);
      //   });
      // }
      // this.transactionData.searchTransactionById(this.transactionId).subscribe(data => {
      //   console.log(data);
      //   const transactionItem: RootObject = data['result'];
      //   const transactionInput: RootObject = transactionItem;
      //   const rootIndexItem: Children = Object.assign({}, transactionInput, { childrens: null });
      //   // tslint:disable-next-line:prefer-const
      //   let results: Array<Children> = [rootIndexItem];
      //   for (const iterator of transactionInput.childrens) {
      //     if (iterator['childrens'] !== undefined) {
      //       if (iterator['childrens'].length > 0) {
      //         // tslint:disable-next-line:prefer-const
      //         let flattenedTransactions = [];
      //         this.flattenTransactions(flattenedTransactions, iterator['childrens']);
      //         results.push(...flattenedTransactions);
      //       } else {
      //         results.push(iterator);
      //       }
      //     }
      //   }
      //   this.filteredTransactions = results;
      // });
      // const flattenedTransactions = flattenDeep(transactionItem.childrens);
      // const result = [rootIndexItem, ...flattenedTransactions];
    } catch (error) {
      throw error;
    }
  }

  // private flattenTransactions(transactions, item: Array<Children>): void {
  //   try {
  //     if (item !== null && Array.isArray(item) && item.length > 0) {
  //       for (const i of item) {
  //         if (typeof i['childrens'] !== undefined) {
  //           i['childrens'].length > 0
  //             ? this.flattenTransactions(transactions, i['childrens'])
  //             : transactions.push(i);
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  ngOnDestroy() {
    if (this.transactionSubscription !== null) {
      this.transactionSubscription.unsubscribe();
    }
    if (this.transactionByIdSubscription !== null) {
      this.transactionByIdSubscription.unsubscribe();
    }
  }
}
