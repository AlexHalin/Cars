import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

export class MemoryDbService implements InMemoryDbService {
  createDb() {
    let owners = [
        {
          id: 1,
          aLastName: 'Halin',
          aFirstName: 'Alexey',
          aMiddleName: 'Alexandrovich',
          aCars: [
            {
              aNumber: 'AH0411XX',
              aBrand: 'DeLorean',
              aModel: 'Time machine',
              aYear: '2019',
            },
            {
              aNumber: 'AH1995XX',
              aBrand: 'Tesla',
              aModel: 'X',
              aYear: '2021',
            }
          ]
        }
      ]
    ;

    return {owners};
  }

  patch(request: RequestInfo): Observable<Response> {
    console.log('This is inside your custom patch method!', request);
    return null;
  }
}
