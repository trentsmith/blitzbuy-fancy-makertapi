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
      'https://api.marketstack.com/v1/eod?access_key=6158cebbbad397e037e6807f887a3a67&symbols=T&date_from=2023-03-26&date_to=2023-03-30';

    this.http.get(url1).subscribe((data: any[]) => {
      this.temp = data;
    });
  }
  title = 'project';
  url =
    'http://api.marketstack.com/v1/eod?access_key=6158cebbbad397e037e6807f887a3a67&symbols=T&date_from=2023-03-26&date_to=2023-03-30';
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
    this.currentDate = yyyymmdd;
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
  count: any[];
  getVolume() {
    this.volumeaverage = [0];
    this.count = [];
    this.volume = [];
    //gets data for the tickers and put them in an array
    for (var i = 0; i < this.tickers.length; i++) {
      this.count.push(0);
      //gets data for an individual ticker
      var url1 =
        'https://api.marketstack.com/v1/eod?access_key=6158cebbbad397e037e6807f887a3a67&symbols=' +
        this.tickers[i] +
        '&date_from=2023-03-26&date_to=2023-03-30';

      this.http.get(url1).subscribe((data: any[]) => {
        this.temp = data;
      });
      console.log(this.temp);
      //checks the dates for the stock
      var days = 4;
      this.volumeaverage[this.volumeaverage.length - 1] = 0;
      for (var i = 0; i < days; i++) {
        try {
          //this.getDate(i);
          var volume1 = this.temp['data'][i]['volume'];
          console.log('volume1 is ' + volume1);
          this.volumeaverage[this.volumeaverage.length] =
            this.volumeaverage[this.volumeaverage.length] + volume1;
          console.log(this.volumeaverage);
          this.volume.push(volume1);
          console.log(this.volume);
        } catch (err) {
          console.log(this.currentDate + 'failure');
        }
      }
      //puts the number of volume average in an array for the particular stock
      this.volumeaverage.push(
        this.volumeaverage[this.volumeaverage.length - 1] / this.volume.length
      );
      console.log(
        'volume average is ' + this.volumeaverage[this.volumeaverage.length - 1]
      );
      //console.log(volume1);
    }
  }
  getPrice() {
    var price = [];
    this.priceaverage = [0];
    var count = 0;
    //gets data for the individual stock
    for (var i = 0; i < this.tickers.length; i++) {
      //pushes empty array for the ticker's use
      price.push([]);
      this.priceaverage = [0];
      //gets data from the url for the ticker
      var url1 =
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' +
        this.tickers[i] +
        '&apikey=LTUI6TBDUNDHQYEG';

      this.http.get(url1).subscribe((data: any[]) => {
        this.temp = data;
      });

      price = [[]];
      var count1 = 0;
      //checks the dates for the prices to find a counter balance
      for (i = 0; i < 7; i++) {
        try {
          console.log('success');
          this.getDate(i);
          var open = this.temp['data'][i]['open'];
          var close = this.temp['data'][i]['close'];
          console.log('test');
          this.priceaverage[count] = this.priceaverage[count] + close;
          console.log('test');
          //puts the price into the open and close
          price[count].push(open);
          price[count].push(close);
          //counts the amount of prices
          count1++;
        } catch (err) {
          console.log(this.currentDate + 'failure');
          console.log(err);
        }
      }
      this.priceaverage[count] = this.priceaverage[count] / this.price.length;
      count++;
    }
    this.price = price;
  }
  NN: any[];
  temp1: any[];
  buyorsell: any[];
  getbuyorsell() {
    var buyorsell = [];
    this.count = [];
    //checks the tickers list
    for (var i = 0; i < this.tickers.length; i++) {
      var trycatch = 0;
      this.count.push(0);
      var url1 =
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' +
        this.tickers[i] +
        '&apikey=LTUI6TBDUNDHQYEG';
      //note this one will fix it.
      var offsetdate = 1;
      this.http.get(url1).subscribe((data: any[]) => {
        this.temp = data;
      });
      var maxhigh = 0;
      try {
        var offsetdate = 1;

        this.getDate(offsetdate);

        var minlow =
          this.temp['Time Series (Daily)'][this.currentDate]['3. low'];
        var maxvolume =
          this.temp['Time Series (Daily)'][this.currentDate]['5. volume'];
        var minvolume =
          this.temp['Time Series (Daily)'][this.currentDate]['5. volume'];
      } catch {
        var offsetdate = 3;

        this.getDate(offsetdate);

        var minlow =
          this.temp['Time Series (Daily)'][this.currentDate]['3. low'];
        var maxvolume =
          this.temp['Time Series (Daily)'][this.currentDate]['5. volume'];
        var minvolume =
          this.temp['Time Series (Daily)'][this.currentDate]['5. volume'];
      }
      //check for the values to base them off of volume
      for (var j = 10; j > 2; j--) {
        try {
          this.getDate(j + 4);
          var high =
            this.temp['Time Series (Daily)'][this.currentDate]['2. high'];
          var low =
            this.temp['Time Series (Daily)'][this.currentDate]['3. low'];
          console.log('low is ' + low);
          var volume =
            this.temp['Time Series (Daily)'][this.currentDate]['5. volume'];

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
          //note to calculate percentage
        } catch (err) {
          //console.log(this.currentDate.toString()+"failed");
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

      //change from p

      var l = 1;
      //offset of the days
      var offset = 0;
      //change from p

      while (!l) {
        this.getDate(offset);
        //tests to see if it past today and into tomorrow which dne
        try {
          var open =
            this.temp['Time Series (Daily)'][this.currentDate]['1. open'];
          var close =
            this.temp['Time Series (Daily)'][this.currentDate]['4. close'];
          var volume1 =
            this.temp['Time Series (Daily)'][this.currentDate]['5. volume'];
          //change from p
          l = 0;
        } catch (err) {
          offset++;

          //change from p
          l = 1;
        }
      }
      //double check this function the open is giving problems double check tuesday.
      var p;
      var v;
      this.getDate(offsetdate);
      open = this.temp['Time Series (Daily)'][this.currentDate]['1. open'];
      for (var m = 0; m < lowhighprice.length - 1; m++) {
        console.log(m + ' ' + lowhighprice[m]);
        console.log(open);
        if (lowhighvolume[m] < volume1) {
          if (m == 0) {
            v = m;
          }
          if (lowhighvolume[m + 1] >= volume1) {
            v = m;
          }
          if (lowhighvolume[m + 1] < volume1) {
            v = 100;
          }
        }
        if (lowhighprice[m] < open) {
          console.log(lowhighprice);
          console.log(open);
          if (m == 0) {
            p = m;
          }
          if (lowhighprice[m + 1] >= open) {
            p = m;
          }
          if (lowhighprice[m + 1] < open) {
            p = 100;
          }
        }
      }

      var array = [this.tickers[i], 0];

      array[1] = 0;
      var count = 0;
      for (var k = 10; k > 2; k--) {
        try {
          this.getDate(k);
          var open =
            this.temp['Time Series (Daily)'][this.currentDate]['1. open'];
          var close =
            this.temp['Time Series (Daily)'][this.currentDate]['4. close'];
          var volume1 =
            this.temp['Time Series (Daily)'][this.currentDate]['5. volume'];
          console.log(
            'open is ' +
              open +
              ' ' +
              close +
              ' ' +
              volume1 +
              ' ' +
              this.currentDate +
              ' ' +
              this.count[i]
          );
          console.log(this.count + ' ' + i);
          if (open < close) {
            this.count[i]++;
          } else {
            this.count[i]--;
          }
        } catch (err) {
          //console.log(this.currentDate.toString()+"failed");
        }
        var bias = 1;
      }
      if (this.count[i] > -1) {
        console.log(p);
        console.log(bias);
        if (p < bias) {
          array[1] = 1;
        } else if (v < bias && p < bias) {
          array[1] = 0;
        } else if (v < bias && p > bias) {
          array[1] = 0;
        } else if (v > bias && p < bias) {
          array[1] = 1;
        }
      } else {
        console.log(p);
        console.log(m);
        array[1] = 0;
      }
      buyorsell.push(array);
    }
    this.buyorsell = buyorsell;
  }
  info: any[];
  count = [];
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
    }
    if (this.test[count] == 'Telecom') {
      this.tickerssectors[count] = ['S', 'CCOI', 'VZ', 'T', 'BCE']; //["F","GOOG"];
    }

    if (this.test[count] == 'Consumer Staples') {
      this.tickerssectors[count] = ['TGT', 'KR', 'CLX']; //["F","GOOG"];
    }
    if (this.test[count] == 'Consumer Discretionary' || this.test[count] == 0) {
      this.tickerssectors[count] = ['NKE', 'SBUX', 'MCD', 'TJX', 'BKNG']; //["F","GOOG"];
    }
    if (this.test[count] == 'Utilities' || this.test[count] == 0) {
      this.tickerssectors[count] = ['PPL', 'AWK', 'AES', 'NEE']; //["F","GOOG"];
    }
    if (this.test[count] == 'Tech' || this.test[count] == 0) {
      this.tickerssectors[count] = ['MSFT', 'GOOG', 'F']; //["F","GOOG"];
    }
    if (this.test[count] == 'Energy') {
      this.tickerssectors[count] = ['ENPH'];
    }
    if (this.test[count] == 'Healthcare') {
      this.tickerssectors[count] = ['ISRG', 'VRTX', 'ABBV'];
    }
    if (this.test[count] == 'Industrials') {
      this.tickerssectors[count] = ['GE', 'CAT', 'HON'];
    }
    if (this.test[count] == 'Real Estate') {
      this.tickerssectors[count] = ['AMT', 'PSA', 'FFO'];
    }
    if (this.test[count] == 'Financials') {
      this.tickerssectors[count] = ['C', 'MS', 'BAC'];
    }
    console.log(this.tickerssectors[count]);
    console.log(this.test[count]);
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
    if (
      this.data1[0].username != undefined &&
      this.data1[0].usename != null &&
      this.data1[0].username != []
    ) {
      this.showAI = true;
      this.show = true;
      this.showmanuel = true;
    }
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
