# CreatePartyDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**short_name** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [default to undefined]
**billing_address** | **string** |  | [optional] [default to undefined]
**corporate_address** | **string** |  | [optional] [default to undefined]
**credit_limit** | **string** |  | [optional] [default to undefined]
**credit_days** | **number** |  | [optional] [default to undefined]
**tds_rate** | **string** |  | [optional] [default to undefined]
**tds_applicable** | **boolean** |  | [optional] [default to undefined]
**contact_person** | **string** |  | [optional] [default to undefined]
**phone** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreatePartyDto } from './api';

const instance: CreatePartyDto = {
    name,
    short_name,
    type,
    billing_address,
    corporate_address,
    credit_limit,
    credit_days,
    tds_rate,
    tds_applicable,
    contact_person,
    phone,
    email,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
