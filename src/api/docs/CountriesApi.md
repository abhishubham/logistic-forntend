# CountriesApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCountry**](#createcountry) | **POST** /api/v1/master/countries | Create country|
|[**getCountryById**](#getcountrybyid) | **GET** /api/v1/master/countries/{id} | Get country by id|
|[**listCountries**](#listcountries) | **GET** /api/v1/master/countries | List countries|
|[**searchCountries**](#searchcountries) | **GET** /api/v1/master/countries/search | Search countries|

# **createCountry**
> createCountry(createCountryDto)


### Example

```typescript
import {
    CountriesApi,
    Configuration,
    CreateCountryDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let createCountryDto: CreateCountryDto; //

const { status, data } = await apiInstance.createCountry(
    createCountryDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCountryDto** | **CreateCountryDto**|  | |


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

# **getCountryById**
> getCountryById()


### Example

```typescript
import {
    CountriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getCountryById(
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

# **listCountries**
> listCountries()


### Example

```typescript
import {
    CountriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

const { status, data } = await apiInstance.listCountries();
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

# **searchCountries**
> searchCountries()


### Example

```typescript
import {
    CountriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let sortDir: 'ASC' | 'DESC'; // (optional) (default to undefined)
let sortBy: string; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let countryCode: string; // (optional) (default to undefined)
let countryName: string; // (optional) (default to undefined)
let countryId: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.searchCountries(
    sortDir,
    sortBy,
    pageSize,
    page,
    countryCode,
    countryName,
    countryId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sortDir** | [**&#39;ASC&#39; | &#39;DESC&#39;**]**Array<&#39;ASC&#39; &#124; &#39;DESC&#39;>** |  | (optional) defaults to undefined|
| **sortBy** | [**string**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **countryCode** | [**string**] |  | (optional) defaults to undefined|
| **countryName** | [**string**] |  | (optional) defaults to undefined|
| **countryId** | [**number**] |  | (optional) defaults to undefined|


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

