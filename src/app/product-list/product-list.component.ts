import { Component } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  name = 'Angular';
  constructor(private http: HttpClient) {
    var url1 =
      'https://api.marketstack.com/v1/eod?access_key=27da2da60bc4eecb62e22be17aae1c0e&symbols=T&date_from=2023-03-26&date_to=2023-03-30';

    this.http.get(url1).subscribe((data: any[]) => {
      this.temp = data;
    });
  }
  title = 'project';
  url =
    'https://api.marketstack.com/v1/eod?access_key=27da2da60bc4eecb62e22be17aae1c0e&symbols=T&date_from=2023-03-26&date_to=2023-03-30';
  //'https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=PRt07UGBzUrZPTUROLww1CBKxFeS0OcWL7qB3oaaJKxeFJ1mWuhz7LI08qBF';
  data: any[];
  stock: any;
  show = false;
  tickers = [];
  open = [];
  close = [];
  sector = [];
  tickerssectors = [];
  currentDate: any;
  b: any;
  s: any;
  fee = false;
  reg = false;
  Tech = 'Tech';
  feepay() {
    this.reg = false;
    this.fee = true;
    this.pay(3);
    if (this.amountpaid) {
      var url =
        'https://BlitzbuyBackend.trentsmith1.repl.co/insert/user/' +
        this.usernamereg +
        '/' +
        this.passwordreg;
      this.http.get(url).subscribe((data: any[]) => {
        this.data1 = data;
      });
      alert('success!!');
    }
  }
  register() {
    this.fee = false;
    this.reg = true;
  }
  ProcessReg() {
    var url1 = 'https://glassbothtexts--trentsmith1.repl.co/insert/user/u1/p1';
    var temp;
    this.http.get(url1).subscribe((data: any[]) => {
      temp = data;
    });
  }
  ngOnInit() {
    this.loadStripe();
    let json = { username: 'username3', password: 'password3' };
    /*this.getData(
      "https://run.mocky.io/v3/09403ebb-cee4-4fb2-8c4d-c25ff4c2b968"
    );*/
  }

  getDate(offset: any) {
    var x = new Date();
    var yi = x.getFullYear();
    var mi = x.getMonth() + 1;
    var di = x.getDate();
    var m0 = 0;
    var temp = offset;
    var t = mi;
    while (di - offset < 0) {
      m0++;
      if (t == 2) {
        offset = offset - 28;
      } else if (t % 2 == 0) {
        offset = offset - 30;
      } else if (t % 2 != 0) {
        offset = offset - 31;
      }
      t--;
      if (t == 0) {
        t = 12;
      }
    }
    if (m0 >= mi) {
      mi = t;
      if (mi == 1) {
        yi = yi - 1;
      } else {
        yi = yi - 1;
      }
    }
    var m = mi.toString();
    if (offset > 0) {
      var d = (di - offset).toString();
    } else {
      var d = di.toString();
    }
    var y = yi.toString();

    d.length == 1 && (d = '0' + d);
    m.length == 1 && (m = '0' + m);
    var yyyymmdd = y + '-' + m + '-' + d;
    console.log(yyyymmdd);
    //this.currentDate = yyyymmdd;
    return yyyymmdd;
  }

  stockhistory: any[];
  temp: any;
  volume: any[];
  price: any[];
  percent: any[];
  volumeaverage: any[];
  percentaverage: any;
  priceaverage: any[];
  test = [];
  count: any[] = [];
  getVolume() {
    this.volumeaverage = [];
    //this.count = [];
    this.volume = [];
    //gets data for the tickers and put them in an array
    for (var i = 0; i < this.tickers.length; i++) {
      //this.count.push(0);
      //gets data for an individual ticker
      var url1 =
        'https://api.marketstack.com/v1/eod?access_key=27da2da60bc4eecb62e22be17aae1c0e&symbols=' +
        this.tickers[i] +
        '&date_from=2023-03-26&date_to=2023-03-30';

      this.http.get(url1).subscribe((data: any[]) => {
        this.temp = data;
      });
      console.log(this.temp);
      //checks the dates for the stock
      var days = 4;
      //this.volumeaverage[i] = 0;
      var volumeA = 0;
      for (var j = 0; j < days; j++) {
        try {
          //this.getDate(i);
          var volume1 = this.temp['data'][i]['volume'];
          console.log('volume1 is ' + volume1);
          volumeA = volumeA + volume1;
          this.volume.push(volume1);
          console.log('volume is ' + this.volume);
        } catch (err) {
          console.log(this.currentDate + 'failure');
        }
      }
      //puts the number of volume average in an array for the particular stock
      this.volumeaverage.push(0);
      this.volumeaverage[i] = volumeA / this.volume.length;
      console.log(
        'volume average is ' + this.volumeaverage[this.volumeaverage.length - 1]
      );
      //console.log(volume1);
    }
    console.log(this.volumeaverage);
  }
  getPrice() {
    var price = [];
    this.priceaverage = [];
    var count = 0;
    //gets data for the individual stock
    for (var i = 0; i < this.tickers.length; i++) {
      //pushes empty array for the ticker's use
      price.push([]);
      this.priceaverage.push(0);
      //gets data from the url for the ticker
      var url1 =
        'https://api.marketstack.com/v1/eod?access_key=27da2da60bc4eecb62e22be17aae1c0e&symbols=' +
        this.tickers[i] +
        '&date_from=2023-03-26&date_to=2023-03-30';

      this.http.get(url1).subscribe((data: any[]) => {
        this.temp = data;
      });
      console.log(this.temp);
      price = [[]];
      var count1 = 0;
      //checks the dates for the prices to find a counter balance
      var days = 4;
      var priceopenA = 0;
      var pricecloseA = 0;
      for (var j = 0; j < days; j++) {
        try {
          console.log('success');
          var open = this.temp['data'][j]['open'];
          var close = this.temp['data'][j]['close'];
          console.log('open is ' + open);
          console.log('close is ' + close);
          console.log(this.priceaverage);
          this.priceaverage[i] = this.priceaverage[i] + close + open;
          console.log(this.priceaverage);
          //puts the price into the open and close
          price[count].push(open);
          price[count].push(close);
          console.log(price);
          //counts the amount of prices
          count1++;
        } catch (err) {
          console.log(this.currentDate + 'failure');
          console.log(err);
        }
      }
      this.priceaverage[i] = this.priceaverage[i] / (2 * days);
      console.log(this.priceaverage);
      count++;
    }
    this.price = price;
  }
  NN: any[];
  temp1: any[];
  buyorsell: any[];
  getbuyorsellnew() {
    var buyorsell = [];
    var today = this.getDate(0);
    var firstdayoffset = this.getDate(10);
    /*var url1 =
      'https://api.marketstack.com/v1/eod?access_key=6158cebbbad397e037e6807f887a3a67&symbols=' +
      this.tickers[i] +
      '&date_from=' +
      firstdayoffset +
      '&date_to=' +
      today;*/
    //note this one will fix it.

    //loops through tickers]
    var p = [];
    var v = [];
    for (var i = 0; i < this.tickers.length; i++) {
      console.log('dates are ' + today);
      console.log('dates are ' + firstdayoffset);
      //loops through the days
      var url1 =
        'https://api.marketstack.com/v1/eod?access_key=27da2da60bc4eecb62e22be17aae1c0e&symbols=' +
        this.tickers[i] +
        '&date_from=' +
        firstdayoffset +
        '&date_to=' +
        today;
      /*var url1 =
      'https://api.marketstack.com/v1/eod?access_key=6158cebbbad397e037e6807f887a3a67&symbols=' +
      this.tickers[i] +
      '&date_from=' +
      firstdayoffset +
      '&date_to=' +
      today;*/
      //note this one will fix it.
      this.http.get(url1).subscribe((data: any[]) => {
        this.temp = data;
      });
      var maxhigh = this.temp['data'][0]['high'];
      var minlow = this.temp['data'][0]['low'];
      var maxvolume = this.temp['data'][0]['volume'];
      var minvolume = this.temp['data'][0]['volume'];
      for (var j = 0; j < this.temp['data'].length; j++) {
        var high = this.temp['data'][j]['high'];
        var low = this.temp['data'][j]['low'];
        var volume = this.temp['data'][j]['volume'];

        if (high > maxhigh) {
          maxhigh = high;
        }
        if (low < minlow) {
          minlow = low;
        }
        if (volume > maxvolume) {
          maxvolume = volume;
        }
        if (volume < minvolume) {
          minvolume = volume;
        }
      }
      //calculations high price and volume
      var hml = maxhigh - minlow;
      var hvl = maxvolume - minvolume;
      //array of the prices for references
      var lowhighprice = [
        minlow,
        minlow + hml * 0.25,
        minlow + hml * 0.5,
        minlow + hml * 0.75,
        maxhigh,
      ];
      var lowhighvolume = [
        minvolume,
        minvolume + hvl * 0.25,
        minvolume + hvl * 0.5,
        minvolume + hvl * 0.75,
        maxvolume,
      ];
    }

    for (j = 0; j < this.temp['data'].length; j++) {
      var open = this.temp['data'][j]['open'];
      var volume1 = this.temp['data'][j]['volume'];
      var count = 0;
      for (var m = 0; m < lowhighprice.length - 1; m++) {
        console.log(m + ' ' + lowhighprice[m]);
        console.log(open);
        if (lowhighvolume[m] < volume1) {
          if (m == 0) {
            v.push(m);
          } else if (lowhighvolume[m + 1] >= volume1) {
            v.push(m);
          } else if (lowhighvolume[m + 1] < volume1) {
            v.push(100);
          }
        }
        if (lowhighprice[m] < open) {
          console.log(lowhighprice);
          console.log(open);
          if (m == 0) {
            p.push(m);
          } else if (lowhighprice[m + 1] >= open) {
            p.push(m);
          } else if (lowhighprice[m + 1] < open) {
            p.push(100);
          }
        }

        //counting the number of  times open is close and
        var open = this.temp['data'][j]['open'];
        var close = this.temp['data'][j]['close'];
        if (open < close) {
          count++;
        } else {
          count--;
        }
      }
    }
    console.log(p);
    console.log(v);

    //array to be pushed to buy or sell for the ticker and final call
    for (var i = 0; i < this.tickers.length; i++) {
      var array = [this.tickers[i], 0];
      var bias;
      //checks the count of the prices and sees where the trend is going.
      if (count > 0) {
        bias = 1;
      } else if (count < 0) {
        bias = 3;
      } else {
        bias = 0;
      }
      if (this.count[i] > -1) {
        console.log(p);
        console.log('bias is' + bias);
        if (p[i] < bias) {
          array[1] = 1;
        } else if (v[i] < bias && p[i] < bias) {
          array[1] = 0;
        } else if (v[i] < bias && p[i] > bias) {
          array[1] = 0;
        } else if (v[i] > bias && p[i] < bias) {
          array[1] = 1;
        }
      } else {
        console.log(p);
        console.log(m);
        array[1] = 1;
      }
      buyorsell.push(array);
    }
    console.log(this.count);
    console.log('array is ' + array);
    this.buyorsell = buyorsell;
  }

  info: any[];
  gettickersymbols() {
    this.info = [];
    this.tickers.push(this.stock);
    this.count.push(0);
    this.tickerssectors.push([]);

    this.tickerssectors.push('');
    this.test = [];
    this.test.push('');
    console.log(this.test);
    var stockstring = '';
    for (var i = 0; i < this.tickers.length; i++) {
      if (i == 0) {
        stockstring = this.tickers[i];
      } else {
        stockstring = stockstring + ',' + this.tickers[i];
      }
    }
  }

  deleteTickersymbols() {
    for (var i = 0; i < this.tickers.length; i++) {
      if (this.stock == this.tickers[i]) {
        var temp = this.tickers[this.tickers.length - 1];
        this.tickers[this.tickers.length - 1] = this.tickers[i];
        this.tickers[i] = temp;
        this.tickers.pop();
        break;
      }
    }
    console.log(this.tickers);
  }
  deleteTickersymbolsonclick(stock: any) {
    for (var i = 0; i < this.tickers.length; i++) {
      if (stock == this.tickers[i]) {
        var temp = this.tickers[this.tickers.length - 1];
        this.tickers[this.tickers.length - 1] = this.tickers[i];
        this.tickers[i] = temp;
        this.tickers.pop();
        break;
      }
    }
    console.log(this.tickers);
  }
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(s);
    }
  }
  amountpaid = false;
  pay(amount) {
    this.amountpaid = false;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.amountpaid = true;
        console.log(token);
        alert('Token Created!!');
      },
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100,
    });
    this.ProcessReg();
  }
  getSector(ticker: any) {
    console.log(ticker);
    //if(this.tickers.length == this.tickerssectors.length)
    //{
    this.tickerssectors = [];
    var sarray: any[];
    for (var i = 0; i < this.tickers.length; i++) {
      if (ticker == this.tickers[i]) {
        var count = i;
      }
    }
    //}
    if (this.test[count] == 'Materials') {
      this.tickerssectors[count] = [
        'ADKIL',
        'ABENU',
        'ADTC',
        'ASIX',
        'AFML',
        'AFYG',
        'AGGL',
        'APD',
        'ASKE',
        'ALB',
        'AA',
        'ACNE',
        'ALKN',
        'AAGC',
        'HYII',
      ];
      sarray = [
        'ADKIL',
        'ABENU',
        'ADTC',
        'ASIX',
        'AFML',
        'AFYG',
        'AGGL',
        'APD',
        'ASKE',
        'ALB',
        'AA',
        'ACNE',
        'ALKN',
        'AAGC',
        'HYII',
      ];
    }
    if (this.test[count] == 'Telecom') {
      this.tickerssectors[count] = ['S', 'CCOI', 'VZ', 'T', 'BCE']; //["F","GOOG"];
      sarray = ['S', 'CCOI', 'VZ', 'T', 'BCE'];
    }

    if (this.test[count] == 'Consumer Staples') {
      this.tickerssectors[count] = ['TGT', 'KR', 'CLX']; //["F","GOOG"];
      sarray = ['TGT', 'KR', 'CLX']; //["F","GOOG"];;
    }
    if (this.test[count] == 'Consumer Discretionary' || this.test[count] == 0) {
      this.tickerssectors[count] = ['NKE', 'SBUX', 'MCD', 'TJX', 'BKNG']; //["F","GOOG"];
      sarray = ['NKE', 'SBUX', 'MCD', 'TJX', 'BKNG'];
    }
    if (this.test[count] == 'Utilities' || this.test[count] == 0) {
      this.tickerssectors[count] = ['PPL', 'AWK', 'AES', 'NEE']; //["F","GOOG"];
      sarray = ['PPL', 'AWK', 'AES', 'NEE'];
    }
    if (this.test[count] == 'Tech' || this.test[count] == 0) {
      this.tickerssectors[count] = ['MSFT', 'GOOG', 'F']; //["F","GOOG"];
      sarray = ['MSFT', 'GOOG', 'F'];
    }
    if (this.test[count] == 'Energy') {
      this.tickerssectors[count] = ['ENPH'];
      sarray = ['ENPH'];
    }
    if (this.test[count] == 'Healthcare') {
      this.tickerssectors[count] = ['ISRG', 'VRTX', 'ABBV'];
      sarray = ['ISRG', 'VRTX', 'ABBV'];
    }
    if (this.test[count] == 'Industrials') {
      this.tickerssectors[count] = ['GE', 'CAT', 'HON'];
      sarray = ['GE', 'CAT', 'HON'];
    }
    if (this.test[count] == 'Real Estate') {
      this.tickerssectors[count] = ['AMT', 'PSA', 'FFO'];
      sarray = ['AMT', 'PSA', 'FFO'];
    }
    if (this.test[count] == 'Financials') {
      this.tickerssectors[count] = ['C', 'MS', 'BAC'];
      sarray = ['C', 'MS', 'BAC'];
    }
    console.log(this.tickerssectors[count]);
    console.log('the test array is' + this.test[count]);
    var today = this.getDate(0);
    var firstdayoffset = this.getDate(10);
    for (var i = 0; i < sarray.length; i++) {
      console.log('sarray is ' + sarray[i]);
      // for (var l = 0; l < this.tickerssectors.length; l++) {
      console.log(this.tickerssectors[count]);

      var url1 =
        'https://api.marketstack.com/v1/eod?access_key=27da2da60bc4eecb62e22be17aae1c0e&symbols=' +
        sarray[i] +
        '&date_from=' +
        firstdayoffset +
        '&date_to=' +
        today;
      /*var url1 =
    'https://api.marketstack.com/v1/eod?access_key=6158cebbbad397e037e6807f887a3a67&symbols=' +
    this.tickers[i] +
    '&date_from=' +
    firstdayoffset +
    '&date_to=' +
    today;*/
      //note this one will fix it.
      this.http.get(url1).subscribe((data: any[]) => {
        this.temp = data;
      });
      console.log(this.temp);
      console.log('the tickers are ' + this.tickers);
      var counttemp = [];
      this.count = counttemp;
      console.log(this.count);
      console.log(counttemp);
      this.count[count] = 0;
      for (var j = 0; j < this.temp['data'].length; j++) {
        var open = this.temp['data'][j]['open'];
        var close = this.temp['data'][j]['close'];
        console.log('counting counts');
        console.log(this.count);
        console.log(count);
        if (open < close) {
          this.count[count] = this.count[count] + 1;
        } else {
          this.count[count] = this.count[count] - 1;
        }
      }
    }

    console.log('The counts are ' + this.count);
  }
  password: string;
  username: string;
  onUsernameKeyUp(event: any) {
    this.username = event.target.value;
  }
  onPasswordKeyUp(event: any) {
    this.password = event.target.value;
  }
  usernamereg: any;
  passwordreg: any;
  onUsernameRegKeyUp(event: any) {
    this.usernamereg = event.target.value;
  }
  onPasswordregKeyUp(event: any) {
    this.passwordreg = event.target.value;
  }
  onstockKeyUp(event: any) {
    this.stock = event.target.value;
  }
  onsectorkKeyUp(event: any, stock: any) {
    console.log(stock);
    for (var i = 0; i < this.tickers.length; i++) {
      if (this.tickers[i] == stock) {
        var count = i;
      }
    }
    try {
      this.test[count] = event.target.value;
    } catch (e) {
      this.test[count] = event;
    }
    this.getSector(stock);
  }
  Login() {
    this.show = true;
  }
  showAI = false;
  showmanuel = false;
  AI() {
    this.showAI = true;
    this.showmanuel = false;
    this.tickers = [];
  }
  manual() {
    this.showmanuel = true;
    this.showAI = false;
    this.tickers = [];
  }
  manuelInformation = [];
  GetManuelInformation() {
    this.info = [];
    //this.tickers.push(this.stock);
    //this.open.push(this.b);
    //this.close.push(this.s);
    this.info.push(this.stock);
    this.info.push(this.b);
    this.info.push(this.s);

    this.manuelInformation.push(this.info);
    console.log(this.manuelInformation);
  }
  onbuyKeyUp(event: any) {
    this.b = event.target.value;
  }
  onsellKeyUp(event: any) {
    this.s = event.target.value;
  }
  Logout() {
    this.showAI = false;
    this.show = false;
    this.showmanuel = false;
    console.log(this.show);
  }

  data1: any[];
  getUserbyUsername() {
    var i = 0;
    this.show = false;
    console.log(this.username);
    console.log(this.password);
    0;
    console.log(this.data1);
    var url1 =
      'https://blitzbuybackend.trentsmith1.repl.co/select/user/' +
      this.username +
      '/' +
      this.password;
    this.http.get(url1).subscribe((data: any[]) => {
      this.data1 = data;
    });

    console.log('the url data is ' + this.data1);
  }
  /*getData(url: string) {
    var test;
    //var url1 = "https://glassbothtexts--trentsmith1.repl.co/getAllusers";
    //var url1 = "https://www.mocky.io/v2/5e1e02a43600001cf4c74556";
    var url1 = "https://run.mocky.io/v3/d370fcaf-010e-4749-b2a3-0a2b17277a54";
    this.http.get(url1).subscribe((data: any[]) => {
      this.data1 = data;
    });
    console.log(this.data1);
  }*/
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
