Atlas search element consisted of eight tasks.

Three indexes were created in support of the searches.

product-search-index: 

```
{
  "mappings": {
    "dynamic": true
  }
}
```

product-name-autocomplete:
```
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "name": [
        {
          "dynamic": true,
          "type": "document"
        },
        {
          "type": "autocomplete"
        }
      ]
    }
  }
}
```

product-name-synonym-index:

```
{
  "mappings": {
    "dynamic": true
  },
  "synonyms": [
    {
      "analyzer": "lucene.standard",
      "name": "search_synonyms",
      "source": {
        "collection": "search_synonyms"
      }
    }
  ]
}
``