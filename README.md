## 프로젝트 구조
```
 public
 └── data           : 정적 json 파일
 src
 ├── app
 │   ├── [cityName] : 동적 라우팅 (/{cityname})
 │   ├── components : 컴포넌트 (주로 csr)
 │   │   └── icons  
 │   │   └── styles : .module.css 파일
 │   ├── context    
 │   └── store      : state 저장
 ├── hooks          
 ├── service        : 중복 코드 저장
 └── types          : type 정의 (TS 관리)
```
**사용 기술**
- next.js
- react-query
- axios


## 동작 방법 및 설명

- nextjs의 앱라우팅을 사용했습니다.<br>
메인페이지(app/page)와 동적 라우팅되는 도시 상세 페이지(app/[cityName])가 있습니다.<br>
state를 사용하는 컴포넌트는 CSR로, 이외에는 SSR로 반응합니다.

- 상태관리는 react-query와 recoil로 나누었습니다.<br>
react-query는 'weather API' 등의 요청을 처리하며,<br>
recoil은 '검색어'와 같은 자주 바뀌는 상태를 저장합니다.


## 포인트

- 날씨 데이터 인덱스별 캐시<br>
cityName으로 query key를 관리합니다. 캐시된 데이터가 있다면 api 요청하지 않고 데이터를 반환합니다.<br>
react-query는 key 별로 데이터를 인덱싱하여 관리할 수 있으므로, <br>
서비스가 확장된다면 일부 도시들의 날씨를 지속적으로 요청받거나, 개인화된 페이지에서 별도로 관리하도록 변경할 수 있습니다.

```javascript
const { data: weather, isLoading } = useQuery(
    ["weather", city.name],
    async () => {
      return await axios
        .get(url)
        .then(({ data }) => data)
        .then((data) => data.current);
    },
    { cacheTime: 1000 * 60 * 10 }
  );

```

- 검색어 예외처리<br>
사용자의 검색어에 대한 예외처리와 이것을 디코딩한 값과 도시 리스트를 비교합니다.

```javascript
export const getCity = async (cityName: string): Promise<City | undefined> => {
  const cities = await axios
    .get(`${process.env.NEXT_PUBLIC_LOCALHOST}/data/citylist.json`) //
    .then({data} => data);

  return cities.find(
    (city: City) =>
      city.name.replace(/(\s*)/g, "").toLowerCase() ===
      decodeURIComponent(cityName).replace(/(\s*)/g, "").toLowerCase()
  );
};
```
