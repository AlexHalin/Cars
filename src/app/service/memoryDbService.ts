import {InMemoryDbService} from 'angular-in-memory-web-api';

export class MemoryDbService implements InMemoryDbService {
  createDb() {
    let owners = [
        {
          aLastName: 'Halin',
          aFirstName: 'Alexey',
          aMiddleName: 'Alexandrovich',
          aCars: [
            {
              aNumber: 'AH0411XX',
              aBrand: 'DeLorean',
              aModel: 'Time machine',
              aYear: 2019,
            },
            {
              aNumber: 'AH1995XX',
              aBrand: 'Tesla',
              aModel: 'X',
              aYear: 2021,
            }
          ]
        }
      ]
    ;
    let asd = (a, b) => {
      console.log(a, b);
    }
    return {owners, asd};
  }
}
