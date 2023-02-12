
# React Native Assessment






## API Reference
Domain:-  https://mytest.aslu2183.info
#### List Vehicles

```http
  POST /api/list-vehicles
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filter` | `array` | Optional: Selected variants array. Ex: [ ["CAR","BMW","X2"] , ["BUS"]] |

#### List Categories

```http
  GET /api/list-categories
```
#### Create Category

```http
  POST /api/create-category
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Requried** |

#### Create Brand

```http
  POST /api/create-brand
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Requried** |
| `category` | `string` | **Requried** |

#### Create Model

```http
  POST /api/create-model
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Requried** |
| `brand` | `string` | **Requried** |

#### Create Variant

```http
  POST /api/create-variant
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Requried** |
| `model` | `string` | **Requried** |


#### Create Vehicle

```http
  POST /api/create-vehicle
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Requried** |
| `category` | `string` | **Requried** |
| `brand` | `string` | Optional |
| `model` | `string` | Optional |
| `variant` | `string` | Optional |
| `image` | `file` | Optional |




