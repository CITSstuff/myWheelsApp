import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const vehicles = [
        {
            _id: "5d3dba0518d64f445beb189b",
            index: 0,
            isOnsight: false,
            date_added: "Mon Dec 22 1997 03:55:53 GMT+0200 (South Africa Standard Time)",
            make: "Skoda Laura",
            kms: 2089,
            color: "blue",
            year: "Thu Oct 20 1983 14:54:51 GMT+0200 (South Africa Standard Time)",
            registration: "HE 12 RH GP",
            tank: 3,
            status: "onDuty"
          },
          {
            _id: "5d3dba0593edf001c4b71b6b",
            index: 1,
            isOnsight: true,
            date_added: "Fri Apr 11 2014 14:33:49 GMT+0200 (South Africa Standard Time)",
            make: "Mazda LaPuta",
            kms: 5730,
            color: "white",
            year: "Sun Aug 03 2014 18:44:56 GMT+0200 (South Africa Standard Time)",
            registration: "HY 23 WRGP",
            tank: 6,
            status: "onDuty"
          },
          {
            _id: "5d3dba058a76c13a72a90552",
            index: 2,
            isOnsight: true,
            date_added: "Wed May 31 1972 17:31:39 GMT+0200 (South Africa Standard Time)",
            make: "Skoda Laura",
            kms: 5223,
            color: "blue",
            year: "Sun Apr 27 1997 11:51:15 GMT+0200 (South Africa Standard Time)",
            registration: "HY 23 WRGP",
            tank: 9,
            status: "onDuty"
          },
          {
            _id: "5d3dba05512cd2227418dd02",
            index: 3,
            isOnsight: false,
            date_added: "Tue Jul 06 1971 17:05:30 GMT+0200 (South Africa Standard Time)",
            make: "Toyota MR2",
            kms: 16307,
            color: "white",
            year: "Fri Jan 27 2012 20:51:16 GMT+0200 (South Africa Standard Time)",
            registration: "HE 12 RH GP",
            tank: 9,
            status: "onSight"
          },
          {
            _id: "5d3dba0535b64e6d27d672d0",
            index: 4,
            isOnsight: true,
            date_added: "Sun Apr 27 1980 06:58:40 GMT+0200 (South Africa Standard Time)",
            make: "Mitsubishi Pajero",
            kms: 10807,
            color: "red",
            year: "Sat Nov 14 2009 22:53:43 GMT+0200 (South Africa Standard Time)",
            registration: "HE 12 RH GP",
            tank: 12,
            status: "onSight"
          },
          {
            _id: "5d3dba056d163abfa7e61ca5",
            index: 5,
            isOnsight: true,
            date_added: "Mon Jun 06 2005 04:04:04 GMT+0200 (South Africa Standard Time)",
            make: "Mitsubishi Pajero",
            kms: 6086,
            color: "green",
            year: "Sat Feb 02 1980 17:54:13 GMT+0200 (South Africa Standard Time)",
            registration: "HE 12 RH GP",
            tank: 3,
            status: "onDuty"
          },
          {
            _id: "5d3dba05b9cdfec95069a11d",
            index: 6,
            isOnsight: false,
            date_added: "Sun Nov 09 1997 21:21:09 GMT+0200 (South Africa Standard Time)",
            make: "Mazda LaPuta",
            kms: 8936,
            color: "white",
            year: "Tue May 18 1976 18:43:15 GMT+0200 (South Africa Standard Time)",
            registration: "MK 765 GP",
            tank: 6,
            status: "onSight"
          }
    /*{
        id: 47,
        first_name: "Bill",
        last_name: "Lewis",
        user_name: "blewis",
        country: "United States",
    }*/
    ];
    return { vehicles };
  }
}