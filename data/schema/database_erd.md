# Dokumentasi Entity Relationship Diagram (ERD) & Kamus Skema

Basis data platform **"Pergerakan Ekonomi Indonesia"** menggunakan mesin relasional SQLite dengan 11 entitas terintegrasi untuk menjamin prinsip **Data Lineage, Data Governance, dan National Scope Compliance**.

---

## Diagram Relasi Entitas (ERD)

```mermaid
erDiagram
    sources ||--o{ publications : "menerbitkan (1:N)"
    sources ||--o{ update_logs : "mencatat update (1:N)"
    sources ||--o{ classification_crosswalk : "merujuk standar (1:N)"
    publications ||--o{ observations : "disitasi oleh (1:N)"
    publications ||--o{ contextual_driver_information : "disitasi oleh (1:N)"
    publications ||--o{ data_versions : "revisi oleh (1:N)"
    datasets ||--o{ indicators : "mengelompokkan (1:N)"
    indicators ||--o{ observations : "mencatat nilai (1:N)"
    indicators ||--|| metadata : "didefinisikan oleh (1:1)"
    indicators ||--o{ contextual_driver_information : "dijelaskan konteksnya (1:N)"
    indicators ||--o{ data_versions : "memiliki riwayat versi (1:N)"
    indicators ||--o{ validation_logs : "diaudit (1:N)"

    sources {
        string id PK
        string institution_name
        string institution_type
        string dataset_name
        string publication_name
        string source_url
        string source_type
        string frequency
        string geographic_scope
        string update_method
        string data_owner
        string status
    }

    publications {
        string id PK
        string source_id FK
        string publication_title
        string document_number
        string publication_date
        string edition_period
        string document_url
        string retrieval_date
    }

    datasets {
        string id PK
        string code UK
        string name
        string sector
        string category
        string description
    }

    indicators {
        string id PK
        string dataset_id FK
        string unique_variable_code UK
        string name
        string unit
        string frequency
        string default_aggregation
    }

    metadata {
        string indicator_id PK_FK
        string definition
        string sector
        string category
        string subcategory
        string publishing_institution
        string methodology
        text calculation_formula
        text data_limitations
        string geographic_scope
        timestamp last_updated
    }

    observations {
        integer id PK
        string indicator_id FK
        string period
        string period_type
        float value
        string unit
        string status
        string geography
        string publication_id FK
        string page_reference
        string table_reference
        integer version_id
        integer is_current
    }

    contextual_driver_information {
        integer id PK
        string indicator_id FK
        string period
        string province_name
        string province_code
        string driver_role
        text explanation
        string publication_id FK
        string page_reference
        string table_reference
        string source_id FK
    }

    classification_crosswalk {
        integer id PK
        string sector
        string original_classification
        string standardized_classification
        string mapping_rule
        integer effective_start_year
        integer effective_end_year
        string source_id FK
        string transformation_note
        string mapping_version
    }

    data_versions {
        integer id PK
        string indicator_id FK
        string period
        integer version_number
        float previous_value
        float new_value
        string previous_status
        string new_status
        string change_reason
        string revised_by_publication_id FK
        date revision_date
    }

    update_logs {
        integer id PK
        string source_id FK
        string update_type
        string status
        integer records_fetched
        integer records_inserted
        integer records_updated
        integer execution_time_ms
        text log_message
    }

    validation_logs {
        integer id PK
        string batch_id
        string indicator_id FK
        string period
        string validation_rule
        string severity
        string status
        text error_details
        text original_payload
    }
```
