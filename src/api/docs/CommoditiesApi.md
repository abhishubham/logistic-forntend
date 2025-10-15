# CommoditiesApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCommodity**](#createcommodity) | **POST** /api/v1/master/commodities | Create commodity|
|[**getCommodityById**](#getcommoditybyid) | **GET** /api/v1/master/commodities/{id} | Get commodity by id|
|[**listCommodities**](#listcommodities) | **GET** /api/v1/master/commodities | List commodities|

# **createCommodity**
> createCommodity(createCommodityDto)


### Example

```typescript
import {
    CommoditiesApi,
    Configuration,
    CreateCommodityDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CommoditiesApi(configuration);

let createCommodityDto: CreateCommodityDto; //

const { status, data } = await apiInstance.createCommodity(
    createCommodityDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCommodityDto** | **CreateCommodityDto**|  | |


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

# **getCommodityById**
> getCommodityById()


### Example

```typescript
import {
    CommoditiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommoditiesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getCommodityById(
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

# **listCommodities**
> listCommodities()


### Example

```typescript
import {
    CommoditiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommoditiesApi(configuration);

const { status, data } = await apiInstance.listCommodities();
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

