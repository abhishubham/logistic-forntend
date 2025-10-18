# CitiesApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCity**](#createcity) | **POST** /api/v1/master/cities | Create city|
|[**getCityById**](#getcitybyid) | **GET** /api/v1/master/cities/{id} | Get city by id|
|[**listCities**](#listcities) | **GET** /api/v1/master/cities | List cities|
|[**searchCities**](#searchcities) | **GET** /api/v1/master/cities/search | Search cities|

# **createCity**
> createCity(createCityDto)


### Example

```typescript
import {
    CitiesApi,
    Configuration,
    CreateCityDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let createCityDto: CreateCityDto; //

const { status, data } = await apiInstance.createCity(
    createCityDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCityDto** | **CreateCityDto**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCityById**
> getCityById()


### Example

```typescript
import {
    CitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getCityById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listCities**
> listCities()


### Example

```typescript
import {
    CitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

const { status, data } = await apiInstance.listCities();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **searchCities**
> searchCities()


### Example

```typescript
import {
    CitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let sortDir: 'ASC' | 'DESC'; // (optional) (default to undefined)
let sortBy: string; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)
let cityCode: string; // (optional) (default to undefined)
let cityName: string; // (optional) (default to undefined)
let cityId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.searchCities(
    sortDir,
    sortBy,
    pageSize,
    page,
    countryId,
    cityCode,
    cityName,
    cityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sortDir** | [**&#39;ASC&#39; | &#39;DESC&#39;**]**Array<&#39;ASC&#39; &#124; &#39;DESC&#39;>** |  | (optional) defaults to undefined|
| **sortBy** | [**string**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **countryId** | [**number**] |  | (optional) defaults to undefined|
| **cityCode** | [**string**] |  | (optional) defaults to undefined|
| **cityName** | [**string**] |  | (optional) defaults to undefined|
| **cityId** | [**number**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

