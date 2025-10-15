# CarriersApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCarrier**](#createcarrier) | **POST** /api/v1/master/carriers | Create carrier|
|[**getCarrierById**](#getcarrierbyid) | **GET** /api/v1/master/carriers/{id} | Get carrier by id|
|[**listCarriers**](#listcarriers) | **GET** /api/v1/master/carriers | List carriers|

# **createCarrier**
> createCarrier(createCarrierDto)


### Example

```typescript
import {
    CarriersApi,
    Configuration,
    CreateCarrierDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CarriersApi(configuration);

let createCarrierDto: CreateCarrierDto; //

const { status, data } = await apiInstance.createCarrier(
    createCarrierDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCarrierDto** | **CreateCarrierDto**|  | |


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

# **getCarrierById**
> getCarrierById()


### Example

```typescript
import {
    CarriersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarriersApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getCarrierById(
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

# **listCarriers**
> listCarriers()


### Example

```typescript
import {
    CarriersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CarriersApi(configuration);

const { status, data } = await apiInstance.listCarriers();
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

