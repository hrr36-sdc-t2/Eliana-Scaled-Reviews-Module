### CRUD API Endpoints

---

`GET` /rooms/reviews/recent/:listing_id

`GET` /rooms/reviews/relevant/:listing_id

`GET` /rooms/reviews/filter/:listing_id?query=

`POST` /rooms/reviews/:listing_id

`PUT` /rooms/reviews/:review_id

`DELETE` /rooms/reviews/:review_id

#### Parameters

| Name       | Type | Description       |
| ---------- | ---- | ----------------- |
| listing_id | int  | ID of the listing |
| review_id  | int  | ID of the review  |