# CitiesApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCity**](#createcity) | **POST** /api/v1/master/cities | Create city|
|[**getCityById**](#getcitybyid) | **GET** /api/v1/master/cities/{id} | Get city by id|
|[**listCities**](#listcities) | **GET** /api/v1/master/cities | List cities|

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

