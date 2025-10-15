# AuthenticationApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerGetProfile**](#authcontrollergetprofile) | **GET** /api/v1/auth/profile | Get user profile|
|[**authControllerLogin**](#authcontrollerlogin) | **POST** /api/v1/auth/login | User login|
|[**authControllerRefreshToken**](#authcontrollerrefreshtoken) | **POST** /api/v1/auth/refresh | Refresh access token|
|[**authControllerRegister**](#authcontrollerregister) | **POST** /api/v1/auth/register | User registration|

# **authControllerGetProfile**
> authControllerGetProfile()

Get current authenticated user profile

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

const { status, data } = await apiInstance.authControllerGetProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[JWT-auth](../README.md#JWT-auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerLogin**
> authControllerLogin(loginDto)

🔐 Authenticate user with email and password. After successful login, the JWT token will be automatically captured and used for all protected endpoints. No manual token setup required!

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    LoginDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let loginDto: LoginDto; //

const { status, data } = await apiInstance.authControllerLogin(
    loginDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginDto** | **LoginDto**|  | |


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerRefreshToken**
> authControllerRefreshToken()

Generate a new access token using the current valid token

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

const { status, data } = await apiInstance.authControllerRefreshToken();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[JWT-auth](../README.md#JWT-auth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerRegister**
> authControllerRegister(registerDto)

Register a new user account

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    RegisterDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let registerDto: RegisterDto; //

const { status, data } = await apiInstance.authControllerRegister(
    registerDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerDto** | **RegisterDto**|  | |


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

