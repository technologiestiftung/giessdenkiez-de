# Documentation

This is some documentation that does not fit into the main README.md


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Documentation](#documentation)
  - [Stats From the DB](#stats-from-the-db)

<!-- /code_chunk_output -->


## Stats From the DB

These are some SQL queries we can use to get some stats from the Database.

1471 trees where adopted.
1447 are unique (there are double adoptions).
This was done by 663 unique users.

1583 have been watered.
1128 of these are unique.
This was done by 450 unique users.

State: 2020-05-27 08:35:51

```sql

-- adoption

SELECT
  *
FROM
  trees_adopted;

SELECT
  count(*) AS "adopted trees"
FROM
  trees_adopted;

SELECT
  count(DISTINCT tree_id) AS "unique trees"
FROM
  trees_adopted;

SELECT
  count(DISTINCT uuid) AS "unique users"
FROM
  trees_adopted;

-- watering

SELECT
  *
FROM
  trees_watered;

SELECT
  count(*) AS "trees watered"
FROM
  trees_watered;

SELECT
  count(DISTINCT tree_id) AS "unique trees watered"
FROM
  trees_watered;

SELECT
  count(DISTINCT uuid) AS "unique watering users"
FROM
  trees_watered;
```
