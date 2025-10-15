# PortsAirportsApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createPortAirport**](#createportairport) | **POST** /api/v1/master/ports-airports | Create port/airport|
|[**getPortAirportById**](#getportairportbyid) | **GET** /api/v1/master/ports-airports/{id} | Get port/airport by id|
|[**listPortsAirports**](#listportsairports) | **GET** /api/v1/master/ports-airports | List ports/airports|

# **createPortAirport**
> createPortAirport(createPortAirportDto)


### Example

```typescript
import {
    PortsAirportsApi,
    Configuration,
    CreatePortAirportDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PortsAirportsApi(configuration);

let createPortAirportDto: CreatePortAirportDto; //

const { status, data } = await apiInstance.createPortAirport(
    createPortAirportDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPortAirportDto** | **CreatePortAirportDto**|  | |


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

# **getPortAirportById**
> getPortAirportById()


### Example

```typescript
import {
    PortsAirportsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PortsAirportsApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.getPortAirportById(
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

# **listPortsAirports**
> listPortsAirports()


### Example

```typescript
import {
    PortsAirportsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PortsAirportsApi(configuration);

const { status, data } = await apiInstance.listPortsAirports();
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

