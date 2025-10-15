# PartiesApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createParty**](#createparty) | **POST** /api/v1/master/parties | Create party|
|[**getPartyById**](#getpartybyid) | **GET** /api/v1/master/parties/{id} | Get party by id|
|[**listParties**](#listparties) | **GET** /api/v1/master/parties | List parties|

# **createParty**
> createParty(createPartyDto)


### Example

```typescript
import {
    PartiesApi,
    Configuration,
    CreatePartyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PartiesApi(configuration);

let createPartyDto: CreatePartyDto; //

const { status, data } = await apiInstance.createParty(
    createPartyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPartyDto** | **CreatePartyDto**|  | |


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

# **getPartyById**
> getPartyById()


### Example

```typescript
import {
    PartiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PartiesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getPartyById(
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

# **listParties**
> listParties()


### Example

```typescript
import {
    PartiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PartiesApi(configuration);

const { status, data } = await apiInstance.listParties();
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

